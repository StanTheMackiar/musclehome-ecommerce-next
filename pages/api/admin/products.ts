import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../interfaces/products';
import { db } from '../../../database';
import Product from '../../../models/Product';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config( process.env.CLOUDINARY_URL || '' );

type Data = 
| { message: string }
| IProduct[]
| IProduct

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {

  switch (req.method) {
    case 'GET':
      return getProducts(req, res)
    case 'PUT':
      return updateProduct( req, res )
    case 'POST':
      return createProduct( req, res )

    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await Product.find()
    .sort({title: 'asc'})
    .lean();

  await db.disconnect();

  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http') ? image : `${process.env.HOST_NAME || ''}/products/${ image }`
    })
    return product;
  })

  res.status(200).send( updatedProducts )
}

const updateProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
  const { _id = '', images = [] } = req.body as IProduct;

  if( !isValidObjectId( _id ) ) return res.status(400).json({ message: 'El id del producto no es válido'});
  if( images.length < 2 ) return res.status(400).json({ message: 'Son necesarias al menos 2 imágenes'});
  
  try {
    await db.connect();

    const product = await Product.findById( _id );
    if (!product) {
      await db.disconnect();
      return res.status(404).json({ message: 'No existe un producto con ese id'});
    }

    //https://res.cloudinary.com/dhnh6pngl/image/upload/v1679719943/rmdbheivyb6v3lhtiolx.jpg

    product.images.forEach( async(image) => {
      if( !images.includes(image) ){
        const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1).split('.');
        console.log({image, fileId, extension})
        await cloudinary.uploader.destroy(fileId);
      }
    })

    await product.update( req.body );
    await db.disconnect();

    return res.status(200).json( product );

  } catch (error) {
    console.log({error})
    await db.disconnect();
    return res.status(500).json({ message: 'Revisar la consola del servidor'});
  }

}
const createProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
  const { images = [] } = req.body as IProduct;

  if( images.length < 2 ) return res.status(400).json({ message: 'Son necesarias al menos 2 imágenes'});
  
  try {
    await db.connect();
    const productInDB = await Product.findOne({ slug: req.body.slug }).lean();
    if(productInDB) {
      return res.status(400).json({ message: 'Ya existe un producto con ese slug'});
    }

    const product = new Product( req.body );
    await product.save();
    await db.disconnect();

    return res.status(201).json( product );

  } catch (error) {
    console.log({error})
    await db.disconnect();
    return res.status(500).json({ message: 'Revisar la consola del servidor'});
  }

}

export default handler