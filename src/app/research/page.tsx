import { Cpu, Plane, Map, Monitor, Scale, BarChart, ExternalLink, Network, Building, GraduationCap, Tractor } from 'lucide-react';

export const metadata = {
  title: 'Research & Innovations | Dr. Hemachandran K',
  description: 'Exploring next-gen AI systems, necrobotics, and quantum-ready smart city infrastructure.',
};

export default function ResearchPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <header style={{ padding: '20px 0 40px', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(249, 180, 1, 0.05) 0%, transparent 60%)' }}>
        <div className="container max-w-4xl">
          <h1 className="hero-title">Research &amp; <span className="accent-text">Innovations</span></h1>
          <p className="hero-desc">
            Translating visionary theoretical frameworks into actionable, real-world systems scaling across industries.
          </p>
        </div>
      </header>

      <section className="section bg-secondary" style={{ paddingTop: '10px' }}>
        <div className="container">
          <h2 className="section-title text-center mb-12">Flagship <span className="accent-text">Systems</span></h2>
          <div className="grid-3">
            
            <div className="card">
              <Cpu size={32} className="text-accent mb-4" />
              <h3 className="mb-2">Necrobotics Control Engine</h3>
              <p className="text-sm text-muted mb-4">Bio-inspired actuation mapping for volatile environments. Secured 2 US Patents.</p>
              <span className="text-xs font-bold text-accent">Partners: AI Robotics Lab, MIT Press</span>
            </div>

            <div className="card">
              <Plane size={32} className="text-accent mb-4" />
              <h3 className="mb-2">Smart Airport Flow</h3>
              <p className="text-sm text-muted mb-4">Computer-vision behavioral flow AI reducing terminal bottlenecks by 22%.</p>
              <span className="text-xs font-bold text-accent">Partners: European Aviation Consortium</span>
            </div>

            <div className="card">
              <Map size={32} className="text-accent mb-4" />
              <h3 className="mb-2">Behavioral GPS (bGPS)</h3>
              <p className="text-sm text-muted mb-4">Predictive trajectory mapping for autonomous and human-driven city transport.</p>
              <span className="text-xs font-bold text-accent">Partners: T-Hub, Smart City Initiative</span>
            </div>

            <div className="card">
              <Monitor size={32} className="text-accent mb-4" />
              <h3 className="mb-2">AI Leadership VR (Eunoia)</h3>
              <p className="text-sm text-muted mb-4">Neuroadaptive VR simulations for C-Suite crisis readiness in cyber/AI breaches.</p>
              <span className="text-xs font-bold text-accent">Partners: Woxsen Executive Labs</span>
            </div>

            <div className="card">
              <Scale size={32} className="text-accent mb-4" />
              <h3 className="mb-2">Automated Bias Detection</h3>
              <p className="text-sm text-muted mb-4">Real-time LLM toxicity and bias filtering engine compliant with EU AI Act frameworks.</p>
              <span className="text-xs font-bold text-accent">Partners: AI 2030, UNESCO Tech Board</span>
            </div>

            <div className="card">
              <BarChart size={32} className="text-accent mb-4" />
              <h3 className="mb-2">Electoral Forecasting Matrix</h3>
              <p className="text-sm text-muted mb-4">Advanced quantum-probability models for multi-variable geopolitical forecasting.</p>
              <span className="text-xs font-bold text-accent">Partners: Global Policy Institutes</span>
            </div>

          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title text-center mb-12">Thematic <span className="accent-text">Clusters</span></h2>
          <div className="grid-2 gap-8">
            <div className="card bg-dark flex flex-col gap-3">
              <Network size={40} className="text-accent mb-2" />
              <div>
                <h3 className="text-xl mb-3 border-b border-gray pb-2">Quantum AI &amp; Infrastructure</h3>
                <p className="text-sm text-muted">Investigating state-vector mapping and quantum-assisted optimization for large-scale physical networks (cities, transport grids, supply chains).</p>
              </div>
            </div>
            <div className="card bg-dark flex flex-col gap-3">
              <Building size={40} className="text-accent mb-2" />
              <div>
                <h3 className="text-xl mb-3 border-b border-gray pb-2">Smart Cities &amp; Governance</h3>
                <p className="text-sm text-muted">Building ethical guardrails, privacy-preserving IoT aggregation techniques, and sustainable AI metrics aligned with UN SDGs.</p>
              </div>
            </div>
            <div className="card bg-dark flex flex-col gap-3">
              <GraduationCap size={40} className="text-accent mb-2" />
              <div>
                <h3 className="text-xl mb-3 border-b border-gray pb-2">Education &amp; Learning</h3>
                <p className="text-sm text-muted">Pedagogical shifts in the LLM era, exploring spatial computing (AR/VR) for deep experiential learning in higher education.</p>
              </div>
            </div>
            <div className="card bg-dark flex flex-col gap-3">
              <Tractor size={40} className="text-accent mb-2" />
              <div>
                <h3 className="text-xl mb-3 border-b border-gray pb-2">Finance &amp; Agriculture</h3>
                <p className="text-sm text-muted">Predictive crop-yield models, algorithmic trading safety parameters, and rural FinTech adoption matrices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-secondary text-center">
        <div className="container max-w-4xl mx-auto">
          <h2 className="section-title mb-6">Open to <span className="accent-text">Collaboration</span></h2>
          <p className="text-muted mb-8 text-lg">Actively seeking partners for funded projects, Horizon Europe calls, and joint research labs.</p>
          
          <div className="grid-3 text-left mb-12">
            <div className="card bg-dark">
               <h4 className="font-bold mb-2">Funded Projects</h4>
               <p className="text-sm text-muted">Seeking consortia for smart city IoT and sustainable infrastructure grants.</p>
            </div>
            <div className="card bg-dark">
               <h4 className="font-bold mb-2">EU/UN Initiatives</h4>
               <p className="text-sm text-muted">Contributing to policy whitepapers, AI regulation drafts, and ethics steering committees.</p>
            </div>
            <div className="card bg-dark">
               <h4 className="font-bold mb-2">Joint Labs</h4>
               <p className="text-sm text-muted">Establishing corporate-academic R&amp;D nodes for AI integration and talent development.</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://scholar.google.co.in/citations?user=xGa-DEcAAAAJ&hl=en" target="_blank" rel="noreferrer" className="btn btn-primary flex align-center gap-2">
              Google Scholar <ExternalLink size={16} />
            </a>
            <a href="https://www.researchgate.net/profile/Kannan-Hemachandran" target="_blank" rel="noreferrer" className="btn btn-outline flex align-center gap-2" style={{ background: 'var(--bg-card)' }}>
              ResearchGate <ExternalLink size={16} />
            </a>
            <a href="https://airc.woxsen.edu.in/" target="_blank" rel="noreferrer" className="btn btn-outline flex align-center gap-2" style={{ background: 'var(--bg-card)' }}>
              AI Research Centre <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
