import dbConnect from './mongodb';
import Settings from '@/models/Settings';
import Patent from '@/models/Patent';
import Book from '@/models/Book';
import Publication from '@/models/Publication';

export async function getDynamicCounts() {
  try {
    await dbConnect();
    
    // Fetch manual settings as a fallback for non-model entities
    const settings = await Settings.findOne() || {};
    const manualCounts = settings.counts || {};

    // Calculate real database lengths for entities with models
    // Since we have Patent, Book, and Publication
    const realPatents = await Patent.countDocuments();
    const realBooks = await Book.countDocuments();
    const realArticles = await Publication.countDocuments();

    return {
      patents: realPatents > 0 ? realPatents : (manualCounts.patents || 50),
      books: realBooks > 0 ? realBooks : (manualCounts.books || 50),
      articles: realArticles > 0 ? realArticles : (manualCounts.articles || 100),
      keynotes: manualCounts.keynotes || 38,
      partnerships: manualCounts.partnerships || 80,
      fellows: manualCounts.fellows || 120,
    };
  } catch (error) {
    console.error("Error fetching dynamic counts:", error);
    return { patents: 50, books: 50, articles: 100, keynotes: 38, partnerships: 80, fellows: 120 };
  }
}
