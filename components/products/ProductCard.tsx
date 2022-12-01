import { FC, useState } from 'react';

import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Chip } from '@mui/material'
import { IProduct } from '../../interfaces/products';
import Link from 'next/link';

interface Props {
    product: IProduct
}


export const ProductCard:FC<Props> = ({ product }) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false);


  return (
    <Grid item xs={6} md={4} lg={3}>
        <Card>
            <Link href={`/product/${product.slug}`}>

                <CardActionArea>
                    
                    {
                        product.inStock === 0 && (
                            <Chip 
                                color='primary'
                                size='small'
                                label="No disponible"
                                sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px'}}
                            />
                        )
                    }

                    <CardMedia 
                        component='img'
                        className='fadeIn'
                        image={ `/products/${ product.images[0] }` }
                        alt={ product.title }
                        onLoad={ () => setIsImageLoaded(true) }
                    />
                </CardActionArea>

            </Link>
        </Card>

        <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none'}} className='fadeIn'>
            <Typography textAlign='center'  fontWeight={700}>{ product.title }</Typography>
            <Typography textAlign='center' fontWeight={500}>{ `$${product.price}` }</Typography>
        </Box>
    </Grid>
  )
}
