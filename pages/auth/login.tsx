import { NextPage } from 'next'
import { AuthLayout } from '../../components/layouts';
import { Box } from '@mui/system';
import { Grid, TextField, Typography, Button } from '@mui/material';
import Link from 'next/link';


const LoginPage: NextPage = () => {

   return (
      <AuthLayout title='Iniciar Sesión'>
         <Box sx={{width: 350, padding: '10px 20px'}}>
            <Grid container spacing={2}>

                <Grid item xs={12} display='flex' justifyContent='center' >
                    <Typography variant='h1' component='h1' >Iniciar Sesión</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField label='Correo' variant='outlined' fullWidth/>
                </Grid>
                <Grid item xs={12}>               
                  <TextField label='Contraseña' type='password' variant='outlined' fullWidth/>
               </Grid>
                <Grid item xs={12}>               
                  <Button fullWidth color='secondary' className='circular-btn' size='large'>
                     Ingresar
                  </Button>
               </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>               
                     <Typography variant='body1'>
                       {`¿Aún no eres miembro? `}
                        <Link href='/auth/register' style={{color: 'black'}}>Regístrate</Link>
                     </Typography>
               </Grid>
                
            </Grid>
         </Box>
      </AuthLayout>
   )
}


export default LoginPage