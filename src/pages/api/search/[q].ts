import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../../interfaces';
import { db } from '../../../../database';
import { Product } from '../../../../models';

type Data = 
    | {message: string}
    | IProduct[];

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return searchProducts( req, res)
        default:
            return res.status(400).json({
                message: 'Bad Request'
            });
    }

}

const searchProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { q = ''} = req.query;

    if ( q.length === 0 ) {
        return res.status(400).json({
            message: 'Debe de espesificar el query de búsqueda'
        })
    }

    // Pasar el query a minúscula
    q = q.toString().toLowerCase();

    await db.connect();

    const products = await Product.find({
        $text: { $search: q }
    }).select('title images prices inStock slug -_id').lean();

    await db.disconnect();

    return res.status(200).json(products);

}
