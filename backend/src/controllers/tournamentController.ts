import { Request, Response, NextFunction } from 'express';
import Tournament from '../models/Tournament';
import { AppError } from '../middleware/errorMiddleware';
import logger from '../utils/logger';

// @desc    Get all tournaments
// @route   GET /api/v1/tournaments
export const getAllTournaments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = { status: { $ne: 'Draft' } }; // Don't show drafts to public
    
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.organizerId) filter.organizerId = req.query.organizerId;

    // Sort
    const sort: any = { startDate: 1 }; // Default: soonest first
    if (req.query.sort === 'newest') sort.createdAt = -1;
    if (req.query.sort === 'popular') sort.views = -1;

    const tournaments = await Tournament.find(filter)
      .populate('organizerId', 'name email profilePhoto')
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total = await Tournament.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: tournaments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error(`Get tournaments error: ${error}`);
    next(error);
  }
};

// @desc    Get single tournament by ID
// @route   GET /api/v1/tournaments/:id
export const getTournamentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('organizerId', 'name email profilePhoto phone');

    if (!tournament) {
      return next(new AppError('Tournament not found', 404));
    }

    // Increment views
    tournament.views += 1;
    await tournament.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: tournament,
    });
  } catch (error) {
    logger.error(`Get tournament by ID error: ${error}`);
    next(error);
  }
};

// @desc    Create a new tournament
// @route   POST /api/v1/tournaments
export const createTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      description,
      poster,
      venue,
      location,
      startDate,
      endDate,
      registrationDeadline,
      category,
      tournamentType,
      maxTeams,
      entryFee,
      prizePool,
    } = req.body;

    // Organizer is the currently logged-in user
    const organizerId = req.user?._id;

    const tournament = await Tournament.create({
      title,
      description,
      poster,
      venue,
      location,
      organizerId,
      startDate,
      endDate,
      registrationDeadline,
      category,
      tournamentType,
      maxTeams,
      entryFee,
      prizePool,
      status: 'Pending', // Requires admin approval by default
    });

    res.status(201).json({
      success: true,
      data: tournament,
    });
  } catch (error) {
    logger.error(`Create tournament error: ${error}`);
    next(error);
  }
};

// @desc    Update a tournament
// @route   PUT /api/v1/tournaments/:id
export const updateTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return next(new AppError('Tournament not found', 404));
    }

    // Check permission: Only organizer or admin can update
    if (tournament.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== 'super_admin') {
      return next(new AppError('You are not authorized to update this tournament', 403));
    }

    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedTournament,
    });
  } catch (error) {
    logger.error(`Update tournament error: ${error}`);
    next(error);
  }
};

// @desc    Delete a tournament
// @route   DELETE /api/v1/tournaments/:id
export const deleteTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return next(new AppError('Tournament not found', 404));
    }

    // Check permission: Only organizer or admin can delete
    if (tournament.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== 'super_admin') {
      return next(new AppError('You are not authorized to delete this tournament', 403));
    }

    await tournament.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Tournament deleted successfully',
    });
  } catch (error) {
    logger.error(`Delete tournament error: ${error}`);
    next(error);
  }
};