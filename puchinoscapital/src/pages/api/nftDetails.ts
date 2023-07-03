import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json' },
    };

    const response = await fetch(`https://api-mainnet.magiceden.dev/v2/collections/${id}/listings?limit=9`, options);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
}
