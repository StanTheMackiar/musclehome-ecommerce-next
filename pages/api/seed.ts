import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Product, User, Country } from '../../models'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if ( process.env.NODE_ENV === 'production' ) {
        return res.status(401).json({
            message: "Don't have acces to this service",
        })
    }

    await db.connect();

    await User.deleteMany();
    await User.insertMany( seedDatabase.initialData.users )

    await Country.deleteMany();
    await Country.insertMany( seedDatabase.initialData.countries )
    
    await Product.deleteMany();
    await Product.insertMany( seedDatabase.initialData.products );
    await db.disconnect();

    res.status(200).json({ 
        message: 'Process finished successfully' 
    })
}