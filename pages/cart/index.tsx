import { useContext } from 'react';
import { NextPage } from 'next';import { ShoppingCartEmpty, ShoppingCartFull } from '../../components/cart';

import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context/cart';



const CartPage: NextPage = () => {

  const { isCookiesLoaded, summary: { numberOfItems } } = useContext( CartContext )

  if ( !isCookiesLoaded ) return <ShopLayout title='Revisando carrito' description='Carrito de compras'></ShopLayout>

  if ( isCookiesLoaded && numberOfItems > 0 ) {
    return (
      <ShopLayout title={`Carrito - ${ numberOfItems } ${numberOfItems <= 1 ? 'producto' : 'productos'}`} description='Carrito de compras de la tienda'>
        <ShoppingCartFull />    
      </ShopLayout>
    )
  }

  return (
    <ShopLayout title='Carrito vacío' description='No hay articulos en el carrito de compras'>
      <ShoppingCartEmpty />
    </ShopLayout>
  )
}


export default CartPage;




