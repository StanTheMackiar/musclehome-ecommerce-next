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

       case 'GET':
            return checkToken( req, res )

       default:
           return res.status(400).json({ message:'Bad request'})
   }

}

const checkToken = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token = '' } = req.cookies;

    let userId = '';

    try {
        userId = await jwt.isValidToken( token );

    } catch (error) {
        return res.status(401).json({
            message: 'Autentication token is not valid'
        })
    }



    await db.connect();
    const dbUser = await User.findById( userId ).lean();
    await db.disconnect();

    if ( !dbUser ) {
        return res.status(400).json({ message: 'ID user do not exist' })
    }

    const { _id, email, role, name } = dbUser;

    return res.status(200).json({
        token: jwt.signToken( _id, email ),
        user: {
            email,
            role,
            name,
        }
    })



}