import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt, utils, validations } from '../../../utils';

type Data = 
| { message: string }
| {
    token: string,
    user: {
        email: string,
        name: string,
        lastname: string,
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

    let { name = '', lastname = '', email = '', password = '' } = req.body as { email: string, password: string, name: string, lastname: string };

    console.log({name})

    // Formateando informacion

    name = utils.capitalize(name).trim();
    lastname = utils.capitalize(lastname).trim();
    email = email.toLowerCase().trim();
    

    // Validacion de datos

    
    if ( password.length < 6 ) {
        return res.status(400).json({
            message: 'La contraseña debe tener 6 o más caracterse'
        })
    };

    // if ( !validations.isValidPassword( password ) ) {
    //     return res.status(400).json({
    //         message: 'Password is not valid'
    //     })
    // };

    if ( !validations.isValidName( name )) {
        return res.status(400).json({
            message: 'El nombre introducido no es válido'
        })
    }

    if ( !validations.isValidName( lastname )) {
        return res.status(400).json({
            message: 'El apellido introducido no es válido'
        })
    }


    if ( !validations.isValidEmail( email )) {
        return res.status(400).json({
            message: 'El correo no tiene un formato adecuado'
        })
    };

    await db.connect();

    const dbUser = await User.findOne({ email });
    
    if ( dbUser ) {
        return res.status(400).json({
            message: 'Este usuario ya ha sido registrado'
        })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'client',
        name,
        lastname,
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

    const token = jwt.createSignToken( _id, email );

    return res.status(200).json({
        token,
        user: {
            email,
            role,
            name,
            lastname,
        }
    })

}