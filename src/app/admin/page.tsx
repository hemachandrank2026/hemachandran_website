'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BookOpen, FlaskConical, LogOut, Plus, Trash2, Loader2 } from 'lucide-react';
import styles from './admin.module.css';

type Tab = 'books' | 'publications';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('books');
  const [books, setBooks] = useState<any[]>([]);
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Book form state
  const [bookForm, setBookForm] = useState({
    title: '', publisher: '', publishedDate: '', coverImage: '', amazonLink: '', publisherLink: '', format: 'Paperback'
  });

  // Publication form state
  const [pubForm, setPubForm] = useState({
    title: '', authors: '', date: '', link: '', type: 'Journal' as 'Journal' | 'Article', thumbnail: '', description: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
  }, [status, router]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [bRes, pRes] = await Promise.all([
      fetch('/api/books'),
      fetch('/api/publications'),
    ]);
    setBooks(await bRes.json());
    setPublications(await pRes.json());
    setLoading(false);
  };

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/books', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bookForm) });
    setBookForm({ title: '', publisher: '', publishedDate: '', coverImage: '', amazonLink: '', publisherLink: '', format: 'Paperback' });
    fetchData();
  };

  const deleteBook = async (id: string) => {
    if (!confirm('Delete this book?')) return;
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const addPub = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/publications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pubForm) });
    setPubForm({ title: '', authors: '', date: '', link: '', type: 'Journal', thumbnail: '', description: '' });
    fetchData();
  };

  const deletePub = async (id: string) => {
    if (!confirm('Delete this publication?')) return;
    await fetch(`/api/publications/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (status === 'loading' || loading) {
    return (
      <div className={styles.page}>
        <div style={{ textAlign: 'center', padding: 80 }}>
          <Loader2 size={40} className={styles.spin} style={{ color: 'var(--accent)' }} />
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Admin <span style={{ color: 'var(--accent)' }}>Dashboard</span></h1>
        <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logoutBtn}>
          <LogOut size={18} /> Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'books' ? styles.tabActive : ''}`} onClick={() => setActiveTab('books')}>
          <BookOpen size={18} /> Books ({books.length})
        </button>
        <button className={`${styles.tab} ${activeTab === 'publications' ? styles.tabActive : ''}`} onClick={() => setActiveTab('publications')}>
          <FlaskConical size={18} /> Publications ({publications.length})
        </button>
      </div>

      {/* Books Tab */}
      {activeTab === 'books' && (
        <div className={styles.content}>
          <form onSubmit={addBook} className={styles.addForm}>
            <h3><Plus size={18} /> Add New Book</h3>
            <div className={styles.formGrid}>
              <input placeholder="Title *" value={bookForm.title} onChange={e => setBookForm({...bookForm, title: e.target.value})} required />
              <input placeholder="Publisher *" value={bookForm.publisher} onChange={e => setBookForm({...bookForm, publisher: e.target.value})} required />
              <input placeholder="Published Date *" value={bookForm.publishedDate} onChange={e => setBookForm({...bookForm, publishedDate: e.target.value})} required />
              <input placeholder="Cover Image URL *" value={bookForm.coverImage} onChange={e => setBookForm({...bookForm, coverImage: e.target.value})} required />
              <input placeholder="Amazon Link" value={bookForm.amazonLink} onChange={e => setBookForm({...bookForm, amazonLink: e.target.value})} />
              <input placeholder="Publisher Link" value={bookForm.publisherLink} onChange={e => setBookForm({...bookForm, publisherLink: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: 12 }}>Add Book</button>
          </form>

          <div className={styles.itemList}>
            {books.map((book: any) => (
              <div key={book._id} className={styles.item}>
                <div>
                  <h4>{book.title}</h4>
                  <p>{book.publisher} · {book.publishedDate}</p>
                </div>
                <button onClick={() => deleteBook(book._id)} className={styles.deleteBtn}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications Tab */}
      {activeTab === 'publications' && (
        <div className={styles.content}>
          <form onSubmit={addPub} className={styles.addForm}>
            <h3><Plus size={18} /> Add New Publication</h3>
            <div className={styles.formGrid}>
              <input placeholder="Title *" value={pubForm.title} onChange={e => setPubForm({...pubForm, title: e.target.value})} required />
              <input placeholder="Authors *" value={pubForm.authors} onChange={e => setPubForm({...pubForm, authors: e.target.value})} required />
              <input placeholder="Date *" value={pubForm.date} onChange={e => setPubForm({...pubForm, date: e.target.value})} required />
              <input placeholder="Link *" value={pubForm.link} onChange={e => setPubForm({...pubForm, link: e.target.value})} required />
              <select value={pubForm.type} onChange={e => setPubForm({...pubForm, type: e.target.value as 'Journal' | 'Article'})}>
                <option value="Journal">Journal</option>
                <option value="Article">Article</option>
              </select>
              <input placeholder="Thumbnail URL (for Articles)" value={pubForm.thumbnail} onChange={e => setPubForm({...pubForm, thumbnail: e.target.value})} />
              <input placeholder="Description (for Articles)" value={pubForm.description} onChange={e => setPubForm({...pubForm, description: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: 12 }}>Add Publication</button>
          </form>

          <div className={styles.itemList}>
            {publications.map((pub: any) => (
              <div key={pub._id} className={styles.item}>
                <div>
                  <h4>{pub.title}</h4>
                  <p>{pub.authors} · {pub.date} · <span className={styles.badge}>{pub.type}</span></p>
                </div>
                <button onClick={() => deletePub(pub._id)} className={styles.deleteBtn}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
