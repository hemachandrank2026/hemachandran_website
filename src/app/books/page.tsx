import Link from 'next/link';
import styles from './books.module.css';
import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';
import PaginatedBooks from '@/components/PaginatedBooks';

async function getBooks() {
  try {
    await dbConnect();
    const books = await Book.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(books));
  } catch {
    return [];
  }
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <>
      <div className="page-banner">
        <h1>Innovative <span className="accent-text">Masterpieces</span></h1>
        <p className="breadcrumb"><Link href="/">Home</Link> / Books</p>
      </div>

      <section className="section">
        <div className="container">
          <p className={styles.intro}>
            Explore a distinguished collection of transformative works that redefine the intersection of technology and business. Each publication offers profound insights into the future landscape of artificial intelligence and its diverse applications.
          </p>

          <PaginatedBooks books={books} />
        </div>
      </section>
    </>
  );
}
