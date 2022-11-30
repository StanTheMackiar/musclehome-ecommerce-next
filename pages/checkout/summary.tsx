import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

import { CheckOutlined } from '@mui/icons-material'
import { Typography, Grid, Card, CardContent, Divider, Box, Button } from '@mui/material'

import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { verification } from '../../services'


const SummaryPage: NextPage = () => {

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
                    <Typography variant='h2'>Resumen (3 productsos)</Typography>

                    <Divider sx={{ my: 1}} />


                    <Typography variant='subtitle1'>Dirección de entrega</Typography>
                    <Typography>Stanly Calle</Typography>
                    <Typography>Cra 8B #47-93</Typography>
                    <Typography>Barranquilla - Colombia</Typography>
                    <Typography>+57 3163776973</Typography>

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