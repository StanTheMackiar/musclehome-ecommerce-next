import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';

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
            return registerUser( req, res )

       default:
           return res.status(400).json({ message:'Bad request'})
   }

}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', name= '' } = req.body as { email:string, password: string, name: string };

    // Validacion de datos

    if ( password.length < 6 ) {
        return res.status(400).json({
            message: 'Password should have 6 caracters or more'
        })
    };

    if ( name.length < 2 ) {
        return res.status(400).json({
            message: 'Name should have 2 caracters or more'
        })
    };

    if ( !validations.isValidEmail( email )) {
        return res.status(400).json({
            message: 'Email is not valid'
        })
    };

    await db.connect();

    const dbUser = await User.findOne({ email });
    
    if ( dbUser ) {
        return res.status(400).json({
            message: 'This email is already registered'
        })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'client',
        name,
    });

    try {
        await newUser.save({ validateBeforeSave: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Check server logs'
        })
    }


    const { _id, role } = newUser;

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