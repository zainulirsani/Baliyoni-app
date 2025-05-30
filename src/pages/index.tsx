import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('is_logged_in') === 'true';

    if (!isLoggedIn) {
      router.push('/auth/login');
    } else {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const role = user?.role;

      switch (role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'manager':
          router.push('/manager');
          break;
        case 'kadiv':
          router.push('/kadiv');
          break;
        default:
          router.push('/auth/login');
      }
    }
  }, [router]);

  return (
    null
  );
};

export default Home;
