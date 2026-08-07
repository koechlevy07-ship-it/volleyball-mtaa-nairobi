import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  tournamentId: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId; // For replies
  content: string;
  likes: mongoose.Types.ObjectId[]; // Users who liked
  isReported: boolean;
  reportReason?: string;
  isDeleted: boolean;
}

const CommentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tournamentId: { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    content: { type: String, required: true, maxlength: 500 },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isReported: { type: Boolean, default: false },
    reportReason: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes
CommentSchema.index({ tournamentId: 1, createdAt: -1 });
CommentSchema.index({ parentId: 1 });
CommentSchema.index({ userId: 1 });

export default mongoose.model<IComment>('Comment', CommentSchema);