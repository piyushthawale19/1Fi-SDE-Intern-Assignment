import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

const PUBLIC_ROUTES = ['/auth/login', '/auth/register', '/help', '/terms'];

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);

    if (!token && !isPublicRoute) {
      router.replace('/auth/register');
    } else if (token && (router.pathname === '/auth/login' || router.pathname === '/auth/register')) {
      router.replace('/shop');
    }
  }, [isHydrated, token, router, router.pathname]);

  if (!isHydrated) return null;

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  const { setHydrated, login } = useAuthStore();

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      authService.getMe()
        .then((user) => login(user, token))
        .catch(() => authService.clearToken())
        .finally(() => setHydrated(true));
    } else {
      setHydrated(true);
    }
  }, [login, setHydrated]);

  return (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  );
}
