import mongoose, { Schema, Document } from 'mongoose';

export interface IChatRoom extends Document {
  tournamentId: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  lastMessageAt?: Date;
}

const ChatRoomSchema: Schema = new Schema(
  {
    tournamentId: { type: Schema.Types.ObjectId, ref: 'Tournament', required: true, unique: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessageAt: { type: Date },
  },
  { timestamps: true }
);

ChatRoomSchema.index({ tournamentId: 1 });

export default mongoose.model<IChatRoom>('ChatRoom', ChatRoomSchema);
