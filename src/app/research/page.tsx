import styles from './research.module.css';
import dbConnect from '@/lib/mongodb';
import Publication from '@/models/Publication';

async function getPublications() {
  try {
    await dbConnect();
    const pubs = await Publication.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(pubs));
  } catch {
    return [];
  }
}

export default async function ResearchPage() {
  const publications = await getPublications();
  const journals = publications.filter((p: any) => p.type === 'Journal');
  const articles = publications.filter((p: any) => p.type === 'Article');

  return (
    <>
      <div className="page-banner">
        <h1>Research <span className="accent-text">Gallery</span></h1>
        <p className="breadcrumb"><a href="/">Home</a> / Research</p>
      </div>

      <section className="section">
        <div className="container">
          {publications.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: 40 }}>
              No publications found. Add publications via the Admin Dashboard.
            </p>
          ) : (
            <>
              {/* Journals */}
              {journals.length > 0 && (
                <>
                  <h2 className={styles.categoryTitle}>Journals</h2>
                  <div className={styles.pubList}>
                    {journals.map((pub: any) => (
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
                </>
              )}

              {/* Articles */}
              {articles.length > 0 && (
                <>
                  <h2 className={styles.categoryTitle} style={{ marginTop: 60 }}>Articles</h2>
                  <div className="grid-3">
                    {articles.map((pub: any) => (
                      <a key={pub._id} href={pub.link} target="_blank" rel="noopener noreferrer" className={styles.articleCard}>
                        {pub.thumbnail && <img src={pub.thumbnail} alt={pub.title} className={styles.articleImg} />}
                        <div className={styles.articleBody}>
                          <h3>{pub.title}</h3>
                          {pub.description && <p>{pub.description}</p>}
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
