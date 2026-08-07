import { Request, Response, NextFunction } from 'express';
import ChatMessage from '../models/ChatMessage';
import ChatRoom from '../models/ChatRoom';
import { AppError } from '../middleware/errorMiddleware';
import logger from '../utils/logger';

// @desc    Get chat history for a tournament
// @route   GET /api/v1/chat/:tournamentId
export const getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tournamentId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const chatRoom = await ChatRoom.findOne({ tournamentId });
    if (!chatRoom) {
      return next(new AppError('Chat room not found', 404));
    }

    const messages = await ChatMessage.find({ chatRoomId: chatRoom._id })
      .populate('senderId', 'name profilePhoto')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ChatMessage.countDocuments({ chatRoomId: chatRoom._id });

    res.status(200).json({
      success: true,
      data: messages.reverse(),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error(`Get chat history error: ${error}`);
    next(error);
  }
};

// @desc    Delete a message (Moderation)
// @route   DELETE /api/v1/chat/:messageId
export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messageId } = req.params;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    const message = await ChatMessage.findById(messageId);
    if (!message) {
      return next(new AppError('Message not found', 404));
    }

    // Only the sender, room organizer, or admin can delete
    const chatRoom = await ChatRoom.findById(message.chatRoomId);
    const isOrganizer = chatRoom && chatRoom.participants.includes(userId);

    if (message.senderId.toString() !== userId.toString() && !isOrganizer && userRole !== 'super_admin') {
      return next(new AppError('You are not authorized to delete this message', 403));
    }

    message.isDeleted = true;
    await message.save();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    logger.error(`Delete message error: ${error}`);
    next(error);
  }
};