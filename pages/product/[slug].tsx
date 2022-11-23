import React from 'react'
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { Box, Button, Grid, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { ProductSlideShow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { AddShoppingCartOutlined } from '@mui/icons-material';

const product = initialData.products[0];

const ProductPage: NextPage = () => {


  return (
    <ShopLayout title={ product.title } description={ product.description }>
      
      <Grid container spacing={ 3 }>

        <Grid item xs={ 12 } sm={ 7 } >
          <ProductSlideShow images={ product.images }/>
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>
            
              {/* Titulos */}
              <Typography variant='h1' component='h1'>{ product.title }</Typography> 
              <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography> 


              {/* Cantidad */}
              <Box sx={{my: 2}}>
                <Typography variant='subtitle1' paddingLeft={1}>Cantidad</Typography>
                <ItemCounter />
                <SizeSelector 
                  // selectedSize={ product.sizes[0] }
                  sizes={ product.sizes }
                />
              </Box>

                {/* Carrito */}
                <Button color='secondary' className='circular-btn' fullWidth endIcon={<AddShoppingCartOutlined/>}>
                  Agregar al carrito
                </Button>


                {/* <Button color='secondary' className='circular-btn' disabled variant='outlined' fullWidth>
                  No hay disponibilidad
                </Button> */}

                <Box sx={{ mt: 3}}>
                  <Typography variant='subtitle2' fontWeight={700}>Descripción</Typography>
                  <Typography variant='body2'>{ product.description }</Typography>
                </Box>

          </Box>  

        </Grid>

      </Grid>


    </ShopLayout>
  )
}


export default ProductPage