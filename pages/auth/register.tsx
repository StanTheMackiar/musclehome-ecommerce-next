import { NextPage } from 'next'
import Link from 'next/link';

import { Box } from '@mui/system';
import { Grid, TextField, Typography, Button, CircularProgress } from '@mui/material';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { useRegister } from '../../hooks';



const RegisterPage: NextPage = () => {

   const { destination, errorDisplayed, errors, getValues, handleSubmit, isLoading, onRegisterForm, register, showError } = useRegister()

   return (
      <AuthLayout title='Registrarse'>
         <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Box sx={{width: {xs: 350, sm: 600}, padding: '10px 20px'}}>

               <Grid container spacing={2}>

                  <Grid item xs={12} display='flex' justifyContent='center' >
                     <Typography variant='h1' component='h1' >Crear cuenta</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <TextField 
                        label='Nombres' 
                        variant='outlined' 
                        fullWidth
                        { 
                           ...register('name', {
                              required: 'Este campo es requerido',
                              minLength: {value: 2, message: 'Se esperan 2 o más caracteres'},
                              validate: validations.isName
                        })}
                        error={ !!errors.name }
                        helperText={ errors.name?.message }
                     />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <TextField 
                        label='Apellidos' 
                        variant='outlined' 
                        fullWidth
                        { 
                           ...register('lastname', {
                              required: 'Este campo es requerido',
                              minLength: {value: 2, message: 'Se esperan 2 o más caracteres'},
                              validate: validations.isName
                        })}
                        error={ !!errors.lastname }
                        helperText={ errors.lastname?.message }
                     />
                  </Grid>

                  <Grid item xs={12} >
                     <TextField 
                        label='Correo' 
                        type='email'
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

                  <Grid item xs={12} sm={6}>               
                     <TextField 
                        label='Nueva contraseña' 
                        type='password' 
                        variant='outlined' 
                        fullWidth
                        { ...register('password', {
                           required: 'Este campo es requerido',
                           minLength: { value: 6, message: 'Este campo acepta mínimo 6 caracteres' },
                           maxLength: { value: 18, message: 'Este campo acepta máximo 18 caracteres' },
                           // validate: validations.isPassword
                        })}
                        error={ !!errors.password }
                        helperText={ errors.password?.message }
                     />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>               
                     <TextField 
                        label='Confirmar Contraseña ' 
                        type='password' 
                        variant='outlined' 
                        fullWidth
                        { ...register('confPassword', {
                           required: 'Este campo es requerido',
                           minLength: { value: 6, message: 'Este campo acepta mínimo 6 caracteres' },
                           maxLength: { value: 18, message: 'Este campo acepta máximo 18 caracteres' },
                           validate: (confPassword) => validations.passwordsMatch(confPassword, getValues('password')) 
                        })}
                        error={ !!errors.confPassword }
                        helperText={ errors.confPassword?.message }
                     />
                  </Grid>

                  <Grid item xs={12}>               
                     <Button 
                        fullWidth 
                        color='secondary' 
                        className='circular-btn' 
                        size='large'
                        type='submit'
                        disabled={ isLoading }
                        endIcon={
                           isLoading 
                           ? <CircularProgress color='inherit' size={17} />
                           : null
                        }
                     >
                        Registrarse
                     </Button>
                        {
                           showError &&
                              <Typography 
                                    marginTop={1} 
                                    textAlign='center' color='error' 
                                    variant='body2'
                                    className='fadeIn'
                                 >
                                    { errorDisplayed }
                              </Typography>
                        }
                  </Grid>

                  <Grid item xs={12} display='flex' justifyContent='end'>               
                        <Typography variant='body1'>
                        {`¿Ya posees una cuenta? `}
                           <Link href={`/auth/login?page=${destination}`} style={{color: 'black'}}>Acceder</Link>
                        </Typography>
                  </Grid>
                  
               </Grid>
            </Box>
         </form>
      </AuthLayout>
   )
}


export default RegisterPage