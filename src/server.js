const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// make io globally accessible
app.set('io', io);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
});

server.listen(5000, () => {
    console.log('Server running on port 5000');
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('JOIN_RFQ', (rfqId) => {
        const room = `rfq_${rfqId}`;
        socket.join(room);
        console.log(`User ${socket.id} joined ${room}`);
    });
});