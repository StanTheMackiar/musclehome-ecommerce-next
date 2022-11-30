import { FC, PropsWithChildren, useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'

import { CartContext,  cartReducer } from './';
import { ICartProduct, ICartSummary, IShippingAdress } from '../../interfaces';

export interface CartState {
    cart: ICartProduct[],
    isLoaded: boolean,
    shippingAdress?: IShippingAdress
    summary: ICartSummary,
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    isLoaded: false,
    shippingAdress: undefined,
    summary: {} as ICartSummary,
}


export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

   const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE )


   useEffect(()=> {
        const cookieProducts: ICartProduct[] = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : []
        dispatch({type: 'Cart - LoadCart from cookies', payload: cookieProducts})
   }, [])

   useEffect(() => {
        const address: IShippingAdress = Cookies.get('address') ? JSON.parse(Cookies.get('address')!) : undefined;
        dispatch({type: 'Cart - LoadAddress from Cookies', payload: address})
   }, []);


   useEffect(() => {
        if (state.cart.length > 0) Cookies.set('cart', JSON.stringify(state.cart))
     
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

    const updateShippingAdress = ( address: IShippingAdress ) => {
        Cookies.set('address', JSON.stringify(address));
        dispatch({ type: 'Cart - Update shipping adress', payload: address})
    }
        
   return (
       <CartContext.Provider value={{
         ...state,

         addProductToCart,
         removeCartProduct,
         updateCartQuantity,
         updateShippingAdress,
         
       }}>
          { children }
       </CartContext.Provider>
   )
};