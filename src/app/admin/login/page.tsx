'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const router = useRouter();

  // Forgot password form state
  const [resetUsername, setResetUsername] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError('Invalid username or password');
    } else {
      router.push('/admin');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: resetUsername,
          resetCode,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Password reset successfully! You can now sign in.');
        setResetUsername('');
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setShowForgot(false);
          setSuccess('');
        }, 2500);
      } else {
        setError(data.error || 'Reset failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchToForgot = () => {
    setShowForgot(true);
    setError('');
    setSuccess('');
  };

  const switchToLogin = () => {
    setShowForgot(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {!showForgot ? (
          <>
            <h1 className={styles.title}>Admin <span>Login</span></h1>
            <p className={styles.subtitle}>Manage your portfolio content</p>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><Loader2 size={18} className={styles.spin} /> Signing in...</> : 'Sign In'}
              </button>
            </form>

            <button className={styles.forgotLink} onClick={switchToForgot}>
              Forgot Password?
            </button>
          </>
        ) : (
          <>
            <button className={styles.backBtn} onClick={switchToLogin}>
              <ArrowLeft size={16} /> Back to Login
            </button>

            <h1 className={styles.title}>Reset <span>Password</span></h1>
            <p className={styles.subtitle}>Enter your admin reset code to set a new password</p>

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <form onSubmit={handleResetPassword} className={styles.form}>
              <input
                type="text"
                placeholder="Username"
                value={resetUsername}
                onChange={(e) => setResetUsername(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Secret Reset Code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><Loader2 size={18} className={styles.spin} /> Resetting...</> : 'Reset Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
