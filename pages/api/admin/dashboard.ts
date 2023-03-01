import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User, Order, Product } from '../../../models';

type Data = {
   numberOfOrders:          number,
   paidOrders:              number,
   notPaidOrders:           number,
   numberOfClients:         number,
   numberOfProducts:        number,
   productsWithNoInventory: number, 
   lowInventory:            number, // 10 o menos
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

  await db.connect();

  const [ 
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
   ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: 'client' }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ])

  await db.disconnect();

res.status(200).send({
  numberOfOrders,
  paidOrders,
  notPaidOrders: numberOfClients - paidOrders,
  numberOfClients,
  numberOfProducts,
  productsWithNoInventory,
  lowInventory: lowInventory,
})

}

