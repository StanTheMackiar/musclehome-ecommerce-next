import { FC } from 'react'
import { IProduct } from '../../interfaces'

import { Typography } from '@mui/material';

import { ShopLayout } from '../layouts';
import { FullScreenLoading } from '../ui';
import { ProductList } from './ProductList';


interface Props {
    category: string,
    products: IProduct[],
    isLoading: boolean,
}


export const ProductCategories:FC<Props> = ({ category, products, isLoading }) => {

  const name = category === 'Mujeres' 
                ? 'damas' 
                : category === 'Hombres'
                  ? 'caballeros'
                  : 'niños';
                

   return (
    <ShopLayout title={`${category} | MuscleHome`} description={`Encuentra los mejores productos para ${category} aquí`}>
        <Typography textAlign='center' variant='h1' component='h1' marginBottom={1}>{category}</Typography>
        <Typography textAlign='center' variant='h2' component='h1' marginBottom={1}>Productos para { name }</Typography>


        
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList sx={{marginTop: 1}} products={products} />
      }


    </ShopLayout>
   )
}