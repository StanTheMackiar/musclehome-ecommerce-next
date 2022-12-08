import bcrypt from 'bcryptjs';
import { db } from "."
import { IUserLogged } from '../interfaces';
import { User } from "../models";


export const checkUserEmailPassword = async( email: string, password: string ): Promise<IUserLogged | null> => {

    await db.connect();
    const dbUser = await User.findOne({ email });
    await db.disconnect();

    if ( !dbUser ) {
        return null;
    };

    if ( !bcrypt.compareSync( password, dbUser.password! ) ) {
        return null;
    }

    const { role, _id, name, lastname } = dbUser;

    return {
        id: _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
        lastname,
    }
};

// Esta funcion verifica un usuario de oAuth

export const oAuthToDbUser = async( email: string, name: string ): Promise<IUserLogged> => {

    await db.connect();

    const dbUser = await User.findOne({ email })

    if ( dbUser ) {
        await db.disconnect();
        const { _id, name, lastname, email, role } = dbUser;
        return { 
            id: _id, 
            name, 
            lastname,
            email, 
            role 
        };
    };

    const newUser = new User({ 
        email, 
        name,
        lastname: '',
        password: 'oAuth',
        role: 'client',
    })

    await newUser.save();
    await db.disconnect();

    const { _id, lastname, role } = newUser;

    return {
        id: _id,
        name,
        lastname,
        email,
        role,
    }


}
