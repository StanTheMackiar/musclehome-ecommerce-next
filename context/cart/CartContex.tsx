import { createContext } from 'react';
import { ICartProduct, ICartSummary, IShippingAdress } from '../../interfaces';



interface ContextProps {
    cart: ICartProduct[],
    isLoaded: boolean,
    shippingAdress?: IShippingAdress,
    summary: ICartSummary,

    addProductToCart: (product: ICartProduct) => void,
    removeCartProduct: (product: ICartProduct) => void,
    updateCartQuantity: (product: ICartProduct) => void,
    updateShippingAdress: (address: IShippingAdress) => void,
}


export const  CartContext = createContext({} as ContextProps);