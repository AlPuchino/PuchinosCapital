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

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const listings = await collection.find().toArray();

    console.log('Listados cargados correctamente');

    console.log('los listados son:', listings);

    res.status(200).json(listings);
  } catch (error) {
    console.error('Error al cargar los listados:', error);
    res.status(500).json({ error: 'Error al cargar los listados' });
  }
}
