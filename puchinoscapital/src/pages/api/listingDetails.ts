import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1614166",
  key: "6737a76f2d851a4100bf",
  secret: "5f4f71b22b6e848927de",
  cluster: "us3",
  useTLS: true,
});

const dbName = 'Puchinos-Capital';
const collectionName = 'listings';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const { MongoClient } = require('mongodb');

    const uri = 'mongodb+srv://alpuchinodev:Ocvoe0dsdTS6lcRu@capital.tbqrt8j.mongodb.net/';

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    console.log('Conectado a la base de datos correctamente');

    const { id } = req.body;

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const listing = await collection.findOne({ name: id });

    // console.log('Listing cargado correctamente:', listing);

    pusher.trigger("my-channel", "listing-updated", listing);

    res.status(200).json(listing);
  } catch (error) {
    console.error('Error al cargar el listing:', error);
    res.status(500).json({ error: 'Error al cargar el listing' });
  }
}