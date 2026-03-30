import Link from 'next/link';
import { Shield, BookOpen, Handshake, Network, Award } from 'lucide-react';
import styles from './page.module.css';
import { getDynamicCounts } from '@/lib/getDynamicCounts';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const counts = await getDynamicCounts();
  return {
    title: 'Leadership & Advisory | Dr. Hemachandran K',
    description: `Board-level AI and governance strategist with ${counts.patents}+ patents and pivotal policy roles.`,
  };
}

export default async function LeadershipAdvisoryPage() {
  const counts = await getDynamicCounts();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container max-w-4xl text-center">
          <h1 className="hero-title">Leadership &amp; <span className="accent-text">Advisory</span></h1>
          <p className="hero-desc">
            Board-level AI &amp; governance strategist translating {counts.patents}+ patents and sweeping global policy roles into competitive advantages for top-tier institutions.
          </p>
        </div>
      </header>

      <section className="section bg-secondary">
        <div className="container">
          <h2 className="section-title text-center mb-12">Current <span className="accent-text">Advisory Roles</span></h2>
          <div className="grid-2">
            
            <div className={styles.roleCard}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl">AI 2030 (USA)</h3>
                <span className={styles.badge}>Global Fellow</span>
              </div>
              <p className="text-muted text-sm border-t border-gray pt-4">
                Crafting frameworks for sustainable, responsible AI development targeting compliance with global treaties and regulations ahead of 2030 targets.
              </p>
            </div>

            <div className={styles.roleCard}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl">AptAI Labs</h3>
                <span className={styles.badge}>Adviser</span>
              </div>
              <p className="text-muted text-sm border-t border-gray pt-4">
                Directing the AI pipeline and technical architecture roadmap, ensuring ethical ML lifecycle management from data ingression to deployment.
              </p>
            </div>

            <div className={styles.roleCard}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl">City of Johannesburg</h3>
                <span className={styles.badge}>Smart City Advisor</span>
              </div>
              <p className="text-muted text-sm border-t border-gray pt-4">
                Guiding municipal integration of IoT and neuroadaptive predictive infrastructure to optimize energy distribution and public transport security.
              </p>
            </div>

            <div className={styles.roleCard}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl">AASHE</h3>
                <span className={styles.badge}>Advisory Council</span>
              </div>
              <p className="text-muted text-sm border-t border-gray pt-4">
                Advancing the Sustainability in Higher Education agenda by integrating green-computing and carbon-aware AI metrics across {counts.partnerships || 100}+ member universities.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title text-center mb-12">Value <span className="accent-text">Pillars</span></h2>
          <div className="grid-2 gap-8">
            <div className="flex gap-6 items-start bg-dark p-6 rounded border border-gray hover-border-accent transition">
              <Shield size={40} className="text-accent flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold mb-2">AI Strategy &amp; Governance</h4>
                <p className="text-sm text-muted">Establishing corporate risk tolerance, algorithmic auditing protocols, and aligning enterprise AI with the EU AI Act.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start bg-dark p-6 rounded border border-gray hover-border-accent transition">
              <BookOpen size={40} className="text-accent flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold mb-2">Regulatory &amp; Accreditation</h4>
                <p className="text-sm text-muted">Aiding universities and training bodies in obtaining prestigious tech-accreditations (e.g., AACSB tech alignments).</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start bg-dark p-6 rounded border border-gray hover-border-accent transition">
              <Handshake size={40} className="text-accent flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold mb-2">Industry-Academia Partnerships</h4>
                <p className="text-sm text-muted">Securing joint funding models, building corporate labs on campuses, and converting research IP into commercial ventures.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start bg-dark p-6 rounded border border-gray hover-border-accent transition">
              <Network size={40} className="text-accent flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold mb-2">Program &amp; Curriculum Innovation</h4>
                <p className="text-sm text-muted">Overhauling legacy analytics programs with LLM, quantum computing concepts, and executive readiness training.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-secondary text-center">
        <div className="container">
          <h2 className="section-title mb-8">Ideal <span className="accent-text">Engagements</span></h2>
          <p className="text-muted mb-12 max-w-3xl mx-auto">Open to strategic, high-impact roles that shape the future trajectory of ambitious organizations.</p>
          
          <div className="grid-3 text-left">
            <div className={styles.engagementCard}>
              <Award size={32} className="text-accent mb-4" />
              <h4 className="mb-2">Advisory Boards</h4>
              <p className="text-sm text-muted">Steering committees for AI scale-ups and corporate transformation task-forces.</p>
            </div>
            <div className={styles.engagementCard}>
              <Award size={32} className="text-accent mb-4" />
              <h4 className="mb-2">Evaluation Panels</h4>
              <p className="text-sm text-muted">Technical auditing and due diligence for VCs and government grant consortiums.</p>
            </div>
            <div className={styles.engagementCard}>
              <Award size={32} className="text-accent mb-4" />
              <h4 className="mb-2">Special Envoys</h4>
              <p className="text-sm text-muted">Cross-border technology representation for international trade and university consortia.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container max-w-3xl mx-auto bg-dark p-12 rounded border border-gray">
          <h2 className="mb-6">Explore an Advisory Partnership</h2>
          <p className="text-muted mb-8 text-lg">Send a brief on your organization&apos;s trajectory and current board composition to initiate a confidential dialogue.</p>
          <Link href="/contact?interest=advisory" className="btn btn-primary btn-lg">
            Request Advisory Conversation
          </Link>
        </div>
      </section>

    </div>
  );
}
