import { Request, Response, NextFunction } from 'express';
import Poster from '../models/Poster';
import { AppError } from '../middleware/errorMiddleware';
import logger from '../utils/logger';
import cloudinary from '../config/cloudinary';
import streamifier from 'streamifier';

// @desc    Get all posters
// @route   GET /api/v1/posters
export const getAllPosters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.organizerId) filter.organizerId = req.query.organizerId;
    if (req.query.tournamentId) filter.tournamentId = req.query.tournamentId;

    const posters = await Poster.find(filter)
      .populate('organizerId', 'name email profilePhoto')
      .populate('tournamentId', 'title')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Poster.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: posters,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error(`Get posters error: ${error}`);
    next(error);
  }
};

// @desc    Get single poster by ID
// @route   GET /api/v1/posters/:id
export const getPosterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const poster = await Poster.findById(req.params.id)
      .populate('organizerId', 'name email profilePhoto')
      .populate('tournamentId', 'title');

    if (!poster) {
      return next(new AppError('Poster not found', 404));
    }

    poster.views += 1;
    await poster.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: poster,
    });
  } catch (error) {
    logger.error(`Get poster by ID error: ${error}`);
    next(error);
  }
};

// @desc    Create a new poster (with Cloudinary upload)
// @route   POST /api/v1/posters
export const createPoster = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, tournamentId } = req.body;
    const organizerId = req.user?._id;

    if (!req.file) {
      return next(new AppError('Please upload a poster image', 400));
    }

    // Upload to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'volleyball-mtaa/posters' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const result: any = await uploadPromise;

    const poster = await Poster.create({
      title,
      description,
      imageUrl: result.secure_url,
      tournamentId: tournamentId || null,
      organizerId,
    });

    res.status(201).json({
      success: true,
      data: poster,
    });
  } catch (error) {
    logger.error(`Create poster error: ${error}`);
    next(error);
  }
};

// @desc    Update a poster
// @route   PUT /api/v1/posters/:id
export const updatePoster = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const poster = await Poster.findById(req.params.id);

    if (!poster) {
      return next(new AppError('Poster not found', 404));
    }

    // Check permission
    if (poster.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== 'super_admin') {
      return next(new AppError('You are not authorized to update this poster', 403));
    }

    const updatedPoster = await Poster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedPoster,
    });
  } catch (error) {
    logger.error(`Update poster error: ${error}`);
    next(error);
  }
};

// @desc    Delete a poster
// @route   DELETE /api/v1/posters/:id
export const deletePoster = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const poster = await Poster.findById(req.params.id);

    if (!poster) {
      return next(new AppError('Poster not found', 404));
    }

    // Check permission
    if (poster.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== 'super_admin') {
      return next(new AppError('You are not authorized to delete this poster', 403));
    }

    // Delete image from Cloudinary
    if (poster.imageUrl) {
      const publicId = poster.imageUrl.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`volleyball-mtaa/posters/${publicId}`);
      }
    }

    await poster.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Poster deleted successfully',
    });
  } catch (error) {
    logger.error(`Delete poster error: ${error}`);
    next(error);
  }
};