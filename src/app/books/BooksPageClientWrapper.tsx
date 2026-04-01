'use client';
import { useState } from 'react';
import { ExternalLink, BookOpen, Quote, FileText, Presentation } from 'lucide-react';
import styles from './books.module.css';

interface BooksWrapperProps {
  counts: any;
  startHereData: any[];
  books: any[];
  journals: any[];
  conferences: any[];
  cases: any[];
}

export default function BooksPageClientWrapper({
  counts,
  startHereData,
  books,
  journals,
  conferences,
  cases
}: BooksWrapperProps) {
  const [activeTab, setActiveTab] = useState('books');

  const tabs = [
    { id: 'books', label: 'Books', icon: <BookOpen size={16} />, data: books },
    { id: 'journals', label: 'Journal Articles', icon: <FileText size={16} />, data: journals },
    { id: 'conferences', label: 'Conference Papers', icon: <Presentation size={16} />, data: conferences },
    { id: 'cases', label: 'Cases & Reports', icon: <Quote size={16} />, data: cases },
  ];

  const currentData = tabs.find((t) => t.id === activeTab)?.data || [];

  return (
    <div style={{ paddingTop: '80px' }}>
      <header style={{ padding: '20px 0 40px', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(249, 180, 1, 0.05) 0%, transparent 60%)' }}>
        <div className="container max-w-4xl">
          <h1 className="hero-title">Books &amp; <span className="accent-text">Publications</span></h1>
          <p className="hero-desc">
            {counts?.books || '50'}+ books, {counts?.articles || '100'}+ articles and cases on AI, analytics, and digital transformation for leaders, educators and policymakers.
          </p>
        </div>
      </header>

      <section className="section bg-secondary" style={{ paddingTop: '10px' }}>
        <div className="container">
          <h2 className="section-title text-center mb-12">Start <span className="accent-text">Here</span></h2>
          <div className="grid-2">
             {startHereData.map((item, i) => (
                <div key={i} className="card bg-dark flex flex-col justify-between">
                  <div>
                    <h3 className="mb-2 text-xl">{item.title}</h3>
                    <p className="text-sm text-muted mb-4">{item.desc}</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">{item.type}</span>
                </div>
             ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.tabsContainer}>
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`${styles.tabBtn} ${activeTab === t.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon} {t.label} 
              </button>
            ))}
          </div>

          <div className="grid-2 mt-8">
            {currentData.slice(0, 15).map((item: any, idx) => {
              const hrefLink = item.link || item.amazonLink;
              
              const CardContent = (
                <>
                  <h4 className="text-lg mb-2">{item.title}</h4>
                  {item.authors && <p className="text-sm text-muted mb-2">{item.authors}</p>}
                  {item.publisher && <p className="text-sm text-muted mb-2">{item.publisher} - {item.publishedDate}</p>}
                  {item.date && <p className="text-sm text-muted mb-2">{item.date}</p>}
                  
                  {hrefLink && (
                    <span className="text-accent text-sm font-bold flex gap-1 align-center mt-4 inline-flex">
                      View Publication <ExternalLink size={14} />
                    </span>
                  )}
                </>
              );

              if (hrefLink) {
                return (
                  <a key={idx} href={hrefLink} target="_blank" rel="noreferrer" className="card bg-dark block" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
                    {CardContent}
                  </a>
                );
              }

              return (
                <div key={idx} className="card bg-dark">
                  {CardContent}
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
             <a href="https://scholar.google.co.in/citations?user=xGa-DEcAAAAJ&hl=en" target="_blank" rel="noreferrer" className="btn btn-outline inline-flex align-center gap-2">
                View Full List on Google Scholar <ExternalLink size={18} />
             </a>
          </div>
        </div>
      </section>
    </div>
  );
}
