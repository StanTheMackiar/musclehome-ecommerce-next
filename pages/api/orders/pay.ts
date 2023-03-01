import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { json } from 'stream/consumers';
import { IPaypal } from '../../../interfaces';
import { connect, disconnect } from '../../../database/db';
import { Order } from '../../../models';
import { db } from '../../../database';

type Data = {
   message: string
}

export default function handler(req:NextApiRequest, res: NextApiResponse<Data>) {

   switch ( req.method ) {

       case 'POST':
            return payOrder( req, res )

       default:
           return res.status(400).json({ message:'Bad request'})
   }

}

const getPaypalBearerToken = async(): Promise<string | null> => {
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET_ID;
    
    const base64Token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64')

    const body = new URLSearchParams('grant_type=client_credentials')

    // const data = {
    //     grant_type: 'client_credentials'
    //   };

    try {
        
        const res = await fetch(process.env.PAYPAL_OAUTH_URL || '', {
            method: 'POST',
            body,
            headers: {
                'Authorization': `Basic ${ base64Token }`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const data = await res.json();
        return data.access_token;
  

    } catch (error) {
        if ( axios.isAxiosError(error)) {
            console.log(error.response?.data);
        } else {
            console.log(error)
        }

        return null;
    }
}

const payOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    // Todo: validar sesion del usuario
    // Todo: validar mongoID

    const paypalBearerToken = await getPaypalBearerToken();
    
    if (!paypalBearerToken) return res.status(400).json({message: 'No se pudo confirmar el token de paypal'})

    const { transaction_id = '', order_id = '' } = req.body;

    try {
        
    } catch (error) {
        
    }
    const { data } = await axios.get<IPaypal.PaypalOrderResponse>( `${ process.env.PAYPAL_ORDERS_URL }/${ transaction_id }`, {
        headers: { 
            'Authorization': `Bearer ${ paypalBearerToken }`
          },
    } )

    if (data.status !== 'COMPLETED') {
        return res.status(401).send({ message: 'Orden no reconocida' })
    }


    await db.connect();
    const dbOrder = await Order.findById( order_id );

    if( !dbOrder ) {
        await db.disconnect();
        return res.status(401).json({ message: 'Orden no existe en la DB'})
    };

    if ( dbOrder.cartSummary.total !== Number(data.purchase_units[0].amount.value) ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Los montos de PayPal no son iguales con la orden'})
    }

    dbOrder.transactionId = transaction_id;
    dbOrder.isPaid = true;
    dbOrder.save();

    await db.disconnect();


    return res.status(200).json({message: 'Orden pagada' })
}