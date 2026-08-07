import http from 'http';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';
import app from './app';
import { config } from './config/env';
import { connectDB } from './config/database';
import logger from './utils/logger';
import ChatRoom from './models/ChatRoom';
import ChatMessage from './models/ChatMessage';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getRoom = async (tournamentId: string, userId?: string) => {
  let room = await ChatRoom.findOne({ tournamentId });
  if (!room) {
    room = await ChatRoom.create({ tournamentId, participants: userId ? [userId] : [] });
  } else if (userId && !room.participants.some((p) => p.toString() === userId)) {
    room.participants.push(new mongoose.Types.ObjectId(userId));
    await room.save();
  }
  return room;
};

io.on('connection', (socket: Socket) => {
  const userId = (socket.handshake.auth?.userId as string) || null;
  logger.info(`Socket connected: ${socket.id}${userId ? ` (user: ${userId})` : ''}`);

  // Join a tournament chat room and send previous messages
  socket.on('join_room', async (tournamentId: string) => {
    try {
      if (!tournamentId) return;
      socket.join(tournamentId);

      const room = await getRoom(tournamentId, userId || undefined);
      const messages = await ChatMessage.find({ chatRoomId: room._id, isDeleted: false })
        .populate('senderId', 'name profilePhoto')
        .sort({ createdAt: 1 })
        .limit(100);

      const previousMessages = messages.map((m: any) => ({
        id: m._id.toString(),
        user: m.senderId?.name || 'Guest',
        profilePhoto: m.senderId?.profilePhoto || null,
        message: m.message,
        timestamp: formatTimestamp(m.createdAt),
      }));

      socket.emit('previous_messages', previousMessages);
      socket.to(tournamentId).emit('user_joined', 'A user has joined the chat');
    } catch (error) {
      logger.error(`Join room error: ${error}`);
      socket.emit('chat_error', 'Could not load chat history');
    }
  });

  // Leave a tournament chat room
  socket.on('leave_room', (tournamentId: string) => {
    socket.leave(tournamentId);
  });

  // Send a message to the room and persist it
  socket.on('send_message', async (data: any) => {
    try {
      const tournamentId: string = data?.tournamentId;
      const message: string = data?.message;

      if (!tournamentId || !message || !message.trim()) return;

      const room = await getRoom(tournamentId, userId || undefined);
      const senderId = userId ? new mongoose.Types.ObjectId(userId) : null;

      const saved = await ChatMessage.create({
        chatRoomId: room._id,
        senderId,
        message: message.trim(),
        isDeleted: false,
      });

      room.lastMessageAt = new Date();
      await room.save({ validateBeforeSave: false });

      const broadcastMessage = {
        id: saved._id.toString(),
        user: data?.user || 'Guest',
        message: saved.message,
        timestamp: formatTimestamp(saved.createdAt),
      };

      io.to(tournamentId).emit('receive_message', broadcastMessage);
    } catch (error) {
      logger.error(`Send message error: ${error}`);
    }
  });

  // Typing indicators
  socket.on('typing', (data: any) => {
    if (data?.tournamentId) {
      socket.to(data.tournamentId).emit('typing', data);
    }
  });

  socket.on('stop_typing', (data: any) => {
    if (data?.tournamentId) {
      socket.to(data.tournamentId).emit('stop_typing', data);
    }
  });

  // Message read
  socket.on('message_read', (data: any) => {
    if (data?.tournamentId) {
      socket.to(data.tournamentId).emit('message_read', data);
    }
  });

  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

const start = async (): Promise<void> => {
  try {
    await connectDB();
    server.listen(config.port, () => {
      logger.info(`Server running on port ${config.port} (${config.nodeEnv})`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

start();

export { server, io };
