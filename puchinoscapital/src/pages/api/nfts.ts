import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const endpoint = 'https://maximum-wild-cloud.solana-mainnet.discover.quiknode.pro/23e472715f752adf4c286795dc3f1c299ecd284d/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { publicKey } = req.body;

  if (!publicKey) {
    return res.status(400).json({ error: 'Missing publicKey parameter' });
  }

  try {
    const data = {
      jsonrpc: '2.0',
      id: 1,
      method: 'qn_fetchNFTs',
      params: {
        wallet: publicKey,
        omitFields: ['provenance', 'traits'],
        page: 1,
        perPage: 10,
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-quiknode-subscription-id': '23e472715f752adf4c286795dc3f1c299ecd284d',
      },
    });

    const json = await response.json();

    if (json.error) {
      return res.status(400).json({ error: json.error });
    }

    return res.status(200).json(json.result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
