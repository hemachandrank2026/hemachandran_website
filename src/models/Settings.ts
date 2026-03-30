import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  homeImage?: string;
  aboutImage?: string;
  counts: {
    patents: number;
    books: number;
    articles: number;
    keynotes: number;
    partnerships: number;
    fellows: number;
  };
}

const SettingsSchema = new Schema(
  {
    homeImage: { type: String, default: '' },
    aboutImage: { type: String, default: '' },
    counts: {
      patents: { type: Number, default: 50 },
      books: { type: Number, default: 50 },
      articles: { type: Number, default: 100 },
      keynotes: { type: Number, default: 38 },
      partnerships: { type: Number, default: 80 },
      fellows: { type: Number, default: 120 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
