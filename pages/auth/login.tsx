import { NextPage } from 'next'
import { AuthLayout } from '../../components/layouts';
import { Box } from '@mui/system';
import { Grid, TextField, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { shopApi } from '../../api';


const LoginPage: NextPage = () => {

   type FormData = {
      email   : string,
      password: string,
   }


   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

   console.log({errors});


   const onLoginUser = async( data: FormData ) => {
      
      try {
         
         const { } = await shopApi.post('/auth/login')

      } catch (error) {
         
      }


   }

   return (
      <AuthLayout title='Iniciar Sesión'>
         <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
            <Box sx={{width: 350, padding: '10px 20px'}}>
               <Grid container spacing={2}>

                  <Grid item xs={12} display='flex' justifyContent='center' >
                     <Typography variant='h1' component='h1' >Iniciar Sesión</Typography>
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        type='email'
                        label='Correo' 
                        variant='outlined' 
                        fullWidth
                        { 
                           ...register('email', {
                              required: 'Este campo es requerido',
                              validate: validations.isEmail
                        })}
                        error={ !!errors.email }
                        helperText={ errors.email?.message }
                     />
                  </Grid>
                  <Grid item xs={12}>               
                     <TextField 
                        label='Contraseña' 
                        type='password' 
                        variant='outlined' 
                        fullWidth
                        { ...register('password', {
                           required: 'Este campo es requerido',
                           minLength: { value: 6, message: 'Este campo acepta mínimo 6 caracteres' }
                        })}
                        error={ !!errors.password }
                        helperText={ errors.password?.message }
                     />
                  </Grid>
                  <Grid item xs={12}>               
                     <Button 
                        fullWidth 
                        color='secondary' 
                        className='circular-btn' 
                        size='large'
                        type='submit'
                     >
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
         </form>
      </AuthLayout>
   )
}


export default LoginPage