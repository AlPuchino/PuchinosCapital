import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://alpuchinodev:Ocvoe0dsdTS6lcRu@capital.tbqrt8j.mongodb.net/';
const dbName = 'Puchinos-Capital';
const collectionName = 'listings';

let client: MongoClient;

const connectToDatabase = async () => {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
    }
    console.log('Conectado a la base de datos correctamente');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    console.log('Conectado a la base de datos correctamente');

    const { id } = req.body;

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const listing = await collection.findOne({ name: id });

    console.log('Listing cargado correctamente:', listing);

    res.status(200).json(listing);
  } catch (error) {
    console.error('Error al cargar el listing:', error);
    res.status(500).json({ error: 'Error al cargar el listing' });
  }
}
