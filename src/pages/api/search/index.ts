import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(400).json({ message: 'Debe de espesíficar el query de búsqueda' })
}