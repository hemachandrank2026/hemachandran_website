import mongoose from 'mongoose';

export interface IPatent {
  title: string;
  date?: string;
  link?: string;
  order?: number;
  createdAt?: Date;
}

const PatentSchema = new mongoose.Schema<IPatent>(
  {
    title: { type: String, required: true },
    date: { type: String },
    link: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Patent || mongoose.model<IPatent>('Patent', PatentSchema);
