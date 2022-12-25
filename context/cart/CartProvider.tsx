import { FC, PropsWithChildren, useEffect, useReducer, useRef } from 'react'
import Cookies from 'js-cookie'

import { CartContext,  cartReducer } from './';
import { ICartProduct, ICartSummary, IShippingAddress } from '../../interfaces';
import { shopApi } from '../../api';
import { IOrder } from '../../interfaces/order';

export interface CartState {
    cart: ICartProduct[],
    isCookiesLoaded: boolean,
    shippingAddress?: IShippingAddress
    summary: ICartSummary,
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    isCookiesLoaded: false,
    shippingAddress: undefined,
    summary: {
        numberOfItems: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
    },
}


export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

   const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE )

   const firstRender = useRef(true);


   useEffect(()=> {
        const cookieProducts: ICartProduct[] = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : []
        dispatch({type: 'Cart - LoadCart from cookies', payload: cookieProducts})
   }, [])

   useEffect(() => {
        const address: IShippingAddress = Cookies.get('address') ? JSON.parse(Cookies.get('address')!) : undefined;
        dispatch({type: 'Cart - LoadAddress from Cookies', payload: address})
   }, []);


   useEffect(() => {
        if ( firstRender.current ) {
            firstRender.current = false
            return 
        } 

        if ( !firstRender.current ) Cookies.set('cart', JSON.stringify(state.cart))
     
   }, [state.cart])
   

   useEffect(() => {

        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subtotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0 )
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

        const orderSummary: ICartSummary = {
            numberOfItems,
            subtotal,
            tax: subtotal * taxRate,
            total: subtotal * ( taxRate + 1 )
        }

        dispatch({ type: 'Cart - Update order summary', payload: orderSummary })
    
   }, [state.cart]);

    const addProductToCart = ( product: ICartProduct ) => {

        const productInCart = state.cart.some( productInCart => productInCart._id === product._id );
        if ( !productInCart ) return dispatch({type: 'Cart - Update products in cart', payload: [...state.cart, product]});


        const productInCartButBifferentSize = state.cart.some( productInCart => productInCart._id ===  product._id && productInCart.size === product.size )
        if ( !productInCartButBifferentSize ) return dispatch({type: 'Cart - Update products in cart', payload: [...state.cart, product]});

        // Acumular
        const updatedProducts = state.cart.map( productInCart => {
            if ( productInCart._id !== product._id ) return productInCart;
            if ( productInCart.size !== product.size ) return productInCart;
            
            //Actualizar cantidad
            productInCart.quantity += product.quantity;
            return productInCart;
        });

        dispatch({ type: 'Cart - Update products in cart', payload: updatedProducts })
    }


    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: 'Cart - Change cart quantity', payload: product })
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: 'Cart - Remove product in cart', payload: product })
    }

    const updateShippingAddress = ( address: IShippingAddress ) => {
        Cookies.set('address', JSON.stringify(address));
        dispatch({ type: 'Cart - Update shipping address', payload: address})
    }

    const createOrder = async() => {

        try {
            if ( !state.shippingAddress ) {
                throw new Error ('No hay direcion de entrega')
            }
            
            const body: IOrder = {
                orderItems: state.cart.map(productInCart => {
                    const { inStock, ...rest } = productInCart
                    return { 
                        ...rest,
                        size: productInCart.size!
                    }
                }),
                shippingAddress: state.shippingAddress,
                cartSummary: state.summary,
                isPaid: false,
            }
            
            const { data } = await shopApi.post('/orders', body)

            console.log({data})

        } catch (err) {
            console.log(err)
        }
    }

        
   return (
       <CartContext.Provider value={{
         ...state,

         addProductToCart,
         removeCartProduct,
         updateCartQuantity,
         updateShippingAddress,

         createOrder,
         
       }}>
          { children }
       </CartContext.Provider>
   )
};