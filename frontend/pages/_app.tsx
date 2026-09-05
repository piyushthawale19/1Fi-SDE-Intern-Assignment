import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '@/styles/globals.css';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

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

  return <Component {...pageProps} />;
}
