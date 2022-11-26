import { NextPage } from 'next';import { ShoppingCartFull } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';



const CartPage: NextPage = () => {

  return (
    <ShopLayout title='Carrito de compras - 3' description='Carrito de compras de la tienda'>
        <ShoppingCartFull />
    </ShopLayout>
  )
}


export default CartPage




