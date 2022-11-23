import { Typography } from '@mui/material';
import { useContext } from 'react';
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products/ProductList';
import { LangContext } from '../context/lang';
import { initialData } from '../database/products';




export default function HomePage() {
  
  const { lang } = useContext(LangContext);

  return (
    <ShopLayout title={lang.home.seo.title} description={lang.home.seo.description}>
      <Typography textAlign='center' variant='h1' component='h1' marginBottom={1}>{lang.home.page_content.title}</Typography>

      <Typography variant='body1' textAlign='center'><em>{lang.home.page_content.message}</em></Typography>

      <Typography textAlign='center' variant='h2' component='h2' sx={{ mt: 5 }}>{lang.home.page_content.subtitle}</Typography>

      <ProductList sx={{marginTop: 1}} products={ initialData.products as any }/>

    </ShopLayout>
  )
}
