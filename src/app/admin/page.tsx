'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BookOpen, FlaskConical, LogOut, Plus, Trash2, Loader2, Users, UploadCloud, Edit2, X } from 'lucide-react';
import styles from './admin.module.css';

type Tab = 'books' | 'publications' | 'affiliations';

interface AffiliationItem {
  _id: string;
  name: string;
  img: string;
  order?: number;
}

interface BookItem {
  _id: string;
  title: string;
  publisher: string;
  publishedDate: string;
  coverImage: string;
  amazonLink?: string;
  publisherLink?: string;
  format: string;
}

interface PubItem {
  _id: string;
  title: string;
  authors: string;
  date: string;
  link: string;
  type: 'Journal' | 'Article';
  thumbnail?: string;
  description?: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('books');
  const [books, setBooks] = useState<BookItem[]>([]);
  const [publications, setPublications] = useState<PubItem[]>([]);
  const [affiliations, setAffiliations] = useState<AffiliationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Book form state
  const [bookForm, setBookForm] = useState({
    title: '', publisher: '', publishedDate: '', coverImage: '', amazonLink: '', publisherLink: '', format: 'Paperback'
  });

  // Publication form state
  const [pubForm, setPubForm] = useState({
    title: '', authors: '', date: '', link: '', type: 'Journal' as 'Journal' | 'Article', thumbnail: '', description: ''
  });

  // Affiliation form state
  const [affilForm, setAffilForm] = useState({
    name: '', img: '', order: 0
  });

  const resetForms = () => {
    setEditingId(null);
    setBookForm({ title: '', publisher: '', publishedDate: '', coverImage: '', amazonLink: '', publisherLink: '', format: 'Paperback' });
    setPubForm({ title: '', authors: '', date: '', link: '', type: 'Journal', thumbnail: '', description: '' });
    setAffilForm({ name: '', img: '', order: 0 });
  };

  const handleTabChange = (t: Tab) => {
    setActiveTab(t);
    resetForms();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setter(data.url);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const loadData = useCallback(async () => {
    const [bRes, pRes, aRes] = await Promise.all([
      fetch('/api/books'),
      fetch('/api/publications'),
      fetch('/api/affiliations'),
    ]);
    const booksData = await bRes.json();
    const pubsData = await pRes.json();
    const affilData = await aRes.json();
    return { books: booksData, pubs: pubsData, affils: affilData };
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }
    if (status === 'authenticated') {
      let cancelled = false;
      loadData().then(({ books: b, pubs: p, affils: a }: { books: BookItem[]; pubs: PubItem[]; affils: AffiliationItem[] }) => {
        if (!cancelled) {
          setBooks(b);
          setPublications(p);
          setAffiliations(a);
          setLoading(false);
        }
      });
      return () => { cancelled = true; };
    }
  }, [status, router, loadData]);

  const refreshData = async () => {
    setLoading(true);
    const data = await loadData();
    setBooks(data.books);
    setPublications(data.pubs);
    setAffiliations(data.affils);
    setLoading(false);
  };

  const saveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/books/${editingId}` : '/api/books';
    const method = editingId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bookForm) });
    resetForms();
    refreshData();
  };

  const startEditBook = (b: BookItem) => {
    setBookForm({ ...b, amazonLink: b.amazonLink || '', publisherLink: b.publisherLink || '' });
    setEditingId(b._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteBook = async (id: string) => {
    if (!confirm('Delete this book?')) return;
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    refreshData();
  };

  const savePub = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/publications/${editingId}` : '/api/publications';
    const method = editingId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pubForm) });
    resetForms();
    refreshData();
  };

  const startEditPub = (p: PubItem) => {
    setPubForm({ ...p, thumbnail: p.thumbnail || '', description: p.description || '' });
    setEditingId(p._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletePub = async (id: string) => {
    if (!confirm('Delete this publication?')) return;
    await fetch(`/api/publications/${id}`, { method: 'DELETE' });
    refreshData();
  };

  const saveAffiliation = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/affiliations/${editingId}` : '/api/affiliations';
    const method = editingId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(affilForm) });
    resetForms();
    refreshData();
  };

  const startEditAffiliation = (a: AffiliationItem) => {
    setAffilForm({ ...a, order: a.order || 0 });
    setEditingId(a._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteAffiliation = async (id: string) => {
    if (!confirm('Delete this affiliation?')) return;
    await fetch(`/api/affiliations/${id}`, { method: 'DELETE' });
    refreshData();
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
        <button className={`${styles.tab} ${activeTab === 'books' ? styles.tabActive : ''}`} onClick={() => handleTabChange('books')}>
          <BookOpen size={18} /> Books ({books.length})
        </button>
        <button className={`${styles.tab} ${activeTab === 'publications' ? styles.tabActive : ''}`} onClick={() => handleTabChange('publications')}>
          <FlaskConical size={18} /> Publications ({publications.length})
        </button>
        <button className={`${styles.tab} ${activeTab === 'affiliations' ? styles.tabActive : ''}`} onClick={() => handleTabChange('affiliations')}>
          <Users size={18} /> Affiliations ({affiliations.length})
        </button>
      </div>

      {/* Books Tab */}
      {activeTab === 'books' && (
        <div className={styles.content}>
          <form onSubmit={saveBook} className={styles.addForm}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{editingId ? <><Edit2 size={18} /> Edit Book</> : <><Plus size={18} /> Add New Book</>}</h3>
              {editingId && <button type="button" onClick={resetForms} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>}
            </div>
            <div className={styles.formGrid}>
              <input placeholder="Title *" value={bookForm.title} onChange={e => setBookForm({...bookForm, title: e.target.value})} required />
              <input placeholder="Publisher *" value={bookForm.publisher} onChange={e => setBookForm({...bookForm, publisher: e.target.value})} required />
              <input placeholder="Published Date *" value={bookForm.publishedDate} onChange={e => setBookForm({...bookForm, publishedDate: e.target.value})} required />
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: '#111', padding: '0 8px', borderRadius: '8px' }}>
                <input style={{ background: 'transparent', border: 'none', padding: 0 }} placeholder="Cover Image URL *" value={bookForm.coverImage} onChange={e => setBookForm({...bookForm, coverImage: e.target.value})} required />
                <label style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', padding: '4px 12px', background: 'var(--accent)', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}>
                  {uploading ? <Loader2 size={14} className={styles.spin} /> : <UploadCloud size={14} />} Upload
                  <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, (url) => setBookForm({...bookForm, coverImage: url}))} />
                </label>
              </div>

              <input placeholder="Amazon Link" value={bookForm.amazonLink} onChange={e => setBookForm({...bookForm, amazonLink: e.target.value})} />
              <input placeholder="Publisher Link" value={bookForm.publisherLink} onChange={e => setBookForm({...bookForm, publisherLink: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: 12 }}>{editingId ? 'Save Changes' : 'Add Book'}</button>
          </form>

          <div className={styles.itemList}>
            {books.map((book: BookItem) => (
              <div key={book._id} className={styles.item}>
                <div>
                  <h4>{book.title}</h4>
                  <p>{book.publisher} · {book.publishedDate}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => startEditBook(book)} className={styles.deleteBtn} style={{ color: 'var(--accent)' }}><Edit2 size={16} /></button>
                  <button onClick={() => deleteBook(book._id)} className={styles.deleteBtn}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications Tab */}
      {activeTab === 'publications' && (
        <div className={styles.content}>
          <form onSubmit={savePub} className={styles.addForm}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{editingId ? <><Edit2 size={18} /> Edit Publication</> : <><Plus size={18} /> Add New Publication</>}</h3>
              {editingId && <button type="button" onClick={resetForms} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>}
            </div>
            <div className={styles.formGrid}>
              <input placeholder="Title *" value={pubForm.title} onChange={e => setPubForm({...pubForm, title: e.target.value})} required />
              <input placeholder="Authors *" value={pubForm.authors} onChange={e => setPubForm({...pubForm, authors: e.target.value})} required />
              <input placeholder="Date *" value={pubForm.date} onChange={e => setPubForm({...pubForm, date: e.target.value})} required />
              <input placeholder="Link *" value={pubForm.link} onChange={e => setPubForm({...pubForm, link: e.target.value})} required />
              <select value={pubForm.type} onChange={e => setPubForm({...pubForm, type: e.target.value as 'Journal' | 'Article'})}>
                <option value="Journal">Journal</option>
                <option value="Article">Article</option>
              </select>

              {pubForm.type === 'Article' ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: '#111', padding: '0 8px', borderRadius: '8px' }}>
                  <input style={{ background: 'transparent', border: 'none', padding: 0 }} placeholder="Thumbnail URL" value={pubForm.thumbnail} onChange={e => setPubForm({...pubForm, thumbnail: e.target.value})} />
                  <label style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', padding: '4px 12px', background: 'var(--accent)', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}>
                    {uploading ? <Loader2 size={14} className={styles.spin} /> : <UploadCloud size={14} />} Upload
                    <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, (url) => setPubForm({...pubForm, thumbnail: url}))} />
                  </label>
                </div>
              ) : (
                <input placeholder="Thumbnail URL (N/A for Journals)" value={pubForm.thumbnail} disabled style={{ opacity: 0.5 }} />
              )}
              
              <input placeholder="Description (for Articles)" value={pubForm.description} onChange={e => setPubForm({...pubForm, description: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: 12 }}>{editingId ? 'Save Changes' : 'Add Publication'}</button>
          </form>

          <div className={styles.itemList}>
            {publications.map((pub: PubItem) => (
              <div key={pub._id} className={styles.item}>
                <div>
                  <h4>{pub.title}</h4>
                  <p>{pub.authors} · {pub.date} · <span className={styles.badge}>{pub.type}</span></p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => startEditPub(pub)} className={styles.deleteBtn} style={{ color: 'var(--accent)' }}><Edit2 size={16} /></button>
                  <button onClick={() => deletePub(pub._id)} className={styles.deleteBtn}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Affiliations Tab */}
      {activeTab === 'affiliations' && (
        <div className={styles.content}>
          <form onSubmit={saveAffiliation} className={styles.addForm}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{editingId ? <><Edit2 size={18} /> Edit Affiliation</> : <><Plus size={18} /> Add New Affiliation</>}</h3>
              {editingId && <button type="button" onClick={resetForms} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>}
            </div>
            <div className={styles.formGrid}>
              <input placeholder="Name *" value={affilForm.name} onChange={e => setAffilForm({...affilForm, name: e.target.value})} required />
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: '#111', padding: '0 8px', borderRadius: '8px' }}>
                <input style={{ background: 'transparent', border: 'none', padding: 0 }} placeholder="Image URL *" value={affilForm.img} onChange={e => setAffilForm({...affilForm, img: e.target.value})} required />
                <label style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', padding: '4px 12px', background: 'var(--accent)', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}>
                  {uploading ? <Loader2 size={14} className={styles.spin} /> : <UploadCloud size={14} />} Upload
                  <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, (url) => setAffilForm({...affilForm, img: url}))} />
                </label>
              </div>

              <input type="number" placeholder="Sort Order" value={affilForm.order} onChange={e => setAffilForm({...affilForm, order: parseInt(e.target.value) || 0})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: 12 }}>{editingId ? 'Save Changes' : 'Add Affiliation'}</button>
          </form>

          <div className={styles.itemList}>
            {affiliations.map((affil: AffiliationItem) => (
              <div key={affil._id} className={styles.item}>
                <div>
                  <h4>{affil.name}</h4>
                  <p>Order: {affil.order}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => startEditAffiliation(affil)} className={styles.deleteBtn} style={{ color: 'var(--accent)' }}><Edit2 size={16} /></button>
                  <button onClick={() => deleteAffiliation(affil._id)} className={styles.deleteBtn}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
