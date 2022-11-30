import { useContext, useEffect } from 'react';
import { NextPage } from 'next';import { ShoppingCartEmpty, ShoppingCartFull } from '../../components/cart';
import { useRouter } from 'next/router';

import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context/cart';



const CartPage: NextPage = () => {

  const { isLoaded, summary: { numberOfItems } } = useContext( CartContext )

  if ( isLoaded && numberOfItems > 0 ) {
    return (
      <ShopLayout title={`Carrito de compras - ${ numberOfItems } ${numberOfItems <= 1 ? 'producto' : 'productos'}`} description='Carrito de compras de la tienda'>
        <ShoppingCartFull />    
      </ShopLayout>
    )
  }

  return (
    <ShopLayout title='Carrito de compras' description='No hay articulos en el carrito de compras'>
      <ShoppingCartEmpty />
    </ShopLayout>
  )
}


export default CartPage




