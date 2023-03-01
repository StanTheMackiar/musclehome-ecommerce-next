import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContex';
import { ICartSummary } from '../../interfaces';
import { currency } from '../../utils';

interface Props {
    cartSummary?: ICartSummary;
}

export const OrderSummary: FC<Props> = ({ cartSummary }) => {

    const { summary: contextSummary } = useContext( CartContext )

    const currentSummary: ICartSummary = cartSummary ? cartSummary : contextSummary

    const { numberOfItems, subtotal, tax, total } = currentSummary;

  return (
    <Grid marginTop={2} container rowSpacing={1}>
        <Grid item xs={8}>
            <Typography>N° Productos</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end'>
            <Typography>{ numberOfItems }</Typography>
        </Grid>

        <Grid item xs={8}>
            <Typography>Subtotal</Typography>
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
