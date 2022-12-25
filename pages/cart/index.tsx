import { useContext } from 'react';
import { NextPage } from 'next';import { ShoppingCartEmpty, ShoppingCartFull } from '../../components/cart';

import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context/cart';
import { FullScreenLoading } from '../../components/ui';
import { useRouter } from 'next/router';



const CartPage: NextPage = () => {

  const { isCookiesLoaded, summary: { numberOfItems = 0 } } = useContext( CartContext )


  if ( isCookiesLoaded && numberOfItems > 0 ) {
    return (
      <ShopLayout title={`Carrito - ${ numberOfItems } ${numberOfItems <= 1 ? 'producto' : 'productos'}`} description='Carrito de compras de la tienda'>
        <ShoppingCartFull />    
      </ShopLayout>
    )
  }

 if ( isCookiesLoaded && numberOfItems === 0 ) return (
    <ShopLayout title='Carrito vacío' description='No hay articulos en el carrito de compras'>
      <ShoppingCartEmpty />
    </ShopLayout>
  )

  return (
    <ShopLayout title='Cargando carrito' description='Cargando carrito de compras'>
      <FullScreenLoading />
    </ShopLayout>
  )
  
}




export default CartPage;




