const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});

io.on('connection', (socket) => {
    console.log('user-connection');

    socket.on('on-chat', (data) => {
        //send message to all the client including sender
        io.emit('user-chat', data);
    });
});

const broadcastBitcoinPrice = async () => {
    while (true) {
        const price = 37250 + Math.random() * 400;
        io.emit('bitcoin-price', {
            price: price.toFixed(2),
        });

        await sleep(1000);
    }
};

const sleep = async (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};

broadcastBitcoinPrice();
