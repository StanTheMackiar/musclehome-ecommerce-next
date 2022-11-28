import { useState, useContext } from 'react';
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import { Grid, TextField, Typography, Button, CircularProgress } from '@mui/material';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';


type FormData = {
   name        : string,
   lastname    : string,
   email       : string,
   password    : string,
   confPassword: string
   
}

const RegisterPage: NextPage = () => {

   const router = useRouter();
   const { registerUser } = useContext(AuthContext)

   const [ showError, setShowError ] = useState(false)
   const [ errorDisplayed, setErrorDisplayed ] = useState('');
   const [ isLoading, setIsLoading ] = useState(false)

   const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>();


   const onRegisterForm = async({name, lastname, email, password}: FormData ) => {

      console.log({name})

      setShowError(false)
      setIsLoading(true)
      const { hasError, message } = await registerUser(name, lastname, email, password);

      if ( hasError ) {
         setTimeout(() => {
            setShowError(true)
            setIsLoading(false)
            setErrorDisplayed( message! );
            setTimeout(()=> setShowError(false), 3000)
         }, 2000);
         return;
      }

      router.replace('/');
   }

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
                           <Link href='/auth/login' style={{color: 'black'}}>Acceder</Link>
                        </Typography>
                  </Grid>
                  
               </Grid>
            </Box>
         </form>
      </AuthLayout>
   )
}


export default RegisterPage