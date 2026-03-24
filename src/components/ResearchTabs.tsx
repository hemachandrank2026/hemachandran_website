'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/research/research.module.css';
import Pagination from './Pagination';

import { IPublication } from '@/models/Publication';
import { IPatent } from '@/models/Patent';

export default function ResearchTabs({ publications, patents }: { publications: (IPublication & { _id: string })[], patents: (IPatent & { _id: string })[] }) {
  const [activeTab, setActiveTab] = useState<'Journals' | 'Articles' | 'Patents'>('Journals');
  
  const [journalPage, setJournalPage] = useState(1);
  const [articlePage, setArticlePage] = useState(1);
  const [patentPage, setPatentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  const journals = publications.filter(p => p.type === 'Journal');
  const articles = publications.filter(p => p.type === 'Article');

  const paginatedJournals = journals.slice((journalPage - 1) * ITEMS_PER_PAGE, journalPage * ITEMS_PER_PAGE);
  const paginatedArticles = articles.slice((articlePage - 1) * ITEMS_PER_PAGE, articlePage * ITEMS_PER_PAGE);
  const paginatedPatents = patents.slice((patentPage - 1) * ITEMS_PER_PAGE, patentPage * ITEMS_PER_PAGE);

  const totalJournalPages = Math.ceil(journals.length / ITEMS_PER_PAGE);
  const totalArticlePages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const totalPatentPages = Math.ceil(patents.length / ITEMS_PER_PAGE);

  return (
    <div>
      {/* Tabs Header */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('Journals')}
          className="btn"
          style={{ background: activeTab === 'Journals' ? 'var(--accent)' : 'var(--card-bg)', color: activeTab === 'Journals' ? '#000' : '#fff' }}
        >
          Journals ({journals.length})
        </button>
        <button 
          onClick={() => setActiveTab('Articles')}
          className="btn"
          style={{ background: activeTab === 'Articles' ? 'var(--accent)' : 'var(--card-bg)', color: activeTab === 'Articles' ? '#000' : '#fff' }}
        >
          Articles ({articles.length})
        </button>
        <button 
          onClick={() => setActiveTab('Patents')}
          className="btn"
          style={{ background: activeTab === 'Patents' ? 'var(--accent)' : 'var(--card-bg)', color: activeTab === 'Patents' ? '#000' : '#fff' }}
        >
          Patents ({patents.length})
        </button>
      </div>

      {/* Journals Content */}
      {activeTab === 'Journals' && (
        <div>
          {paginatedJournals.length === 0 ? <p style={{textAlign: 'center', color: 'gray'}}>No journals found.</p> : (
            <div className={styles.pubList}>
              {paginatedJournals.map((pub) => (
                <div key={pub._id} className={styles.pubItem}>
                  <div className={styles.pubDot} />
                  <div>
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className={styles.pubTitle}>
                      {pub.title}
                    </a>
                    <p className={styles.pubAuthors}>{pub.authors}</p>
                    <p className={styles.pubDate}>{pub.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Pagination currentPage={journalPage} totalPages={totalJournalPages} onPageChange={setJournalPage} />
        </div>
      )}

      {/* Articles Content */}
      {activeTab === 'Articles' && (
        <div>
          {paginatedArticles.length === 0 ? <p style={{textAlign: 'center', color: 'gray'}}>No articles found.</p> : (
            <div className="grid-3">
              {paginatedArticles.map((pub) => (
                <a key={pub._id} href={pub.link} target="_blank" rel="noopener noreferrer" className={styles.articleCard}>
                  {pub.thumbnail && <Image unoptimized src={pub.thumbnail} alt={pub.title} className={styles.articleImg} width={400} height={180} style={{ objectFit: 'cover' }} />}
                  <div className={styles.articleBody}>
                    <h3>{pub.title}</h3>
                    {pub.description && <p>{pub.description}</p>}
                    <p className={styles.pubDate} style={{marginTop: 'auto', paddingTop: 10}}>{pub.date}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
          <Pagination currentPage={articlePage} totalPages={totalArticlePages} onPageChange={setArticlePage} />
        </div>
      )}

      {/* Patents Content */}
      {activeTab === 'Patents' && (
        <div>
           {paginatedPatents.length === 0 ? <p style={{textAlign: 'center', color: 'gray'}}>No patents found.</p> : (
            <div className={styles.pubList}>
              {paginatedPatents.map((pat) => (
                <div key={pat._id} className={styles.pubItem}>
                  <div className={styles.pubDot} />
                  <div>
                    {pat.link ? (
                      <a href={pat.link} target="_blank" rel="noopener noreferrer" className={styles.pubTitle}>
                        {pat.title}
                      </a>
                    ) : (
                      <span className={styles.pubTitle}>{pat.title}</span>
                    )}
                    {pat.date && <p className={styles.pubDate}>{pat.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Pagination currentPage={patentPage} totalPages={totalPatentPages} onPageChange={setPatentPage} />
        </div>
      )}
    </div>
  );
}
