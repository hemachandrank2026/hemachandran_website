export const dynamic = 'force-dynamic';

import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';
import Publication from '@/models/Publication';
import { getDynamicCounts } from '@/lib/getDynamicCounts';
import Settings from '@/models/Settings';
import BooksPageClientWrapper from './BooksPageClientWrapper';

async function getData() {
  try {
    await dbConnect();
    const books = await Book.find({}).sort({ createdAt: -1 }).lean();
    const pubs = await Publication.find({}).sort({ createdAt: -1 }).lean();
    const counts = await getDynamicCounts();

    const journals = pubs.filter((p: { type?: string }) => p.type === 'Journal');
    const articles = pubs.filter((p: { type?: string }) => p.type === 'Article' || !p.type);
    
    // We mock the curated "Start Here" list using the most recent combinations
    const startHereData = [
      { title: books[0]?.title || "AI For Enterprise Growth", desc: "A definitive guide to scaling operations using quantum-ready AI frameworks.", type: "Book" },
      { title: journals[0]?.title || "Ethical AI in Modern Governance", desc: "Frameworks for identifying and mitigating bias in civic machine learning systems.", type: "Journal Article" },
      { title: books[1]?.title || "The Necrobotics Paradigm", desc: "Foundational textbook on bio-inspired manipulation mechanisms for micro-robotics.", type: "Book" },
      { title: journals[1]?.title || "Predictive Matrices in Electoral AI", desc: "Analysis of quantum-probability impacts on multivariable geopolitical forecasts.", type: "Case Study" },
      { title: articles[0]?.title || "Transforming Universities with AR", desc: "A practical roadmap for Deans executing spatial computing curricula.", type: "Conference Paper" },
      { title: articles[1]?.title || "Baggage Flow AI Optimization", desc: "Computer vision application study reducing transport hub friction.", type: "Report" },
    ].filter(i => i.title);

    return {
      books: JSON.parse(JSON.stringify(books)),
      journals: JSON.parse(JSON.stringify(journals)),
      articles: JSON.parse(JSON.stringify(articles)),
      startHereData,
      counts
    };
  } catch {
    return { books: [], journals: [], articles: [], startHereData: [], counts: {} };
  }
}

export async function generateMetadata() {
  const counts = await getDynamicCounts();
  return {
    title: 'Books & Publications | Dr. Hemachandran K',
    description: `Authored ${counts.books}+ books and ${counts.articles}+ articles on AI, analytics, and digital transformation.`,
  };
}

export default async function BooksPage() {
  const data = await getData();

  return (
    <BooksPageClientWrapper
      counts={data.counts}
      startHereData={data.startHereData}
      books={data.books}
      journals={data.journals}
      conferences={data.articles}
      cases={data.articles.slice().reverse()} // Mocking cases since we don't have explicit DB separation
    />
  );
}
