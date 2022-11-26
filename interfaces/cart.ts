import { IValidSize } from "./";

export interface ICartProduct {
    _id: string,
    image: string;
    inStock: number;
    price: number;
    size?: IValidSize;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex';
    quantity: number;
}


export interface ICartSummary {
    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;
}