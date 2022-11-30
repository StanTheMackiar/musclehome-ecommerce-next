import { useContext, useEffect } from 'react';
import { NextPage } from 'next';import { ShoppingCartFull } from '../../components/cart';
import { useRouter } from 'next/router';

import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context/cart';



const CartPage: NextPage = () => {

  const { isLoaded, summary: { numberOfItems } } = useContext( CartContext )
  const router = useRouter();

  useEffect(() => {

    if ( isLoaded && numberOfItems === 0 ) router.replace('/cart/empty')

  }, [ isLoaded, numberOfItems, router ]);

  if ( !isLoaded || numberOfItems === 0 ) {
    return <></>;
  }

  return (
    <ShopLayout title={`Carrito de compras - ${ numberOfItems }`} description='Carrito de compras de la tienda'>
        <ShoppingCartFull />
    </ShopLayout>
  )
}


export default CartPage




