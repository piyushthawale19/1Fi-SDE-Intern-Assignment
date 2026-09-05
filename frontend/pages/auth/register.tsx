import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.register(form.email, form.password, form.name);
      login(data.user, data.token);
      router.push('/shop');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Account — 1Fi</title>
      </Head>
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-logo">
            <div className="auth-logo-text">1Fi</div>
            <div className="auth-logo-sub">Buy now, pay on your terms</div>
          </div>

          <div className="auth-card">
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Join 1Fi to shop on easy EMI</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {error && <div className="alert alert-error">{error}</div>}

              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Piyush Thawale"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="form-input"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              <button
                id="register-submit-btn"
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
                style={{ marginTop: '4px' }}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          </div>

          <div className="auth-footer">
            Already have an account?{' '}
            <Link href="/auth/login">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
}
