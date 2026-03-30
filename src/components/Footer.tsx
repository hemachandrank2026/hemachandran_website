import styles from './Footer.module.css';
import { getDynamicCounts } from '@/lib/getDynamicCounts';

export default async function Footer() {
  const counts = await getDynamicCounts();
  const { patents, books, articles } = counts;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p style={{ maxWidth: '800px', margin: '0 auto 1rem auto', lineHeight: '1.6', color: '#aaa', fontSize: '0.9rem' }}>
          Global AI leader with {patents}+ patents, {books}+ books and {articles}+ articles and case studies, helping governments, universities and enterprises design ethical, quantum‑ready AI systems.
        </p>
        <p>&copy; {new Date().getFullYear()} Dr. Hemachandran K. All rights reserved.</p>
      </div>
    </footer>
  );
}
