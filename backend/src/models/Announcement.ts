import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  category: 'Update' | 'Venue' | 'General' | 'Match Result' | 'Community';
  tournamentId?: mongoose.Types.ObjectId;
  organizerId: mongoose.Types.ObjectId;
  image?: string;
  isPinned: boolean;
  likes: number;
  views: number;
}

const AnnouncementSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ['Update', 'Venue', 'General', 'Match Result', 'Community'],
      default: 'Update',
    },
    tournamentId: { type: Schema.Types.ObjectId, ref: 'Tournament' },
    organizerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String },
    isPinned: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

AnnouncementSchema.index({ tournamentId: 1 });
AnnouncementSchema.index({ organizerId: 1 });
AnnouncementSchema.index({ isPinned: -1, createdAt: -1 });

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);