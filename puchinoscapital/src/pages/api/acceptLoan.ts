// import { NextApiRequest, NextApiResponse } from 'next';

// const dbName = 'Puchinos-Capital';
// const collectionName = 'listings';

// export default async function handleAcceptLoan(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { listingCollection, loanId, userId } = req.body;

//     const { MongoClient, ObjectId } = require('mongodb');

//     const uri = 'mongodb+srv://alpuchinodev:Ocvoe0dsdTS6lcRu@capital.tbqrt8j.mongodb.net/';

//     const client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     await client.connect();

//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Busca el listado por el nombre
//     const result = await collection.findOne({ name: listingCollection });

//     if (!result) {
//       res.status(400).json({ error: 'Invalid listingCollection' });
//       return;
//     }

//     // Actualiza el campo "available" a false
//     await collection.updateOne({ name: listingCollection, 'lenders.from': loanId }, { $set: { 'lenders.$.available': false } });

//     // Elimina el prestamista de la colección
//     await collection.updateOne({ name: listingCollection }, { $pull: { lenders: { from: loanId } } });

//     // Obtiene los datos del préstamo
//     const loan = result.lenders.find((lender: { from: any; }) => lender.from === loanId);

//     if (!loan) {
//       res.status(400).json({ error: 'Invalid loanId' });
//       return;
//     }

//     // Agrega el préstamo al usuario
//     const userCollection = db.collection('users');
//     let userResult = await userCollection.findOne({ _id: userId });

//     // Si el usuario no existe, se crea uno nuevo
//     if (!userResult) {
//       await userCollection.insertOne({ _id: userId, loans: [] });
//       userResult = { _id: userId, loans: [] };
//     }

//     const newLoan = {
//       from: loan.from,
//       amount: loan.amount,
//       interest: loan.interest,
//       time: loan.time,
//       available: true
//     };

//     await userCollection.updateOne({ _id: userId }, { $push: { loans: newLoan } });

//     console.log("Loan accepted");
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error accepting loan:", error);
//     res.status(500).json({ error: 'Error accepting loan' });
//   }
// }
