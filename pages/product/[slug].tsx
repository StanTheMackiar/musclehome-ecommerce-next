import React from 'react'
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';

import { ShopLayout } from '../../components/layouts';
import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';
import { ProductDetails } from '../../components/products';

interface Props {
  product: IProduct
}


const ProductPage: NextPage<Props> = ({ product }) => (

    <ShopLayout title={ product.title } description={ product.description }>
      <ProductDetails product={product} />
    </ShopLayout>
);




export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const slugs = await dbProducts.getAllProductSlugs();

  return {
    paths: slugs.map(({slug}) => ({
        params: { slug }
    })),
    fallback: 'blocking',
}
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string }

  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 1800,
  }
}

export default ProductPage
