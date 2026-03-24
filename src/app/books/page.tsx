import styles from './books.module.css';
import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';

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
        <p className="breadcrumb"><a href="/">Home</a> / Books</p>
      </div>

      <section className="section">
        <div className="container">
          <p className={styles.intro}>
            Explore a distinguished collection of transformative works that redefine the intersection of technology and business. Each publication offers profound insights into the future landscape of artificial intelligence and its diverse applications.
          </p>

          {books.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: 40 }}>
              No books found. Add books via the Admin Dashboard to see them here.
            </p>
          ) : (
            <div className="grid-3">
              {books.map((book: any) => (
                <div key={book._id} className={styles.bookCard}>
                  <div className={styles.coverWrap}>
                    <img src={book.coverImage} alt={book.title} className={styles.cover} />
                    <div className={styles.overlay}>
                      <h3>{book.title}</h3>
                      <p className={styles.meta}>{book.publisher} · {book.publishedDate}</p>
                      <div className={styles.links}>
                        {book.amazonLink && <a href={book.amazonLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>Amazon</a>}
                        {book.publisherLink && <a href={book.publisherLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>Publisher</a>}
                      </div>
                    </div>
                  </div>
                  <h4 className={styles.bookTitle}>{book.title}</h4>
                  <p className={styles.bookMeta}>{book.publisher}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
