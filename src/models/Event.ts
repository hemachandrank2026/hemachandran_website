import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  location: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  link: { type: String },
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
