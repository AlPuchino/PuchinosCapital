import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { Server as Socket } from 'socket.io';
import mongodb from 'mongodb';
import axios from 'axios';

const app = express();

app.use(express.static('public'));
app.use(morgan('combined'));

const port = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Socket(server);

const home = io.of('/');

// const db = await mongodb.MongoClient.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// db.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

home.on('connection', (socket) => {

    console.log('New connection');

    // send a message to the client
    socket.emit('message', 'Hello from server');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});


server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});