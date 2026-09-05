import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(form.email, form.password);
      login(data.user, data.token);
      router.push('/shop');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In — 1Fi</title>
      </Head>
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-logo">
            <div className="auth-logo-text">1Fi</div>
            <div className="auth-logo-sub">Buy now, pay on your terms</div>
          </div>

          <div className="auth-card">
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to access your 1Fi account</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {error && <div className="alert alert-error">{error}</div>}

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
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
                style={{ marginTop: '4px' }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          <div className="auth-footer">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register">Create one</Link>
          </div>
        </div>
      </div>
    </>
  );
}
