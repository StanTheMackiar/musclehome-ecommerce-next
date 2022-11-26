import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContex';
import { currency } from '../../utils';

export const OrderSummary = () => {

    const { summary: {numberOfItems, subtotal, tax, total} } = useContext( CartContext )

  return (
    <Grid marginTop={2} container rowSpacing={1}>
        <Grid item xs={8}>
            <Typography>N° Productos</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end'>
            <Typography>{ numberOfItems }</Typography>
        </Grid>

        <Grid item xs={8}>
            <Typography>Subotal</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end'>
            <Typography>{ currency.format(subtotal) }</Typography>
        </Grid>

        <Grid item xs={8}>
            <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end'>
            <Typography>{ currency.format(tax) }</Typography>
        </Grid>

        <Grid item xs={8} sx={{mt: 2}}>
            <Typography variant='subtitle1'>Total:</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end' sx={{mt: 2}}>
            <Typography variant='subtitle1' >{ currency.format(total) }</Typography>
        </Grid>
    </Grid>
  )
}
