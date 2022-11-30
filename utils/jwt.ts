import jwt from "jsonwebtoken";


export const createSignToken = ( _id: string, email:string ) => {

    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error ('Do not have Jason Web Token seed, check enviroment variables')
    }

    return jwt.sign(
        //payload (NO PONER INFO SENSIBLE)
        { _id, email },

        // Seed
        process.env.JWT_SECRET_SEED,

        // Opciones
        { expiresIn: '30d' }
    )

}


export const isValidToken = ( token: string ): Promise<string> => {

    // Comprueba que exista el token

    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error ('Do not have Jason Web Token seed, check enviroment variables')
    }

    if ( token.length <= 10 ) return Promise.reject('JWT is not valid');

    return new Promise( (resolve, reject) => {

        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload) => {

                if ( err ) return reject('JWT is not valid');
                const { _id } = payload as { _id: string };

                return resolve(_id)

            } )
        } catch (error) {
            reject('JWT is not valid');
        }


    } )

}