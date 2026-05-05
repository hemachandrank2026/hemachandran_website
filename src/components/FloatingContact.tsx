'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail } from 'lucide-react';
import styles from './FloatingContact.module.css';

export default function FloatingContact() {
  const pathname = usePathname();

  // Don't show the floating button if we are already on the contact page or in the admin dashboard
  if (pathname === '/contact' || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <Link href="/contact" className={styles.floatingBtn} aria-label="Send an Inquiry">
      <div className={styles.iconWrapper}>
        <Mail size={22} />
      </div>
      <span className={styles.btnText}>Send an Inquiry</span>
    </Link>
  );
}
