import { NextPage } from 'next'
import Link from 'next/link';
import { GetServerSideProps } from 'next'

import { signIn, getSession } from 'next-auth/react';

import { Box } from '@mui/system';
import { Grid, TextField, Typography, Button, CircularProgress, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { useLogin } from '../../hooks';


const LoginPage: NextPage = () => {
   
   const { destination, onLoginUser, errors, handleSubmit, isLoading, register, showError} = useLogin();

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
                        autoFocus
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
                        disabled={ isLoading }
                        endIcon={
                           isLoading 
                           ? <CircularProgress color='inherit' size={17} />
                           : null
                        }
                     >
                        Ingresar
                     </Button>
                        { 
                           showError && 
                           <Typography 
                                 marginTop={1} 
                                 textAlign='center' color='error' 
                                 variant='body2'
                                 className='fadeIn'
                              >
                                 Usuario o contraseña inválidos
                           </Typography>
                        }
                  </Grid>
                  <Grid item xs={12} display='flex' justifyContent='end'>               
                        <Typography variant='body1'>
                        {`¿Aún no eres miembro? `}
                           <Link href={`/auth/register?page=${ destination }`} style={{color: 'black'}}>Regístrate</Link>
                        </Typography>
                  </Grid>

                  <Divider sx={{width: '100%', m: 3 }} />

                  <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                        <Button 
                           variant='contained' 
                           fullWidth 
                           size='large'
                           color='primary' 
                           sx={{ mb: 1 }}
                           className='oauth-btn github-btn'
                           onClick={() => signIn('github')} 
                           startIcon={<GitHubIcon />}
                        >
                           Continuar con GitHub
                        </Button>
                  </Grid>

                  <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                        <Button 
                           variant='contained' 
                           fullWidth 
                           size='large'
                           color='error' 
                           sx={{ mb: 1 }}
                           className='oauth-btn google-btn'
                           onClick={() => signIn('google')} 
                           startIcon={<GoogleIcon />}
                        >
                           Continuar con Google
                        </Button>
                  </Grid>
                  
               </Grid>

            </Box>
            
         </form>
      </AuthLayout>
   )
}


export default LoginPage




export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   
   const session = await getSession({ req })
   const { page = '/' } = query;

   if ( session ) {
      return {
         redirect: {
            destination: String(page),
            permanent: false
         }
      }
   }

   return {
      props: {
         
      }
   }
}