import { NextPage } from 'next'
import { ProductCategories } from '../../components/products/ProductCategories';
import { useProducts } from '../../hooks';
import { IProduct } from '../../interfaces';


const MenPage: NextPage = () => {

   const { products, isLoading } = useProducts('/products?gender=men')

   return (
      <ProductCategories products={products} isLoading={isLoading} category='Hombres'/>
   )
}


export default MenPage