import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
  return (
    <Grid marginTop={2} container rowSpacing={1}>
        <Grid item xs={8}>
            <Typography>N° Productos</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end'>
            <Typography>3</Typography>
        </Grid>

        <Grid item xs={8}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end'>
            <Typography>{ `$${ 150.20 }`}</Typography>
        </Grid>

        <Grid item xs={8}>
            <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end'>
            <Typography>{ `$${ 25.52 }`}</Typography>
        </Grid>

        <Grid item xs={8} sx={{mt: 2}}>
            <Typography variant='subtitle1'>Total:</Typography>
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end' sx={{mt: 2}}>
            <Typography variant='subtitle1' >{ `$${ 175.72 }`}</Typography>
        </Grid>
    </Grid>
  )
}
