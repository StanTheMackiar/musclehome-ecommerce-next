import { useContext } from 'react';
import { NextPage } from 'next'
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { useCountries } from '../../hooks/useCountries';
import { validations } from '../../utils';
import { IShippingAdress } from '../../interfaces';
import { CartContext } from '../../context/';



const getAddressFromCookies = (): IShippingAdress => {
    const address: IShippingAdress = Cookies.get('address') ? JSON.parse(Cookies.get('address')!) : {}
    return address
}


const AdressPage: NextPage = () => {

    const router = useRouter();


    const { updateShippingAdress } = useContext(CartContext)
    const { countries, isLoading } = useCountries();
    
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<IShippingAdress>({
        defaultValues: getAddressFromCookies(),
    });


    const onAdressSubmit = (form: IShippingAdress) => {
        updateShippingAdress( form )
        router.push('/checkout/summary')
    }


   return (
      <ShopLayout title='Dirección de facturación' description='Confirmar dirección de envío'>
         <Typography variant='h1' component='h1'>Dirección de facturación</Typography>
         
         <form onSubmit={ handleSubmit( onAdressSubmit )}>
            <Grid  marginTop={1} container spacing={ 2 } >

                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Nombre" 
                        variant='outlined' 
                        fullWidth
                        { ...register('name', {
                            required: 'Este campo es requerido',
                            minLength: { value: 2, message: 'Se esperan 2 o más caracteres' },
                            validate: validations.isName
                        })}
                        error={ !!errors.name }
                        helperText={ errors.name?.message }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Apellido" 
                        variant='outlined' 
                        fullWidth 
                        { ...register('lastname', {
                            required: 'Este campo es requerido',
                            minLength: { value: 2, message: 'Se esperan 2 o más caracteres' },
                            validate: validations.isName
                        })}
                        error={ !!errors.lastname }
                        helperText={ errors.name?.message }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Dirección" 
                        variant='outlined' 
                        fullWidth 
                        { ...register('address', {
                            required: 'Este campo es requerido',
                            minLength: { value: 5, message: 'Se esperan 5 o más caracteres' },
                        })}
                        error={ !!errors.address }
                        helperText={ errors.address?.message }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Dirección (opcional)" 
                        variant='outlined' 
                        fullWidth 
                        { ...register('address2', {
                            minLength: { value: 5, message: 'Se esperan 5 o más caracteres' },
                        })}
                        error={ !!errors.address2 }
                        helperText={ errors.address2?.message }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Código postal" 
                        variant='outlined' 
                        fullWidth 
                        { ...register('zip', {
                            required: 'Este campo es requerido',
                            minLength: { value: 2, message: 'Se esperan 2 o más caracteres' },
                        })}
                        error={ !!errors.zip }
                        helperText={ errors.zip?.message }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Ciudad" 
                        variant='outlined' 
                        fullWidth 
                        { ...register('city', {
                            required: 'Este campo es requerido',
                            minLength: { value: 2, message: 'Se esperan 2 o más caracteres' },
                        })}
                        error={ !!errors.city }
                        helperText={ errors.city?.message }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        {
                            !isLoading 
                            ? (
                                <TextField
                                    select
                                    variant='outlined'
                                    label='País'
                                    fullWidth
                                    defaultValue={ getValues('country') || '' }
                                    { ...register('country', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 2, message: 'Se esperan 2 o más caracteres' },
                                    })}
                                    error={ !!errors.country }
                                    helperText={ errors.country?.message }
                                >
                                    {
                                        countries.length > 0 
                                        &&  countries.map(({ code, name }) => (
                                            <MenuItem key={code} value={code}>{name}</MenuItem>
                                        ))
                                    }
                                    
                                </TextField>
                            ) : (
                                <TextField 
                                    label='Cargando...'
                                    disabled
                                />
                            )

                        }
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Celular" 
                        placeholder='+57 3205128490'
                        variant='outlined' 
                        fullWidth 
                        { ...register('phone', {
                            required: 'Este campo es requerido',
                            minLength: { value: 5, message: 'Se esperan 2 o más caracteres' },
                        })}
                        error={ !!errors.phone }
                        helperText={ errors.phone?.message }
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 3}} display='flex' justifyContent='center'>
                <Button color='secondary' className='circular-btn' size='large' type='submit'> 
                    Revisar pedido
                </Button>
            </Box>
        </form>

      </ShopLayout>
   )
}


export default AdressPage