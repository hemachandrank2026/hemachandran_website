import Link from 'next/link';
import { ArrowRight, Mic, Briefcase, Code, Presentation, ShieldCheck, Award, Zap, Building, Users, BookOpen } from 'lucide-react';
import styles from './page.module.css';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { getDynamicCounts } from '@/lib/getDynamicCounts';

export default async function Home() {
  await dbConnect();
  const settings = await Settings.findOne() || {
    homeImage: 'https://res.cloudinary.com/dbeuhgjct/image/upload/v1774345756/portfolio/ohrc69ohfkspk9s472da.webp'
  };
  const counts = await getDynamicCounts();
  const { patents, books, articles, keynotes, partnerships, fellows } = counts;
  const heroImage = settings.homeImage || 'https://res.cloudinary.com/dbeuhgjct/image/upload/v1774345756/portfolio/ohrc69ohfkspk9s472da.webp';

  return (
    <>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Global AI Leader in Ethical, Quantum‑Ready Systems for Governments, Universities and Enterprises.
            </h1>
            <p className={styles.heroDesc}>
              Director of AI Research Centre, Vice Dean, UNESCO Expert, European Commission Tech Expert, AI 2030 Global Fellow.
            </p>
            <div className={styles.heroCtaGrid}>
              <Link href="/speaking-workshops" className="btn btn-primary">
                Invite Me as a Speaker
              </Link>
              <Link href="/leadership-advisory" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }}>
                Explore Advisory &amp; Board Roles
              </Link>
              <Link href="/ai-consulting" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }}>
                Discuss AI Consulting / Projects
              </Link>
              <Link href="/speaking-workshops" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }}>
                Design an Executive AI Workshop
              </Link>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <img src={heroImage} alt="Dr. Hemachandran K" />
          </div>
        </div>
      </section>

      {/* 2. Credibility strip */}
      <section className={styles.credibilityStrip}>
        <div className="container">
          <p>
            <ShieldCheck size={20} className={styles.inlineIcon} />
            Trusted by UNESCO &middot; European Commission &middot; AI 2030 &middot; DeepLearning.AI &middot; T‑Hub &middot; AASHE &middot; global universities and AI summits.
          </p>
        </div>
      </section>

      {/* 3. By the numbers strip */}
      <section className={styles.statsStrip}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <Award className={styles.statIcon} />
            <h3>{patents}+</h3>
            <p>Patents</p>
          </div>
          <div className={styles.statItem}>
            <BookOpen className={styles.statIcon} />
            <h3>{books}+</h3>
            <p>Books</p>
          </div>
          <div className={styles.statItem}>
            <Code className={styles.statIcon} />
            <h3>{articles}+</h3>
            <p>Articles &amp; Cases</p>
          </div>
          <div className={styles.statItem}>
            <Mic className={styles.statIcon} />
            <h3>{keynotes}+</h3>
            <p>Global Keynotes</p>
          </div>
          <div className={styles.statItem}>
            <Building className={styles.statIcon} />
            <h3>{partnerships}+</h3>
            <p>Global Partnerships</p>
          </div>
          <div className={styles.statItem}>
            <Users className={styles.statIcon} />
            <h3>{fellows}+</h3>
            <p>Global Executive Fellows</p>
          </div>
        </div>
      </section>

      {/* 4. How you can work with me */}
      <section className="section bg-secondary">
        <div className="container">
          <h2 className="section-title text-center" style={{ marginBottom: 40 }}>How You Can <span className="accent-text">Work With Me</span></h2>
          <div className={styles.workCards}>
            <Link href="/speaking-workshops" className={styles.workCard}>
              <Mic size={36} className={styles.cardIcon} />
              <h3>Guest Speaker</h3>
              <p>Keynotes and panels on quantum AI, ethical AI governance, necrobotics, smart airports and neuroadaptive cities.</p>
              <span className={styles.cardLink}>Learn More <ArrowRight size={16} /></span>
            </Link>
            <Link href="/leadership-advisory" className={styles.workCard}>
              <Briefcase size={36} className={styles.cardIcon} />
              <h3>Advisory &amp; Board Roles</h3>
              <p>Strategic AI and governance advisor for companies, cities and universities.</p>
              <span className={styles.cardLink}>Learn More <ArrowRight size={16} /></span>
            </Link>
            <Link href="/ai-consulting" className={styles.workCard}>
              <Zap size={36} className={styles.cardIcon} />
              <h3>AI Consulting</h3>
              <p>AI roadmaps, governance frameworks and pilots for aviation, smart cities, education and finance.</p>
              <span className={styles.cardLink}>Learn More <ArrowRight size={16} /></span>
            </Link>
            <Link href="/speaking-workshops" className={styles.workCard}>
              <Presentation size={36} className={styles.cardIcon} />
              <h3>Executive &amp; Corporate Workshops</h3>
              <p>AI leadership programs for C‑suite, boards and senior executives.</p>
              <span className={styles.cardLink}>Learn More <ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why global leaders work with me */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center" style={{ marginBottom: 40 }}>Why Global Leaders <span className="accent-text">Work With Me</span></h2>
          <div className="grid-3">
            <div className={styles.featureCol}>
              <div className={styles.featureIcon}><Zap size={28} /></div>
              <h3>AI Innovation</h3>
              <p>Holder of 50+ patents and innovator behind disruptive systems in necrobotics, automated bias detection, and quantum-ready infrastructure.</p>
            </div>
            <div className={styles.featureCol}>
              <div className={styles.featureIcon}><ShieldCheck size={28} /></div>
              <h3>Global Policy &amp; Governance</h3>
              <p>Direct impact on worldwide AI policy through advisory roles with UNESCO, the European Commission, and the AI 2030 Global initiative.</p>
            </div>
            <div className={styles.featureCol}>
              <div className={styles.featureIcon}><Users size={28} /></div>
              <h3>Education &amp; Leadership</h3>
              <p>Serving as Vice Dean and cultivating the next generation of leadership through 120+ executive fellowships and strategic academic partnerships.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
