import { FC, PropsWithChildren, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'

import { CartContext,  cartReducer } from './';
import { ICartProduct, ICartSummary } from '../../interfaces';

export interface CartState {
    cart: ICartProduct[],
    isLoaded: boolean,
    summary: ICartSummary,
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    isLoaded: false,
    summary: {} as ICartSummary,
}


export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

   const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE )


   useEffect(()=> {
        try {
            const cookieProducts: ICartProduct[] = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({type: 'Cart - LoadCart from cookies', payload: cookieProducts})
        } catch (error) {
            dispatch({type: 'Cart - LoadCart from cookies', payload: []})
        }
   }, [])


   useEffect(() => {
        if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart))
     
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
        
   return (
       <CartContext.Provider value={{
         ...state,
        

         addProductToCart,
         removeCartProduct,
         updateCartQuantity,
         
       }}>
          { children }
       </CartContext.Provider>
   )
};