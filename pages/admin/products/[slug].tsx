import { FC, KeyboardEvent, useEffect, useMemo, useRef, useState, ChangeEvent } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { AdminLayout } from '../../../components/layouts'
import { IProduct, IValidSize, IValidType } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { dbProducts } from '../../../database';
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import { shopApi } from '../../../api';
import { Product } from '../../../models';


const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']


interface FormData {
  _id?        : string,
  description : string;
  images      : string[];
  inStock     : number;
  price       : number;
  sizes       : string[];
  slug        : string;
  tags        : string[];
  title       : string;
  type        : string;
  gender      : string;
}

const initialValues: FormData = {
  description : '',
  images      : [],
  inStock     : 0,
  price       : 0,
  sizes       : [],
  slug        : '',
  tags        : [],
  title       : '',
  type        : '',
  gender      : 'men',
}

interface Props {
    product: IProduct;
}

const ProductAdminPage:FC<Props> = ({ product }) => {

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [ tag, setTag ] = useState('');
  const [ isSubmittingFile, setIsSubmittingFile ] = useState(false);

  const { register, getValues, setValue, reset, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<FormData>({
    defaultValues: initialValues
  });


  useEffect(() => {
    //? value = formulario
    //? name y type = evento que se disparo
    const subscription = watch(( value, { name, type } ) => {
      // console.log({value, name, type})
      if( name === 'title' ) {
        const newSlug = value.title?.trim()
          .replaceAll(' ', '_')
          .replaceAll("'", '')
          .toLowerCase() || '';

        setValue('slug', newSlug, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();

  }, [setValue, watch]);

  useEffect(() => {
    if(!product) return;
    const { createdAt, updatedAt, ...rest } = product;
    reset(rest);
  }, [product, reset]);

  const onChangeSizes = ( size: string ) => {
    const currentSizes = getValues('sizes');
    if( currentSizes.includes(size)) {
      return setValue('sizes', currentSizes.filter( s => s !== size), { shouldValidate: true });
    }

    setValue('sizes', [ ...currentSizes, size ], { shouldValidate: true })
  }

  const onDeleteTag = ( tag: string ) => {
    const updatedTags = getValues('tags').filter( t => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true });
  }

  const onAddTag = (e: KeyboardEvent<HTMLDivElement>) => { 
    if(e.code !== 'Space') return;
    const newTag = tag.toLowerCase().trim();

    if(!newTag || newTag === '') {
      enqueueSnackbar('No puede estar vacío ni ser un espacio en blanco', { variant: 'error' })
      return setTag('');;
    }

    const currentTags = getValues('tags').map(tag => tag.toLowerCase().trim());
    
    if(currentTags.includes(newTag)) {
      enqueueSnackbar('Ya existe esa etiqueta', { variant: 'info' })
      return setTag('');
    }

    const newValue = [ ...currentTags, newTag ]
    setValue('tags', newValue, { shouldValidate: true })
    setTag('');
  }

  const onFilesSelected = async({ target }: ChangeEvent<HTMLInputElement>) => {
    if(! target.files || target.files.length === 0) return;
    setIsSubmittingFile(true)
    try {
      
      for ( const file of target.files ) {
        const formData = new FormData();
        formData.append('file', file)
        const { data } = await shopApi.post<{ message: string}>('/admin/upload', formData);
        console.log({data})
        setValue('images', [ ...getValues('images'), data.message ], { shouldValidate: true })
      }
      
    } catch (error) {
      console.log({error})
    } finally {
      setIsSubmittingFile(false);
    }
  };

  const onDeleteImage = (image: string) => {
    setValue('images', getValues('images').filter(img => img !== image), { shouldValidate: true })
  }

  const onSubmit = async( form: FormData ) => {
    
    if( form.images.length < 2 ) {
      enqueueSnackbar('Mínimo 2 imagenes', { variant: 'error' });
      return;
    }

    try {
      const { data } = await shopApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form
      })

      console.log({data})

      if(!form._id) {
        // TODO: recargar navegador;
        enqueueSnackbar('Producto creado con éxito');
        router.replace(`/admin/products/${ form.slug }`);
        return;
      }

      enqueueSnackbar('Producto actualizado exitosamente')
      router.replace('/admin/products');

    } catch (error) {
      console.log({error});
      enqueueSnackbar(form._id ? 'No se pudo actualizar el producto' : 'No se pudo crear el producto', { variant: 'error' })
    }
  }



    return (
        <AdminLayout 
          pageTitle={`Editar producto | Panel Admin | Muscle Home'`}
          pageDescription='Panel de mantenimiento de productos de Muscle Home'
          title='Productos'
          subTitle={`Editar producto ${product.title}`}
          icon={<DriveFileRenameOutline />}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <LoadingButton
                        loading={isSubmitting} 
                        disabled={isSubmitting}
                        variant='contained'
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        >
                        Guardar
                    </LoadingButton>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('description', {
                              required: 'Este campo es requerido',
                              minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                              required: 'Este campo es requerido',
                              min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                              required: 'Este campo es requerido',
                              min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('type')}
                                onChange={ e => setValue('type', e.target.value, { shouldValidate: true } ) }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('gender')}
                                onChange={ e => setValue('gender', e.target.value, { shouldValidate: true } ) }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel 
                                      key={size} 
                                      control={<Checkbox checked={ getValues('sizes').includes(size) } />} 
                                      onChange={() => onChangeSizes(size)}
                                      label={ size } 
                                    />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                              required: 'Este campo es requerido',
                              validate: (value) => value.trim().includes(' ') ? 'No puede tener espacios en blanco' : undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            value={tag}
                            onChange={e => setTag(e.target.value)}
                            onKeyDown={onAddTag}
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={capitalize(tag)}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <LoadingButton
                              loading={isSubmittingFile}
                              color="secondary"
                              variant='contained'
                              fullWidth
                              startIcon={ <UploadOutlined /> }
                              sx={{ mb: 3 }}
                              onClick={() => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </LoadingButton>
                            <input
                              ref={ fileInputRef } 
                              type='file'
                              multiple
                              accept='image/png, image/gif, image/jpeg'
                              style={{display: 'none'}}
                              onChange={ onFilesSelected }
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ `Imagen de ${getValues('title')}` }
                                                />
                                                <CardActions>
                                                    <Button onClick={() => onDeleteImage(img)} fullWidth color="error">
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;
    
    let product: IProduct | null;

    if (slug === 'new') {

      const tempProduct = JSON.parse( JSON.stringify( new Product() ))
      delete tempProduct._id;
      product = tempProduct;

    } else {
      product = await dbProducts.getProductBySlug(slug.toString());
    }

    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage