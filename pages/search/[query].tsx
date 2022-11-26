import { NextPage } from 'next';
import { GetServerSideProps } from 'next'

import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

import { IProduct } from '../../interfaces/products';
import { dbProducts } from '../../database';
import { utils } from '../../utils';

interface Props {
    foundProducts: boolean,
    products: IProduct[],
    query: string,
}

const SearchPage: NextPage<Props> = ({ foundProducts, query, products }) => {
 


  return (
    <ShopLayout title={`Busqueda: ${query}`} description={`Resultados de la busqueda: ${query}`}>
        <Typography textAlign='center' variant='h1' component='h1' marginBottom={1}>Resultados de búsqueda</Typography>

        {
            foundProducts
                ?  <Typography textAlign='center' variant='h2' component='h1' marginBottom={1}>{`Productos relacionados con el término: ${utils.capitalize(query)}`}</Typography>
                :  (
                <>
                    <Typography textAlign='center' variant='h2' component='h1' marginBottom={1}>{`No se encontró ningun producto con el término: ${utils.capitalize(query)}`}</Typography>
                    
                    <Typography textAlign='center' variant='subtitle1' component='h1' marginBottom={1}>{`Tal vez te pueda interesar:`}</Typography>
                </>

                )
        }

        <ProductList sx={{marginTop: 1}} products={products} />

    </ShopLayout>
  )
}




export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }

    let products = await dbProducts.getProductsByTerm( query )
    const foundProducts = products.length > 0;

    if ( !foundProducts ) {
        // products = await dbProducts.getAllProducts();
        products = await dbProducts.getProductsByTerm('shirt')
    }

    console.log(products)

    return {
        props: {
            foundProducts,
            products,
            query,
        }
    }
}

export default SearchPage
