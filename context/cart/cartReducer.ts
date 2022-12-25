import { ICartProduct, ICartSummary } from '../../interfaces';
import { CartState } from './';
import { IShippingAddress } from '../../interfaces/shippingAddress';


type CartActionType = 
   | { type: 'Cart - LoadCart from cookies', payload: ICartProduct[] }
   | { type: 'Cart - Update products in cart', payload: ICartProduct[] }
   | { type: 'Cart - Change cart quantity', payload: ICartProduct }
   | { type: 'Cart - Remove product in cart', payload: ICartProduct }
   | { type: 'Cart - Update order summary', payload: ICartSummary }
   | { type: 'Cart - LoadAddress from Cookies', payload: IShippingAddress }
   | { type: 'Cart - Update shipping address', payload: IShippingAddress }


export const cartReducer = ( state: CartState, action: CartActionType): CartState => {

   switch (action.type) {
       case 'Cart - LoadCart from cookies':
           return {
               ...state,
               isCookiesLoaded: true,
               cart: action.payload
           }

        case 'Cart - Update products in cart':
            return {
                ...state,
                cart: [ ...action.payload ]
            }
        
        case 'Cart - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map( product => {
                    if( product._id !== action.payload._id ) return product;
                    if( product.size !== action.payload.size ) return product;
                    return action.payload;
                })
            }
        case 'Cart - Remove product in cart':
            return {
                ...state,
                cart: state.cart.filter( product => product !== action.payload )
            }
        
        case 'Cart - Update order summary':
            return {
                ...state,
                summary: action.payload
                
            }
        case 'Cart - LoadAddress from Cookies':
        case 'Cart - Update shipping address':
            return {
                ...state,
                shippingAddress: action.payload
                
            }

       default:
           return state;
   }
}