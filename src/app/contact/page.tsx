'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Globe, MapPin, Linkedin, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import styles from './contact.module.css';

function ContactForm() {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get('interest');

  const [interests, setInterests] = useState({
    keynote: interestParam === 'speaking',
    advisory: interestParam === 'advisory',
    consulting: interestParam === 'consulting',
    workshop: interestParam === 'workshop',
  });

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterests({ ...interests, [e.target.name]: e.target.checked });
  };

  const showEventDetails = interests.keynote || interests.workshop;
  const showOrgDetails = interests.advisory || interests.consulting || interests.workshop || interests.keynote;

  return (
    <form action="https://api.web3forms.com/submit" method="POST" className={styles.form}>
      <input type="hidden" name="access_key" value="5c40ad72-eedb-4e5a-a1e7-53faf8f1e868" />
      
      <div className={styles.checkboxGroup}>
        <p className="mb-3 font-bold text-sm uppercase tracking-wider text-muted">What would you like to discuss?</p>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="keynote" checked={interests.keynote} onChange={handleCheckbox} />
          Invite for keynote / panel
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="advisory" checked={interests.advisory} onChange={handleCheckbox} />
          Explore advisory / board role
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="consulting" checked={interests.consulting} onChange={handleCheckbox} />
          Discuss AI consulting project
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="workshop" checked={interests.workshop} onChange={handleCheckbox} />
          Design executive workshop / program
        </label>
      </div>

      <div className={styles.formRow}>
        <input type="text" name="name" placeholder="Full Name *" required />
        <input type="email" name="email" placeholder="Email Address *" required />
      </div>

      {showOrgDetails && (
        <div className={styles.formRow}>
           <input type="text" name="organization" placeholder="Organization / Institution *" required />
           <input type="text" name="role" placeholder="Your Role / Title" />
        </div>
      )}

      {showEventDetails && (
        <div className={styles.formRow}>
           <input type="text" name="date" placeholder="Proposed Date / Timeline" />
           <select name="audience" required className={styles.selectInput}>
              <option value="">Select Audience Type...</option>
              <option value="C-Suite/Board">C-Suite / Board</option>
              <option value="Academic/Deans">Academic / University Leadership</option>
              <option value="General Corporate">General Corporate / Management</option>
              <option value="Public Event/Conference">Public Event / Conference</option>
           </select>
        </div>
      )}

      {showOrgDetails && (
        <select name="budget" className={`${styles.selectInput} mb-4`}>
           <option value="">Estimated Budget Range (Optional)...</option>
           <option value="< $5k">Under $5k</option>
           <option value="$5k - $15k">$5k - $15k</option>
           <option value="$15k+">$15k+</option>
        </select>
      )}

      <textarea name="message" placeholder="Please provide additional details about your inquiry..." rows={5} required />
      
      <button type="submit" className="btn btn-primary w-full mt-4 flex justify-center gap-2 align-center">
        Submit Inquiry <ArrowRight size={18} />
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <header style={{ padding: '80px 0 40px', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(249, 180, 1, 0.05) 0%, transparent 60%)' }}>
        <div className="container max-w-4xl">
          <h1 className="hero-title">Start a <span className="accent-text">Conversation</span></h1>
          <p className="hero-desc">
            Whether for a high-impact keynote, strategic consulting, or board advisory, reach out to explore how we can collaborate.
          </p>
        </div>
      </header>

      <section className="section bg-secondary">
        <div className="container">
          <div className={styles.contactGrid}>
            
            <div className={styles.infoCol}>
              <h2 className="mb-6">Direct <span className="accent-text">Channels</span></h2>
              <p className="text-muted mb-8 text-sm leading-relaxed">
                For urgent media inquiries or immediate consulting needs, you may use the direct contact information or schedule a quick discovery call below.
              </p>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <Globe size={20} className={styles.infoIcon} />
                  <div>
                    <strong className="block mb-1">Email</strong>
                    <a href="mailto:hemachandran.k@woxsen.edu.in" className="text-muted hover-accent transition">hemachandran.k@woxsen.edu.in</a>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <MapPin size={20} className={styles.infoIcon} />
                  <div>
                    <strong className="block mb-1">Primary Office</strong>
                    <p className="text-muted text-sm">Woxsen University, Kamkole, Sadasivpet, Sangareddy, Hyderabad, Telangana, India.</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Linkedin size={20} className={styles.infoIcon} />
                  <div>
                    <strong className="block mb-1">LinkedIn</strong>
                    <a href="https://www.linkedin.com/in/drhemachandrank/" target="_blank" rel="noreferrer" className="text-muted hover-accent transition">Connect on LinkedIn</a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray">
                <a href="#" className="btn btn-outline flex align-center justify-center gap-2 w-full">
                  <CalendarIcon size={18} /> Schedule via Calendly
                </a>
                <p className="text-xs text-muted mt-3 text-center">For pre-qualified introductory calls only.</p>
              </div>
            </div>

            <div className={styles.formCol}>
              <h2 className="mb-6">Send an <span className="accent-text">Inquiry</span></h2>
              <Suspense fallback={<div className="text-muted">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
