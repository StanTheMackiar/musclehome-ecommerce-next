import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Button, Link, Typography } from '@mui/material'
import { FC } from 'react'
import { ShopLayout } from '../../components/layouts'


const EmptyCardPage:FC = () => {

   return (
      <ShopLayout title='Carrito vacío' description='No hay articulos en el carrito de compras'>
        <Box 
            display='flex' 
            flexDirection='column' 
            justifyContent='center'  
            alignItems='center' 
            height='calc(100vh - 200px)'
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography textAlign='center' variant='h6' marginTop={2}>Aún no añadiste articulos a tu carrito de compras</Typography>
                <Link href='/'>
                    <Button sx={{mt: 2}} size='large' color='secondary'>Ir a comprar</Button>
                </Link>
            </Box>
        </Box>
      </ShopLayout>
   )
}

export default EmptyCardPage