import { Grid } from '@mui/material';
import { FC } from 'react';
import { ProductCard } from './ProductCard';
import { IProduct } from '../../interfaces';
import { CSSProperties } from '@mui/styled-engine';


interface Props {
    products: IProduct[],
    sx?: CSSProperties,
}

export const ProductList:FC<Props> = ({ products, sx }) => {
  return (
    <Grid container spacing={4} sx={sx}>
        {
            products.map( product => (
                <ProductCard key={ product.slug } product={product}/>
          ))
        }
      </Grid>
  )
}
