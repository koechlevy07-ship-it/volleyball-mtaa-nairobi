import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamRegistration extends Document {
  tournamentId: mongoose.Types.ObjectId;
  teamName: string;
  captainId: mongoose.Types.ObjectId;
  players: mongoose.Types.ObjectId[];
  email: string;
  phone: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Waitlist';
  paymentStatus: 'Unpaid' | 'Paid' | 'Refunded';
  paymentReference?: string;
}

const TeamRegistrationSchema: Schema = new Schema(
  {
    tournamentId: { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
    teamName: { type: String, required: true },
    captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Waitlist'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Paid', 'Refunded'],
      default: 'Unpaid',
    },
    paymentReference: { type: String },
  },
  { timestamps: true }
);

TeamRegistrationSchema.index({ tournamentId: 1, status: 1 });

export default mongoose.model<ITeamRegistration>('TeamRegistration', TeamRegistrationSchema);