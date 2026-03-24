import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Provide absolute paths for environmental variables and local images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Minimal Schema definitions for the migration
const bookSchema = new mongoose.Schema({ coverImage: String }, { strict: false });
const pubSchema = new mongoose.Schema({ thumbnail: String }, { strict: false });
const affilSchema = new mongoose.Schema({ img: String }, { strict: false });

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
const Publication = mongoose.models.Publication || mongoose.model('Publication', pubSchema);
const Affiliation = mongoose.models.Affiliation || mongoose.model('Affiliation', affilSchema);

async function uploadLocalImage(localPathUrl) {
  // Assume URL is something like "/images/book.png"
  if (!localPathUrl.startsWith('/images/')) return localPathUrl; // Already external or unhandled format

  const filename = localPathUrl.replace('/images/', '');
  const absolutePath = path.join(__dirname, '..', 'public', 'images', filename);

  try {
    console.log(`Uploading ${filename}...`);
    const result = await cloudinary.uploader.upload(absolutePath, {
      folder: 'portfolio',
      format: 'webp',
      transformation: [{ quality: 'auto', fetch_format: 'webp' }]
    });
    return result.secure_url;
  } catch (err) {
    console.error(`Failed to upload ${filename}:`, err.message);
    return localPathUrl; // Fallback to original
  }
}

async function runMigration() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Migrate Books
    const books = await Book.find({});
    for (const b of books) {
      if (b.coverImage && b.coverImage.startsWith('/images/')) {
        const newUrl = await uploadLocalImage(b.coverImage);
        if (newUrl !== b.coverImage) {
          b.coverImage = newUrl;
          await b.save();
        }
      }
    }
    console.log(`Migrated ${books.length} Books.`);

    // Migrate Publications
    const pubs = await Publication.find({});
    for (const p of pubs) {
      if (p.thumbnail && p.thumbnail.startsWith('/images/')) {
        const newUrl = await uploadLocalImage(p.thumbnail);
        if (newUrl !== p.thumbnail) {
          p.thumbnail = newUrl;
          await p.save();
        }
      }
    }
    console.log(`Migrated ${pubs.length} Publications.`);

    // Migrate Affiliations
    const affils = await Affiliation.find({});
    for (const a of affils) {
      if (a.img && a.img.startsWith('/images/')) {
        const newUrl = await uploadLocalImage(a.img);
        if (newUrl !== a.img) {
          a.img = newUrl;
          await a.save();
        }
      }
    }
    console.log(`Migrated ${affils.length} Affiliations.`);

    // Also upload the hardcoded UI images and print their URLs so we can manually update the TSX files
    console.log('Uploading hardcoded UI images...');
    const homeImageUrl = await uploadLocalImage('/images/hemachandran.jpeg');
    const aboutImageUrl = await uploadLocalImage('/images/hemachandran1.jpeg');
    
    console.log('\n--- UI Image URLs ---');
    console.log('Home Page Image (hemachandran.jpeg):', homeImageUrl);
    console.log('About Page Image (hemachandran1.jpeg):', aboutImageUrl);
    console.log('---------------------\n');

    console.log('Migration Complete.');
  } catch (err) {
    console.error('Migration Aborted:', err);
  } finally {
    await mongoose.disconnect();
  }
}

runMigration();
