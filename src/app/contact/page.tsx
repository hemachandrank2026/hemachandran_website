import { Phone, Globe, MapPin, Linkedin } from 'lucide-react';
import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <>
      <div className="page-banner">
        <h1>Get in <span className="accent-text">Touch</span></h1>
        <p className="breadcrumb"><a href="/">Home</a> / Contact</p>
      </div>

      <section className="section">
        <div className="container">
          <p className={styles.intro}>
            Fill out the form below for general inquiries, and I&apos;ll be in touch within 2 business days. If you&apos;re looking for books, please visit the <a href="/books">Books</a> page.
          </p>

          <div className={styles.contactGrid}>
            {/* Map */}
            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3802.0115500975176!2d77.79715057547891!3d17.64961198328293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc9533c6aaaaaab%3A0x4f10ac8424d0d1dc!2sWoxsen%20University!5e0!3m2!1sen!2sin!4v1732524867423!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 'var(--radius)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Form */}
            <div className={styles.formWrap}>
              <h2>GET IN TOUCH</h2>

              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <Phone size={20} className={styles.infoIcon} />
                  <p>+040 4444 8888</p>
                </div>
                <div className={styles.infoItem}>
                  <Globe size={20} className={styles.infoIcon} />
                  <p>hemachandrank1985@gmail.com</p>
                </div>
                <div className={styles.infoItem}>
                  <MapPin size={20} className={styles.infoIcon} />
                  <p>Kamkole, Sadasivpet, Sangareddy District, Hyderabad - 502 345, Telangana, India.</p>
                </div>
              </div>

              <form action="https://api.web3forms.com/submit" method="POST" className={styles.form}>
                <input type="hidden" name="access_key" value="5c40ad72-eedb-4e5a-a1e7-53faf8f1e868" />
                <div className={styles.formRow}>
                  <input type="text" name="name" placeholder="Name *" required />
                  <input type="email" name="email" placeholder="Email *" required />
                </div>
                <input type="text" name="subject" placeholder="Subject *" required />
                <textarea name="message" placeholder="Type Your Message...." rows={5} required />
                <button type="submit" className="btn btn-primary">SEND</button>
              </form>

              <div className={styles.socialSection}>
                <h3>Follow Me</h3>
                <a href="https://www.linkedin.com/in/drhemachandrank/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
