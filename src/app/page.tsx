import Link from 'next/link';
import { ArrowRight, BookOpen, FlaskConical, Mic, Linkedin } from 'lucide-react';
import styles from './page.module.css';

const focusAreas = [
  { icon: '🤖', title: 'Artificial Intelligence & ML', desc: 'Deep expertise in AI systems, machine learning algorithms, and their real-world applications.' },
  { icon: '🧠', title: 'Natural Language Processing', desc: 'Building intelligent systems that understand and process human language.' },
  { icon: '👁️', title: 'Computer Vision', desc: 'Developing visual perception systems for healthcare, security, and robotics.' },
  { icon: '📊', title: 'Business Analytics', desc: 'Data-driven decision making for enterprises through advanced analytical frameworks.' },
  { icon: '🤖', title: 'Autonomous Robotics', desc: 'Pioneering research in necrobotics and AI-driven autonomous systems.' },
  { icon: '🏫', title: 'Industry-Academia', desc: 'Bridging the gap between academic research and real-world industry applications.' },
];

const socialLinks = [
  { href: 'https://airc.woxsen.edu.in/', label: 'AI Research Centre' },
  { href: 'https://www.linkedin.com/in/drhemachandrank/', label: 'LinkedIn' },
  { href: 'https://scholar.google.co.in/citations?user=xGa-DEcAAAAJ&hl=en', label: 'Google Scholar' },
  { href: 'https://www.researchgate.net/profile/Kannan-Hemachandran', label: 'ResearchGate' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroTag}>Director of AI Research Centre</p>
          <h1 className={styles.heroTitle}>
            Dr. Hemachandran <span className={styles.accent}>K</span>
          </h1>
          <p className={styles.heroDesc}>
            Associate Dean of Business School &amp; Area Chair of Analytics at <strong>Woxsen University</strong>.
            Ambassador for AI Accelerator Institute. UNESCO Expert &amp; ATL Mentor of Change.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/about" className="btn btn-primary">
              About Me <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Get in Touch
            </Link>
          </div>
          <div className={styles.socialRow}>
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="section">
        <div className="container">
          <p className={styles.sectionTag}>What I Do</p>
          <h2 className="section-title">Focus <span className="accent-text">Areas</span></h2>
          <p className="section-subtitle" style={{ marginBottom: 40 }}>
            Exploring the intersection of technology and business through research, innovation, and education.
          </p>
          <div className="grid-3">
            {focusAreas.map((area, i) => (
              <div key={i} className="card">
                <span className={styles.cardIcon}>{area.icon}</span>
                <h3 className={styles.cardTitle}>{area.title}</h3>
                <p className={styles.cardDesc}>{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className={`section ${styles.quickLinks}`}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
            Explore <span className="accent-text">More</span>
          </h2>
          <div className="grid-3">
            <Link href="/books" className={styles.quickCard}>
              <BookOpen size={32} className={styles.quickIcon} />
              <h3>Books &amp; Publications</h3>
              <p>Browse an extensive collection of authored and edited books published by Springer, Routledge, and more.</p>
            </Link>
            <Link href="/research" className={styles.quickCard}>
              <FlaskConical size={32} className={styles.quickIcon} />
              <h3>Research Gallery</h3>
              <p>Explore journals, conference papers, and articles spanning AI, healthcare, and business analytics.</p>
            </Link>
            <Link href="/contributions" className={styles.quickCard}>
              <Mic size={32} className={styles.quickIcon} />
              <h3>Speaking &amp; Contributions</h3>
              <p>View international speaking engagements, keynotes, and panel sessions across the globe.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
