import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { ICountry } from '../../../interfaces'
import { Country } from '../../../models'

type Data = 
| { message: string }
| ICountry[]  

export default function handler(req:NextApiRequest, res: NextApiResponse<Data>) {

   switch ( req.method ) {

       case 'GET':
            return getCountries( req, res )

       default:
           return res.status(400).json({ message:'Bad request'})
   }

}

const getCountries = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()

    const countries = await Country.find().select('-_id name code').lean();

    await db.disconnect()

    return res.status(200).json( countries )

}