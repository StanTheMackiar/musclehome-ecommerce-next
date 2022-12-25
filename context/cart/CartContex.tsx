import { createContext } from 'react';
import { ICartProduct, ICartSummary, IShippingAddress } from '../../interfaces';



interface ContextProps {
    cart: ICartProduct[],
    isCookiesLoaded: boolean,
    shippingAddress?: IShippingAddress,
    summary: ICartSummary,

    addProductToCart: (product: ICartProduct) => void,
    removeCartProduct: (product: ICartProduct) => void,
    updateCartQuantity: (product: ICartProduct) => void,
    updateShippingAddress: (address: IShippingAddress) => void,

    createOrder: () => Promise<void>,
}


export const  CartContext = createContext({} as ContextProps);