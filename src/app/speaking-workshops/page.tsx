import Link from 'next/link';
import { Mic, Calendar, Download, CheckCircle, Quote } from 'lucide-react';
import styles from './page.module.css';
import { getDynamicCounts } from '@/lib/getDynamicCounts';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const counts = await getDynamicCounts();
  return {
    title: 'Speaking & Workshops | Dr. Hemachandran K',
    description: `Global keynote speaker and executive workshop facilitator on AI, quantum computing, and ethical governance. Holder of ${counts.patents}+ patents.`,
  };
}

export default async function SpeakingWorkshopsPage() {
  const counts = await getDynamicCounts();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="hero-title">Speaking &amp; <span className="accent-text">Workshops</span></h1>
          <p className="hero-desc">
            Translating {counts.patents}+ patents, {counts.articles}+ publications, and high-level EU/UNESCO advisory experience into actionable, transformative insights for global audiences.
          </p>
        </div>
      </header>

      <section className="section bg-secondary">
        <div className="container">
          <h2 className="section-title text-center">Signature <span className="accent-text">Keynotes</span></h2>
          <div className="grid-2">
            
            <div className="card">
              <Mic size={28} className="text-accent mb-4" />
              <h3>Quantum AI &amp; The Next Frontier of Infrastructure</h3>
              <p className="text-muted text-sm mb-4"><strong>Audience:</strong> CIOs, Smart City Planners, Transport Authorities</p>
              <ul className="list-unstyled">
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Demystify quantum-ready AI systems.</li>
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Roadmap for smart airports and neuroadaptive cities.</li>
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> ROI and scalability in autonomous infrastructure.</li>
              </ul>
            </div>

            <div className="card">
              <Mic size={28} className="text-accent mb-4" />
              <h3>Ethical AI Governance in the Enterprise</h3>
              <p className="text-muted text-sm mb-4"><strong>Audience:</strong> Board Members, Legal Teams, Enterprise Leaders</p>
              <ul className="list-unstyled">
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Navigating global regulations (EU AI Act, UNESCO guidelines).</li>
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Implementing automated bias detection pipelines.</li>
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Balancing rapid innovation with compliance and trust.</li>
              </ul>
            </div>

            <div className="card">
              <Mic size={28} className="text-accent mb-4" />
              <h3>Necrobotics &amp; The Future of Autonomous Systems</h3>
              <p className="text-muted text-sm mb-4"><strong>Audience:</strong> Tech Innovators, Academic Researchers, R&amp;D Heads</p>
              <ul className="list-unstyled">
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Exploring the bleeding-edge of bio-inspired robotics.</li>
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Ethical frameworks for advanced autonomous manipulation.</li>
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Cross-industry applications from healthcare to logistics.</li>
              </ul>
            </div>

            <div className="card">
              <Mic size={28} className="text-accent mb-4" />
              <h3>AI Leadership: Transforming Education &amp; Business</h3>
              <p className="text-muted text-sm mb-4"><strong>Audience:</strong> Deans, University Chancellors, HR Leaders</p>
              <ul className="list-unstyled">
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Integrating AI into academic curricula and corporate training.</li>
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> Preparing the workforce for human-AI collaboration.</li>
                <li><CheckCircle size={16} className="text-accent inline mr-2" /> 360&deg; VR and simulated environments for skill acquisition.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">Executive <span className="accent-text">Workshops</span></h2>
          <div className={styles.workshopList}>
            <div className={styles.workshopCard}>
              <div className={styles.workshopHeader}>
                <h3>AI Strategy for the C-Suite</h3>
                <span className={styles.badge}><Calendar size={14} className="inline mr-1"/> 1-Day Intensive</span>
              </div>
              <p className="mb-4">Designed for CEOs, COOs, and top executives to move beyond the hype and build a concrete AI integration strategy.</p>
              <div className="bg-dark p-4 rounded mb-4">
                <h4 className="text-sm uppercase text-muted tracking-wider mb-2">Sample Agenda</h4>
                <ul className="list-unstyled text-sm">
                  <li className="mb-2"><strong>Morning:</strong> AI Capability Mapping &amp; Competitive Analysis</li>
                  <li className="mb-2"><strong>Afternoon:</strong> Risk Mitigation, Ethical Governance &amp; ROI Modeling</li>
                  <li><strong>Outcome:</strong> A customized 12-month AI pilot roadmap.</li>
                </ul>
              </div>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.workshopHeader}>
                <h3>Academic AI Integration Lab</h3>
                <span className={styles.badge}><Calendar size={14} className="inline mr-1"/> 2-Day Program</span>
              </div>
              <p className="mb-4">Tailored for Higher Education Leaders, Deans, and Policy Makers looking to modernize curricula.</p>
              <div className="bg-dark p-4 rounded mb-4">
                <h4 className="text-sm uppercase text-muted tracking-wider mb-2">Sample Agenda</h4>
                <ul className="list-unstyled text-sm">
                  <li className="mb-2"><strong>Day 1:</strong> Re-evaluating Assessments &amp; Teaching in the GenAI Era</li>
                  <li className="mb-2"><strong>Day 2:</strong> Institutional Policy, Ethics, &amp; Faculty Training Frameworks</li>
                  <li><strong>Outcome:</strong> Comprehensive institutional guidelines for AI adoption.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-secondary text-center">
        <div className="container">
          <h2 className="section-title mb-4">Social <span className="accent-text">Proof</span></h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">Featured globally at premier summits, policy forums, and corporate offsites.</p>
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            <span className={styles.eventBadge}>Ai4 (Las Vegas)</span>
            <span className={styles.eventBadge}>World Summit AI (Amsterdam)</span>
            <span className={styles.eventBadge}>UNESCO Policy Consortium</span>
            <span className={styles.eventBadge}>Global AI Ethics Forum</span>
            <span className={styles.eventBadge}>T-Hub Innovation Summit</span>
          </div>
          
          <div className="grid-2 text-left">
            <div className="card bg-dark">
              <Quote size={24} className="text-accent mb-4" />
              <p className="italic mb-4">&quot;Dr. Hemachandran&apos;s ability to demystify complex quantum-AI concepts and map them to concrete business strategies was the highlight of our executive offsite.&quot;</p>
              <p className="font-bold text-sm text-accent">- VP of Strategy, Global Aviation Group</p>
            </div>
            <div className="card bg-dark">
              <Quote size={24} className="text-accent mb-4" />
              <p className="italic mb-4">&quot;A masterclass in ethical governance. His framework for balancing innovation with compliance is now required reading for our steering committee.&quot;</p>
              <p className="font-bold text-sm text-accent">- Director, European Technology Commission</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2 align-center">
            <div>
              <h2 className="section-title">For <span className="accent-text">Organizers</span></h2>
              <p className="text-muted mb-6">Access official biographies, high-resolution headshots, and technical requirements to streamline your event planning.</p>
              <ul className="list-unstyled mb-8">
                <li className="mb-3"><CheckCircle size={16} className="text-accent inline mr-2" /> Global availability (subject to schedule)</li>
                <li className="mb-3"><CheckCircle size={16} className="text-accent inline mr-2" /> Fluent in English delivery</li>
                <li className="mb-3"><CheckCircle size={16} className="text-accent inline mr-2" /> Customization calls included for every engagement</li>
              </ul>
              <button className="btn btn-outline mb-4 flex align-center gap-2">
                <Download size={18} /> Download Executive Bio
              </button>
            </div>
            <div className="card text-center bg-dark">
              <h3 className="mb-4">Ready to Inspire Your Audience?</h3>
              <p className="text-muted mb-6">Let&apos;s discuss how we can tailor a keynote or workshop to your precise organizational objectives.</p>
              <Link href="/contact?interest=speaking" className="btn btn-primary w-full block">Check Availability</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
