import { useContext, useState } from "react";

import { useRouter } from "next/router";

import { Props as AddToCartProps } from "../components/products";
import { CartContext } from "../context";
import { ICartProduct, IValidSize } from "../interfaces";



export const useAddToCart = ({ product }: AddToCartProps) => {
    
    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        inStock: product.inStock,
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    });
    
    const router = useRouter()

    const { addProductToCart } = useContext(CartContext)

    const onSelectedSize = ( size: IValidSize ) => {
        setTempCartProduct( currentProduct => ({
            ...currentProduct,
            size,
        }));
    }

    const onAddProduct = () => {
    
        if ( !tempCartProduct.size ) return;

        addProductToCart(tempCartProduct);
        router.push('/cart');
    }

    const onUpdatedQuantity = (quantity: number) => {

        setTempCartProduct( current => ({
                ...current, 
                quantity,
        }))

    }

    return {
        tempCartProduct,

        onAddProduct,
        onSelectedSize,
        onUpdatedQuantity,
    }
}