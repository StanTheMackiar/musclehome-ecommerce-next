import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { db } from '../../../database'
import { IOrder } from '../../../interfaces'
import { Order, Product } from '../../../models';

type Data = 
| { message: string }
| IOrder

export default function handler(req:NextApiRequest, res: NextApiResponse<Data>) {

   switch ( req.method ) {

       case 'POST':
            return createOrder( req, res )

       default:
           return res.status(400).json({ message:'Bad request'})
   }

}

const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { orderItems, cartSummary: { total } } = req.body as IOrder;

    // Verificar que tengamos usuario
    const session: any = await getSession({ req });
    
    if (!session) {
        return res.status(401).json({message: 'Should be authenticated for this action'})
    }

    // Crear un arreglo con los productos que la persona pidio
    const productsIds = orderItems.map( product => product._id )
    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    try {
        
        const subTotal = orderItems.reduce((prev, current) => {

            //!Debe ser id solo, sin _id porque este ultimo hace referencia al objectID de mongo
            const currentPrice = dbProducts.find( product => product.id === current._id)?.price;

            if( !currentPrice ) {
                throw new Error('Verifique el carrito de nuevo, producto no existe')
            }

            return (currentPrice * current.quantity) + prev
        }, 0 );

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * ( taxRate + 1 );

        if ( total !== backendTotal ) {
            throw new Error('El total no cuadra con el monto')
        }

        // Todo bien hasta este punto

        const userId = session.user.id;
        const newOrder = new Order({ ...req.body, isPaid: false, user: userId })

        console.log({ ...req.body, isPaid: false, user: userId })

        await newOrder.save();
        await db.disconnect();

        return res.status(201).json( newOrder )


    } catch (err: any) {
        await db.disconnect();
        console.log(err);
        return res.status(400).json({
            message: err.message || 'Revise logs del servidor'
        })
    }
}