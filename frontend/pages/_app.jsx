import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import { useAuthStore } from '@/store/useAuth';
import { useThemeStore } from '@/store/useTheme';
import { Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps }) => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const router = useRouter();


  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !authUser && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [isCheckingAuth, authUser, router.pathname]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      {authUser && <Navbar />}
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
};

export default App;



