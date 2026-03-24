'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/books/books.module.css';
import Pagination from './Pagination';
import { IBook } from '@/models/Book';

const ITEMS_PER_PAGE = 9;

export default function PaginatedBooks({ books }: { books: (IBook & { _id: string })[] }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const paginatedBooks = books.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (books.length === 0) {
    return (
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: 40 }}>
        No books found. Add books via the Admin Dashboard to see them here.
      </p>
    );
  }

  return (
    <>
      <div className="grid-3">
        {paginatedBooks.map((book) => (
          <div key={book._id} className={styles.bookCard}>
            <div className={styles.coverWrap}>
              <Image src={book.coverImage} alt={book.title} className={styles.cover} fill sizes="(max-width: 768px) 100vw, 33vw" />
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
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
