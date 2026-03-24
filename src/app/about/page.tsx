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

const affiliations = [
  { name: 'T-Hub', img: '/images/hub.png' },
  { name: 'AI 2030', img: '/images/2030.png' },
  { name: 'DeepLearning.AI', img: '/images/deep.png' },
  { name: 'Woxsen University', img: '/images/wox.png' },
  { name: 'AASHE', img: '/images/aashe.png' },
  { name: 'Atal Innovation Mission', img: '/images/aim.png' },
  { name: 'Agzistence', img: '/images/agz.png' },
  { name: 'AI Accelerator Institute', img: '/images/aiai.png' },
  { name: 'University of Pécs', img: '/images/university.png' },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-banner">
        <h1>About <span className="accent-text">Me</span></h1>
        <p className="breadcrumb"><a href="/">Home</a> / About</p>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.bioSection}>
              <h2 className={styles.name}>HEMACHANDRAN K</h2>
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
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
            Members &amp; <span className="accent-text">Affiliations</span>
          </h2>
          <div className={styles.logoRow}>
            {affiliations.map((a, i) => (
              <div key={i} className={styles.logoItem}>
                <img src={a.img} alt={a.name} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
