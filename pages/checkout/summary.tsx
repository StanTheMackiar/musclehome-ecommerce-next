import { useContext } from 'react';
import { NextPage } from 'next'
import Link from 'next/link'

import { CheckOutlined } from '@mui/icons-material'
import { Typography, Grid, Card, CardContent, Divider, Box, Button } from '@mui/material'

import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context/';


const SummaryPage: NextPage = () => {

    const { shippingAdress: address, summary: { numberOfItems } } = useContext(CartContext)
    


   return (
    <ShopLayout title='Resumen de la orden' description='Resumen de la orden'>
    <Typography variant='h1' component='h1' marginBottom={2}>Resumen de la orden</Typography>

    <Grid container spacing={2}>
        <Grid item xs={ 12 } md={ 7 }>
            <CartList />
        </Grid>
        <Grid item xs={ 12 } sm={ 5 }>
            <Card className='summary-card'>
                <CardContent>
                    <Typography variant='h2'>Resumen ({`${numberOfItems} ${numberOfItems <= 1 ? 'producto' : 'productos'}`})</Typography>

                    <Divider sx={{ my: 1}} />


                    {
                        address ? (
                            <>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <Typography>{ `${address.name} ${address.lastname}` }</Typography>
                                <Typography>{ address.address } { address.address2 ? `- ${address.address2}` : '' }</Typography>
                                <Typography>{ address.city } - { address.country }</Typography>
                                <Typography>{ address.zip }</Typography>
                                <Typography>{ address.phone }</Typography>
                            </>
                        ) : (
                            <Typography variant='body2' sx={{my: 3}}>No se encontraron los datos de entrega</Typography>
                        )
                    }

                    <Box display='flex' justifyContent='end' >
                        <Link href='/checkout/address' style={{color: 'black'}}>
                            Editar informacion
                        </Link>
                    </Box>

                    <Divider sx={{ my: 1}} />


                    <OrderSummary />

                    <Box display='flex' justifyContent='end' >
                        <Link href='/cart' style={{color: 'black'}}>
                            Editar productos
                        </Link>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Button 
                            color='secondary' className='circular-btn' 
                            fullWidth
                            endIcon={<CheckOutlined />}
                        >
                            Finalizar compra
                        </Button>

                    </Box>

                </CardContent>
            </Card>
        </Grid>

    </Grid> 
</ShopLayout>
   )
}



export default SummaryPage