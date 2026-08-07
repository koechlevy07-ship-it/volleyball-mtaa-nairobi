import mongoose, { Schema, Document } from 'mongoose';

export interface ITournament extends Document {
  title: string;
  description: string;
  poster: string; // Cloudinary URL
  venue: string;
  location?: string;
  organizerId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  category: string; // Men, Women, Mixed, Juniors
  tournamentType: string; // Open, League, Cup, Championship
  maxTeams: number;
  entryFee?: number;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected' | 'Live' | 'Completed';
  prizePool?: {
    first: string;
    second: string;
    third: string;
  };
  matches: mongoose.Types.ObjectId[];
  views: number;
  isFeatured: boolean;
}

const TournamentSchema: Schema = new Schema(
  {
    title: { type: String, required: [true, 'Tournament title is required'] },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String },
    organizerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    category: { type: String, required: true },
    tournamentType: { type: String, required: true },
    maxTeams: { type: Number, required: true, min: 2 },
    entryFee: { type: Number },
    status: {
      type: String,
      enum: ['Draft', 'Pending', 'Approved', 'Rejected', 'Live', 'Completed'],
      default: 'Pending',
    },
    prizePool: {
      first: { type: String },
      second: { type: String },
      third: { type: String },
    },
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes for fast querying
TournamentSchema.index({ startDate: 1 });
TournamentSchema.index({ status: 1 });
TournamentSchema.index({ organizerId: 1 });
TournamentSchema.index({ category: 1 });

export default mongoose.model<ITournament>('Tournament', TournamentSchema);