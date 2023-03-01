import { ICartSummary, IUser } from "./";
import { IShippingAddress } from './shippingAddress';
import { IValidSize } from './products';


export interface IOrder {
    //ID de la orden
    _id?          : string,
    user?         : IUser | string,
    orderItems    : IOrderItem[],
    shippingAddress: IShippingAddress,
    paymentResult?: string,

    cartSummary: ICartSummary,

    isPaid  : boolean,
    paidAt? : string,

    transactionId?: string,
    createdAt?: string,
    updatedAt?: string,
}


export interface IOrderItem {
    _id      : string,
    gender   : 'men'|'women'|'kid'|'unisex',
    image    : string,
    price    : number,
    quantity : number,
    size     : IValidSize,
    slug     : string,
    title    : string,
}

