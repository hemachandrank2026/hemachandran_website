import Link from 'next/link';
import Image from 'next/image';
import styles from './about.module.css';

const roles = [
  'ATL Mentor of Change under the Atal Innovation Mission',
  'Advisory Board Member for international companies, including AptAI Labs (USA) and Agzitence Pvt. Ltd.',
  'UNESCO Expert and DeepLearning.AI Ambassador',
  'Tech Expert for the European Commission',
  "Expert for DG CNECT's EU critical digital technologies studies",
  'EIC Accelerator Evaluator',
];

const patents = [
  'Nano-based Necrobotics Deployment',
  'UHIS: Unified Healthcare Intelligence System',
  'UAIS: Unified Agricultural Intelligence System',
  'The Behavioral GPS',
  'Predictive Modeling in Football Talent Identification and Performance Optimization',
  'Quantum AI-Driven Smart Airport Management System',
  'Quantum-AI Powered Electoral Forecasting and Governmental Stability Risk Assessment System',
  'AI-Powered Predictive Infrastructure Management System for Large-Scale Operations',
  'Quantum AI-Based Historical Reconstruction System',
  'AI-Driven Neuroadaptive Smart City System Using Real-Time Cognitive and Behavioral Feedback',
  'AI-Driven Neuro-Adaptive Interface for Real-Time Cognitive Load Balancing in Digital Environments',
  'AI-Powered Hyper-Personalized Learning Track System for Student Classification and Adaptive Education',
  'AI-Driven Bio-Induced Necrobotic System for Minimally Invasive Surgical Interventions',
  'AI-Powered Bias Detection and Cognitive Debiasing System for Human and Algorithmic Decision-Making',
  'AI-Driven Multi-Modal Cognitive-Affective Consumer Decision Influence System for Ethical & Adaptive Retail Experiences',
];

import dbConnect from '@/lib/mongodb';
import Affiliation from '@/models/Affiliation';

async function getAffiliations() {
  try {
    await dbConnect();
    const affiliations = await Affiliation.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(affiliations));
  } catch {
    return [];
  }
}

export default async function AboutPage() {
  const affiliations = await getAffiliations();
  return (
    <>
      <div className="page-banner">
        <h1>About <span className="accent-text">Me</span></h1>
        <p className="breadcrumb"><Link href="/">Home</Link> / About</p>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.imageCard}>
              <Image src="https://res.cloudinary.com/dbeuhgjct/image/upload/v1774345757/portfolio/rmyalnv7z8pu407jrn3k.webp" alt="Dr. Hemachandran K" width={400} height={600} className={styles.profileImage} />
            </div>
            <div className={styles.bioSection}>
              <h2 className={styles.name}>Dr. HEMACHANDRAN K</h2>
              <p className={styles.bio}>
                Dr. Hemachandran Kannan is the Director of the AI Research Centre, Associate Dean of the School of Business, and Area Chair of the Analytics Department at Woxsen University. He serves as an ambassador for the AI Accelerator Institute and is a member of the advisory board for several international and national companies, including AptAI Labs (USA) and Agzitence Pvt. Ltd. He has been an effective resource person at various national and international scientific conferences and has delivered lectures on topics related to Artificial Intelligence. Currently, he serves as an expert at UNESCO and as an ATL Mentor of Change. His expertise encompasses Natural Language Processing, Computer Vision, Video Recommendation Systems, and Autonomous Robotics.
              </p>

              <h3 className={styles.subHeading}>Key Roles &amp; Achievements</h3>
              <ul className={styles.list}>
                {roles.map((r, i) => <li key={i}>{r}</li>)}
              </ul>

              <h3 className={styles.subHeading}>Principal Investigator &amp; Creator of (Patented)</h3>
              <ul className={styles.list}>
                {patents.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className={`section ${styles.affiliations}`}>
        <div className="container" style={{ overflow: 'hidden' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
            Members &amp; <span className="accent-text">Affiliations</span>
          </h2>
          <div className={styles.logoWrapper}>
            <div className={styles.logoRow}>
              {[...affiliations, ...affiliations].map((a: { _id: string, name: string, img: string }, i: number) => (
                <div key={`${a._id || i}-${i}`} className={styles.logoItem}>
                  <Image src={a.img} alt={a.name} width={200} height={100} style={{ objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
