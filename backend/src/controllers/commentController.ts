import { Request, Response, NextFunction } from 'express';
import Comment from '../models/Comment';
import Tournament from '../models/Tournament';
import { AppError } from '../middleware/errorMiddleware';
import logger from '../utils/logger';

// @desc    Get all comments for a tournament
// @route   GET /api/v1/comments/tournament/:tournamentId
export const getCommentsByTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tournamentId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    // Check if tournament exists
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return next(new AppError('Tournament not found', 404));
    }

    // Get top-level comments only (no parentId), sorted by newest first
    const comments = await Comment.find({ 
      tournamentId, 
      parentId: null, 
      isDeleted: false 
    })
      .populate('userId', 'name profilePhoto role')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    // Count total top-level comments
    const total = await Comment.countDocuments({ 
      tournamentId, 
      parentId: null, 
      isDeleted: false 
    });

    // For each comment, fetch its replies separately
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ 
          parentId: comment._id, 
          isDeleted: false 
        })
          .populate('userId', 'name profilePhoto role')
          .sort({ createdAt: 1 });

        return {
          ...comment.toObject(),
          replies,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: commentsWithReplies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error(`Get comments error: ${error}`);
    next(error);
  }
};

// @desc    Create a new comment
// @route   POST /api/v1/comments
export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tournamentId, content, parentId } = req.body;
    const userId = req.user?._id;

    if (!content || content.trim().length === 0) {
      return next(new AppError('Comment content is required', 400));
    }

    if (content.length > 500) {
      return next(new AppError('Comment must be less than 500 characters', 400));
    }

    // Check if tournament exists
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return next(new AppError('Tournament not found', 404));
    }

    // If replying, check if parent comment exists
    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        return next(new AppError('Parent comment not found', 404));
      }
    }

    const comment = await Comment.create({
      userId,
      tournamentId,
      parentId: parentId || null,
      content,
    });

    // Populate user info before returning
    await comment.populate('userId', 'name profilePhoto role');

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    logger.error(`Create comment error: ${error}`);
    next(error);
  }
};

// @desc    Toggle like on a comment
// @route   PATCH /api/v1/comments/:id/like
export const toggleLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = req.params.id;
    const userId = req.user?._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new AppError('Comment not found', 404));
    }

    // Check if user already liked this comment
    const likedIndex = comment.likes.indexOf(userId);

    if (likedIndex === -1) {
      // Add like
      comment.likes.push(userId);
    } else {
      // Remove like
      comment.likes.splice(likedIndex, 1);
    }

    await comment.save();

    res.status(200).json({
      success: true,
      data: {
        likes: comment.likes.length,
        isLiked: likedIndex === -1,
      },
    });
  } catch (error) {
    logger.error(`Toggle like error: ${error}`);
    next(error);
  }
};

// @desc    Report a comment
// @route   POST /api/v1/comments/:id/report
export const reportComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reason } = req.body;
    const commentId = req.params.id;

    if (!reason || reason.trim().length === 0) {
      return next(new AppError('Please provide a reason for reporting', 400));
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new AppError('Comment not found', 404));
    }

    comment.isReported = true;
    comment.reportReason = reason;
    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment has been reported to moderators',
    });
  } catch (error) {
    logger.error(`Report comment error: ${error}`);
    next(error);
  }
};

// @desc    Delete a comment (soft delete)
// @route   DELETE /api/v1/comments/:id
export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = req.params.id;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new AppError('Comment not found', 404));
    }

    // Check permission: Only the author, tournament organizer, or admin can delete
    const tournament = await Tournament.findById(comment.tournamentId);
    const isOrganizer = tournament && tournament.organizerId.toString() === userId.toString();
    const isAuthor = comment.userId.toString() === userId.toString();

    if (!isAuthor && !isOrganizer && userRole !== 'super_admin') {
      return next(new AppError('You are not authorized to delete this comment', 403));
    }

    // Soft delete (hide from UI but keep in DB for moderation)
    comment.isDeleted = true;
    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    logger.error(`Delete comment error: ${error}`);
    next(error);
  }
};