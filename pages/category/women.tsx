import { NextPage } from 'next'
import { ProductCategories } from '../../components/products/ProductCategories';
import { useProducts } from '../../hooks';
import { IProduct } from '../../interfaces';


const WomenPage: NextPage = () => {

   const { products, isLoading } = useProducts('/products?gender=women')

   return (
      <ProductCategories products={products} isLoading={isLoading} category='Mujeres' />
   )
}


export default WomenPage