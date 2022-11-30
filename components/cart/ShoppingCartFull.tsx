import { Typography, Grid, Card, CardContent, Divider, Box, Button } from '@mui/material'
import { FC } from 'react';
import { CartList, OrderSummary } from '.'



export const ShoppingCartFull:FC = () => {

   return (
      <>
          <Typography variant='h1' component='h1' marginBottom={2}>Carrito de compras</Typography>

            <Grid container spacing={2}>
                <Grid item xs={ 12 } md={ 7 }>
                    <CartList editable />
                </Grid>
                <Grid item xs={ 12 } md={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{ my: 1}} />

                            <OrderSummary />

                            <Box sx={{ mt: 2 }}>
                                <Button 
                                    color='secondary' className='circular-btn'
                                    fullWidth
                                    href='/checkout/address'
                                >
                                    Checkout
                                </Button>

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid> 
      </>
   )
}