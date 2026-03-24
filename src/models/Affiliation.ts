import mongoose from 'mongoose';

export interface IAffiliation {
  name: string;
  img: string;
  order?: number;
}

const AffiliationSchema = new mongoose.Schema<IAffiliation>({
  name: { type: String, required: true },
  img: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Affiliation || mongoose.model<IAffiliation>('Affiliation', AffiliationSchema);
