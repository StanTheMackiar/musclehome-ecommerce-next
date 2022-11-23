import { FC, useMemo, useState } from 'react';

import { Grid, Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material'
import { IProduct } from '../../interfaces/products';
import Link from 'next/link';

interface Props {
    product: IProduct
}


export const ProductCard:FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
            ? `products/${ product.images[1] }`
            : `products/${ product.images[0] }`
    }, [isHovered])


  return (
    <Grid 
        item
        xs={6} 
        sm={4}
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ () => setIsHovered(false) }
    >
        <Card>
            <Link href={`/product/${product.slug}`}>
                <CardActionArea>
                    <CardMedia 
                        component='img'
                        className='fadeIn'
                        image={ productImage }
                        alt={ product.title }
                    />
                </CardActionArea>
            </Link>
        </Card>

        <Box sx={{ mt: 1}} className='fadeIn'>
            <Typography textAlign='center'  fontWeight={700}>{ product.title }</Typography>
            <Typography textAlign='center' fontWeight={500}>{ `$${product.price}` }</Typography>
        </Box>
    </Grid>
  )
}
