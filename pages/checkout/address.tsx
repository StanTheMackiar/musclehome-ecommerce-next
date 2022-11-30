import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { verification } from '../../services';
import { jwt } from '../../utils';


const AdressPage: NextPage = () => {

   return (
      <ShopLayout title='Dirección de facturación' description='Confirmar dirección de envío'>
         <Typography variant='h1' component='h1'>Dirección de facturación</Typography>

        <Grid  marginTop={1} container spacing={ 2 } >
            <Grid item xs={12} md={6}>
                <TextField label="Nombre" variant='outlined' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField label="Apellido" variant='outlined' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField label="Dirección" variant='outlined' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField label="Dirección (opcional)" variant='outlined' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField label="Código postal" variant='outlined' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField label="Ciudad" variant='outlined' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel>País</InputLabel>
                    <Select
                        variant='outlined'
                        label='País'
                        value={1}
                    >
                        <MenuItem value={1}>Colombia</MenuItem>
                        <MenuItem value={2}>Mexico</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField label="Télefono" variant='outlined' fullWidth />
            </Grid>
        </Grid>

        <Box sx={{ mt: 3}} display='flex' justifyContent='center'>
            <Button color='secondary' className='circular-btn' size='large'> 
                Revisar pedido
            </Button>
        </Box>

      </ShopLayout>
   )
}


// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
//     const { token = '' } = req.cookies;

//     const isLogin = await verification.isLogin( token )

//     if ( !isLogin ) {
//         return {
//             redirect: {
//                 destination: `/auth/login?page=${req.url || '/'}
//                 permanent: false,
//             }
//         }
//     }

//     return { props: {} }
// }


export default AdressPage