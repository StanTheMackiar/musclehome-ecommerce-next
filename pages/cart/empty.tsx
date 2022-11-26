
import { FC } from 'react'
import { ShoppingCartEmpty } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'


const EmptyCardPage:FC = () => {

   return (
      <ShopLayout title='Carrito vacío' description='No hay articulos en el carrito de compras'>
        <ShoppingCartEmpty />
      </ShopLayout>
   )
}

export default EmptyCardPage