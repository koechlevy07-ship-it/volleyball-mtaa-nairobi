const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

// ✅ Updated CORS to allow connections from any frontend (Vercel, localhost, etc.)
// For production, you can replace "*" with your exact Vercel URL after deploying.
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Store rooms and messages in memory (for demo)
// In production, you would store this in MongoDB
const chatRooms = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle joining a tournament room
  socket.on('join_room', (tournamentId) => {
    socket.join(tournamentId);
    console.log(`User ${socket.id} joined room: ${tournamentId}`);
    
    // Send previous messages to the user if they exist
    if (chatRooms[tournamentId]) {
      socket.emit('previous_messages', chatRooms[tournamentId]);
    } else {
      // Initialize empty room
      chatRooms[tournamentId] = [];
      socket.emit('previous_messages', []);
    }

    // Broadcast to room that a user joined
    socket.to(tournamentId).emit('user_joined', `A user has joined the chat`);
  });

  // Handle sending a message
  socket.on('send_message', (data) => {
    const { tournamentId, user, message, timestamp } = data;
    
    const newMessage = { user, message, timestamp, id: Date.now() };
    
    // Store in memory
    if (!chatRooms[tournamentId]) {
      chatRooms[tournamentId] = [];
    }
    chatRooms[tournamentId].push(newMessage);

    // Broadcast to everyone in the room (including sender)
    io.to(tournamentId).emit('receive_message', newMessage);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Chat server running on http://localhost:${PORT}`);
});