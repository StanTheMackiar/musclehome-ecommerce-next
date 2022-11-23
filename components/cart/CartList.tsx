
import { DeleteOutlined } from '@mui/icons-material';
import { Typography, Grid, Link, CardActionArea, CardMedia, Button, IconButton, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react'
import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';

interface Props {
    editable?: boolean
}

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]


export const CartList:FC<Props> = ({ editable = false}) => {

   return (
    <>
        {
            productsInCart.map( product => (
                <Grid
                    container
                    spacing={2}
                    key={product.slug}
                    sx={{ mb: {xs: 3, sm: 1} }}
                >
                    <Grid item xs={3}>
                        <Link href='/product/slug'>
                            <CardActionArea>
                                <CardMedia
                                    image={`/products/${product.images[0]}`}
                                    component='img'
                                    alt={product.title}
                                    sx={{ borderRadius: '5px' }} />
                            </CardActionArea>
                        </Link>
                    </Grid>

                    <Grid item xs={7}>
                        <Box display={'flex'} flexDirection='column'>
                            <Typography variant='body1'>{product.title}</Typography>
                            <Typography variant='body1'>Talla: <strong>M</strong></Typography>

                            <Box display='flex' flexDirection='row'>
                                {editable
                                    ? <ItemCounter />
                                    : <Typography display='flex' alignItems='center' variant='button'>3 articulos</Typography>}
                                {editable && (
                                    <IconButton sx={{ ml: 2 }}>
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                    </Grid>

                </Grid>   
            ))
        }
    </>
   )
}