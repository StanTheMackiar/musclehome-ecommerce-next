export interface IProduct {
    _id: string,
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: IValidSize[];
    slug: string;
    tags: string[];
    title: string;
    type: IValidType;
    gender: 'men'|'women'|'kid'|'unisex'
    createdAt: string,
    updatedAt: string,
}


export type IValidSize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type IValidType = 'shirts'|'pants'|'hoodies'|'hats';