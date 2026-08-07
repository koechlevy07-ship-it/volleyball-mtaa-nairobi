import mongoose, { Schema, Document } from 'mongoose';

export interface IPoster extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  organizerId: mongoose.Types.ObjectId;
  tournamentId?: mongoose.Types.ObjectId | null;
  views: number;
  savedBy: mongoose.Types.ObjectId[];
}

const PosterSchema: Schema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    description: { type: String, trim: true },
    imageUrl: { type: String, required: [true, 'Image URL is required'] },
    organizerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tournamentId: { type: Schema.Types.ObjectId, ref: 'Tournament', default: null },
    views: { type: Number, default: 0 },
    savedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

PosterSchema.index({ organizerId: 1, createdAt: -1 });
PosterSchema.index({ tournamentId: 1 });

export default mongoose.model<IPoster>('Poster', PosterSchema);
