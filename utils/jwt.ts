import jwt from 'jsonwebtoken';

// Generar un json
export const signToken = ( _id: string, email: string ) => {

    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT - Revisar las variables de entorno');
    }

    // 1.- Payload (Evitar poner información sencible)
    return jwt.sign(
        // Payload
        { _id, email },
        // Seed
        process.env.JWT_SECRET_SEED,
        // Opciones (Vigencia por ejemplo)
        { expiresIn: '30d' }
    )

}

export const isValidToken = ( token: string ):Promise<string> => {

    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT - Revisar las variables de entorno');
    }

    if ( token.length <= 10 ) {
        return Promise.reject('JWT no es válido');
    }

    return new Promise( (resolve, reject) => {
        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('JWT no es válido');
                const { _id } = payload as { _id: string };
                resolve(_id);
            })
        } catch (error) {
            reject('JWT no es válido.');
        }
    })

}


