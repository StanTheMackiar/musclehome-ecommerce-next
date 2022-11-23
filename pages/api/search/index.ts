import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(400).json({ message: 'You must specify the search query, try with /api/search/<your search>' })
}