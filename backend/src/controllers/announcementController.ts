import { Request, Response, NextFunction } from 'express';
import Announcement from '../models/Announcement';
import { AppError } from '../middleware/errorMiddleware';
import logger from '../utils/logger';

// @desc    Get all announcements
// @route   GET /api/v1/announcements
export const getAllAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.tournamentId) filter.tournamentId = req.query.tournamentId;
    if (req.query.organizerId) filter.organizerId = req.query.organizerId;

    // Sorting: Pinned announcements go first, then newest
    const announcements = await Announcement.find(filter)
      .populate('organizerId', 'name email profilePhoto')
      .populate('tournamentId', 'title')
      .sort({ isPinned: -1, createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Announcement.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: announcements,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error(`Get announcements error: ${error}`);
    next(error);
  }
};

// @desc    Get single announcement by ID
// @route   GET /api/v1/announcements/:id
export const getAnnouncementById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('organizerId', 'name email profilePhoto')
      .populate('tournamentId', 'title');

    if (!announcement) {
      return next(new AppError('Announcement not found', 404));
    }

    // Increment views
    announcement.views += 1;
    await announcement.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    logger.error(`Get announcement by ID error: ${error}`);
    next(error);
  }
};

// @desc    Create a new announcement
// @route   POST /api/v1/announcements
export const createAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, category, tournamentId, image } = req.body;
    const organizerId = req.user?._id;

    const announcement = await Announcement.create({
      title,
      content,
      category,
      tournamentId: tournamentId || null,
      organizerId,
      image,
    });

    // TODO: Trigger notifications for followers (Phase A11)

    res.status(201).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    logger.error(`Create announcement error: ${error}`);
    next(error);
  }
};

// @desc    Update an announcement
// @route   PUT /api/v1/announcements/:id
export const updateAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return next(new AppError('Announcement not found', 404));
    }

    // Check permission: Only organizer or admin can update
    if (announcement.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== 'super_admin') {
      return next(new AppError('You are not authorized to update this announcement', 403));
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedAnnouncement,
    });
  } catch (error) {
    logger.error(`Update announcement error: ${error}`);
    next(error);
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/v1/announcements/:id
export const deleteAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return next(new AppError('Announcement not found', 404));
    }

    // Check permission: Only organizer or admin can delete
    if (announcement.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== 'super_admin') {
      return next(new AppError('You are not authorized to delete this announcement', 403));
    }

    await announcement.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
    });
  } catch (error) {
    logger.error(`Delete announcement error: ${error}`);
    next(error);
  }
};

// @desc    Toggle pin status (Admin only)
// @route   PATCH /api/v1/announcements/:id/pin
export const togglePin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== 'super_admin') {
      return next(new AppError('Only super admins can pin announcements', 403));
    }

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return next(new AppError('Announcement not found', 404));
    }

    announcement.isPinned = !announcement.isPinned;
    await announcement.save();

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    logger.error(`Toggle pin error: ${error}`);
    next(error);
  }
};