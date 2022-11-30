import { NextPage } from 'next';
import { useContext } from 'react';
import { useProducts } from '../hooks/useProducts';

import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { LangContext } from '../context/lang';

import { FullScreenLoading } from '../components/ui';




const HomePage: NextPage = () => {
  const { lang } = useContext(LangContext);

  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={lang.home.seo.title} description={lang.home.seo.description}>
      <Typography textAlign='center' variant='h1' component='h1' marginBottom={1}>{lang.home.page_content.title}</Typography>
      <Typography variant='body1' textAlign='center'><em>{lang.home.page_content.message}</em></Typography>
      <Typography textAlign='center' variant='h2' component='h2' sx={{ mt: 5 }}>{lang.home.page_content.subtitle}</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList sx={{marginTop: 1}} products={products} />
      }


    </ShopLayout>
  )
}



export default HomePage
