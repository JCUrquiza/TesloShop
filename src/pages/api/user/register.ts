import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { db } from '../../../../database'
import { User } from '../../../../models'
import { jwt, validations } from '../../../../utils';

type Data = 
| { message: string }
| {
    token: string;
    user: {
        email:string;
        name: string;
        role: string;
    }
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return registerUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }

}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', name = '' } = req.body as {email: string, password: string, name: string};

    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe de ser de más de 6 caracteres.' })
    }

    if (name.length < 3) {
        return res.status(400).json({ message: 'El nombre debe de ser de más de 2 caracteres.' })
    }

    if (!validations.isValidEmail(email)) {
        res.status(400).json({
            message: 'El correo no es válido.'
        })
    }

    await db.connect();
    const user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ message: 'No puede usar ese correo.' })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name
    });

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Revisar logs de servidor' })
    }


    const { _id, role } = newUser;

    const token = jwt.signToken( _id, name );

    return res.status(200).json({
        token,  // jwt
        user: {
            email, role, name
        }
    })

}


