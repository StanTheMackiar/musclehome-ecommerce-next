import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt } from '../../../utils';

type Data = 
| { message: string }
| {
    token: string,
    user: {
        email: string,
        name: string,
        role: string,
    }
}

export default function handler(req:NextApiRequest, res: NextApiResponse<Data>) {

   switch ( req.method ) {

       case 'POST':
            return loginUser( req, res )

       default:
           return res.status(400).json({ message:'Bad request'})
   }

}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body;

    await db.connect();
    const dbUser = await User.findOne({ email });
    await db.disconnect();

    if ( !dbUser ) {
        return res.status(400).json({ message: 'email or password do not valid - EMAIL' })
    }

    if ( !bcrypt.compareSync( password, dbUser.password! ) ) {
        return res.status(400).json({ message: 'email or password do not valid - PASS' })
    }

    const { role, name, _id } = dbUser

    const token = jwt.signToken( _id, email );

    return res.status(200).json({
        token,
        user: {
            email,
            role,
            name,
        }
    })

}