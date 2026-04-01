import Link from 'next/link';
import { Target, Search, Rocket, ArrowRight, Zap, Building, GraduationCap, Server } from 'lucide-react';
import styles from './page.module.css';
import { getDynamicCounts } from '@/lib/getDynamicCounts';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'AI Consulting | Dr. Hemachandran K',
  description: 'AI strategy, quantum-ready infrastructure, and ethical governance frameworks for aviation, cities, and enterprises.',
};

export default async function AIConsultingPage() {
  const counts = await getDynamicCounts();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="hero-title">AI <span className="accent-text">Consulting</span></h1>
          <p className="hero-desc">
            Transforming operations and mitigating risk through battle-tested AI blueprints. Assisting airports, city governments, universities, and Fortune 500s.
          </p>
        </div>
      </header>

      <section className="section bg-secondary" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div className="grid-2 align-center">
            <div>
              <h2 className="section-title">Who I <span className="accent-text">Work With</span></h2>
              <p className="text-muted mb-6">Bringing global insights from European commissions and UNESCO directly to your organization.</p>
              <div className="grid-2 gap-4">
                <div className="card bg-dark">
                  <Building size={32} className="text-accent mb-3" />
                  <div>
                    <h4 className="font-bold mb-2">Smart Cities &amp; Govt</h4>
                    <p className="text-sm text-muted">Building ethical governance and predictive models for urban planning.</p>
                  </div>
                </div>
                <div className="card bg-dark">
                  <GraduationCap size={32} className="text-accent mb-3" />
                  <div>
                    <h4 className="font-bold mb-2">Universities</h4>
                    <p className="text-sm text-muted">Curriculum innovation and establishing AI research centers of excellence.</p>
                  </div>
                </div>
                <div className="card bg-dark">
                  <Server size={32} className="text-accent mb-3" />
                  <div>
                    <h4 className="font-bold mb-2">Enterprise &amp; Startups</h4>
                    <p className="text-sm text-muted">Accelerating product roadmaps with cutting-edge ML and NLP integration.</p>
                  </div>
                </div>
                <div className="card bg-dark">
                  <Zap size={32} className="text-accent mb-3" />
                  <div>
                    <h4 className="font-bold mb-2">Aviation &amp; Transport</h4>
                    <p className="text-sm text-muted">Quantum-ready infrastructure and autonomous baggage/security logic.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-dark p-8 rounded border border-gray">
              <h3 className="mb-6 border-b border-gray pb-4">Flagship Services</h3>
              <ul className="bulletList">
                <li className="mb-6">
                  <ArrowRight size={16} className="text-accent" />
                  <h4 className="text-accent font-bold mb-2 inline">AI Strategy &amp; Roadmap</h4>
                  <p className="text-sm text-muted">From readiness assessment to a 3-year execution plan.</p>
                </li>
                <li className="mb-6">
                  <ArrowRight size={16} className="text-accent" />
                  <h4 className="text-accent font-bold mb-2 inline">Quantum AI &amp; Smart Infrastructure</h4>
                  <p className="text-sm text-muted">Architecting the next generation of scalable, automated physical space optimizations.</p>
                </li>
                <li className="mb-6">
                  <ArrowRight size={16} className="text-accent" />
                  <h4 className="text-accent font-bold mb-2 inline">Ethical AI Governance Frameworks</h4>
                  <p className="text-sm text-muted">Ensuring compliance, fairness, and transparency for ML pipelines at scale.</p>
                </li>
                <li>
                  <ArrowRight size={16} className="text-accent" />
                  <h4 className="text-accent font-bold mb-2 inline">Algorithm &amp; Product Acceleration</h4>
                  <p className="text-sm text-muted">Rapid prototyping and model fine-tuning for high-growth tech firms.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title text-center mb-12">Project <span className="accent-text">Impact</span></h2>
          <div className="grid-3">
            
            <div className="card">
              <span className="text-xs font-bold uppercase text-accent tracking-widest mb-2 block">Aviation</span>
              <h3 className="mb-4">Smart Airport Passenger Flow</h3>
              <div className="text-muted text-sm space-y-2 mb-4">
                <p><strong className="text-white">Problem:</strong> Bottlenecks in security and boarding caused 15% delays during peak hours.</p>
                <p><strong className="text-white">Solution:</strong> Designed a computer-vision behavioral flow AI pipeline integrated with terminal IoT.</p>
                <p><strong className="text-white">Impact:</strong> Reduced wait times by 22% and secured European aviation innovation grant.</p>
              </div>
            </div>

            <div className="card">
              <span className="text-xs font-bold uppercase text-accent tracking-widest mb-2 block">Robotics</span>
              <h3 className="mb-4">Necrobotics Control Framework</h3>
              <div className="text-muted text-sm space-y-2 mb-4">
                <p><strong className="text-white">Problem:</strong> Lack of resilient actuation mechanisms in micro-robotics for volatile environments.</p>
                <p><strong className="text-white">Solution:</strong> Patented a decentralized neural architecture utilizing organic-synthetic bridges.</p>
                <p><strong className="text-white">Impact:</strong> Published in top-tier robotics journals; adopted by two leading R&amp;D labs.</p>
              </div>
            </div>

            <div className="card">
              <span className="text-xs font-bold uppercase text-accent tracking-widest mb-2 block">Education</span>
              <h3 className="mb-4">AI Leadership Simulation (VR)</h3>
              <div className="text-muted text-sm space-y-2 mb-4">
                <p><strong className="text-white">Problem:</strong> Executives struggled to conceptualize AI crises logically.</p>
                <p><strong className="text-white">Solution:</strong> Engineered a neuroadaptive VR simulation mapping stress responses during cyber/AI breaches.</p>
                <p><strong className="text-white">Impact:</strong> Used by {counts.fellows}+ Global Fellows to certify crisis-readiness.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section bg-secondary text-center">
        <div className="container">
          <h2 className="section-title mb-12">The <span className="accent-text">Process</span></h2>
          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <div className={styles.processIcon}><Search size={28} /></div>
              <h4>1. Discovery</h4>
              <p className="text-sm text-muted">Auditing existing data assets, identifying regulatory constraints, and aligning with business KPIs.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processIcon}><Target size={28} /></div>
              <h4>2. Design</h4>
              <p className="text-sm text-muted">Architecting the custom framework/roadmap, detailing technical stack, ethical guardrails, and milestones.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processIcon}><Rocket size={28} /></div>
              <h4>3. Implementation</h4>
              <p className="text-sm text-muted">Oversight of execution, model evaluation, stakeholder training, and iterative refinement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container max-w-3xl mx-auto bg-dark p-12 rounded border border-gray">
          <h2 className="mb-6">Ready to Accelerate Your AI Initiatives?</h2>
          <p className="text-muted mb-8 text-lg">Schedule a strategy call to map your requirements against global best practices.</p>
          <Link href="/contact?interest=consulting" className="btn btn-primary btn-lg">
            Schedule a Strategy Call <ArrowRight size={18} className="inline ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
