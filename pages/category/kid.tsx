import { NextPage } from 'next'
import { ProductCategories } from '../../components/products/ProductCategories';
import { useProducts } from '../../hooks';
import { IProduct } from '../../interfaces';


const KidPage: NextPage = () => {

   const { products, isLoading } = useProducts('/products?gender=kid')

   return (
      <ProductCategories products={products} isLoading={isLoading} category='Niño'/>
   )
}


export default KidPage