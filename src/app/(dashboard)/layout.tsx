'use client';

import { useEffect, useRef, useState } from 'react';
import { Layout as AntdLayout } from 'antd';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Sidebar from '@/src/components/layouts/DashboardPageLayout/sidebar';
import Header from '@/src/components/layouts/DashboardPageLayout/header';
import Content from '@/src/components/layouts/DashboardPageLayout/content';
import { AnimatePresence, motion } from 'framer-motion';
import { logout } from '@/src/utils/functions';
import { useSettingTabs } from '@/src/utils/store/settingsStore';
import { ROUTE_KEYS } from '@/src/utils/constants';
import { STORAGE_KEYS } from '@/src/utils/constants/api';
import CustomLoader from '@/src/components/blocks/custom-loader';
import useGetMerchantInfo from '../api/hooks/authentication/useGetMerchantInfo';
import useUserDataStore from '@/src/utils/store/userStore';

type Props = {
  readonly children: React.ReactNode;
};

const INACTIVITY_TIME = 30 * 60 * 1000;

export default function Layout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname(); // Add this hook
  const { userData, clearUserData } = useUserDataStore();
  const { setPage } = useSettingTabs();
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Comment out the API call that might be causing issues
  // const { data, isLoading } = useGetMerchantInfo();

  const resetTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIME);
  };

  const handleLogout = () => {
    clearUserData();
    setPage('business-preference');
    logout();
    router.push(ROUTE_KEYS.LOGIN);
  };

  // Authentication check - runs before rendering
  useEffect(() => {
    const checkAuthentication = () => {
      // Check for userData in Zustand store
      const hasUserData = !!userData && !!userData.token;
      
      // Check for AUTH_TOKEN in localStorage
      let hasAuthToken = false;
      if (typeof window !== 'undefined') {
        hasAuthToken = !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      }

      // If user is not authenticated, redirect to login
      if (!hasUserData && !hasAuthToken) {
        console.log('⚠️ User not authenticated, redirecting to login');
        router.push(ROUTE_KEYS.LOGIN);
        return;
      }

      // User is authenticated, proceed with initialization
      setIsCheckingAuth(false);
      setIsInitialized(true);
      setIsVerified(true);
    };

    checkAuthentication();
  }, [userData, router]);

  // Simplified initialization logic (only runs if authenticated)
  useEffect(() => {
    if (!isInitialized || isCheckingAuth) {
      return;
    }

    // Additional verification logic can go here if needed
    // For now, we just ensure the user is authenticated
  }, [isInitialized, isCheckingAuth]);

  useEffect(() => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [resetTimer]);

  // Show loading while checking authentication or if not initialized
  if (isCheckingAuth || !isInitialized) {
    return <CustomLoader />;
  }

  // If user is not authenticated (shouldn't reach here due to redirect, but safety check)
  if (!userData && typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)) {
    return null; // Redirect is happening
  }

  return (
    <AntdLayout hasSider={true}>
      <Sidebar />
      <AntdLayout>
        <Header />
        <Content>
          <AnimatePresence mode="wait">
            <motion.div
              // Use pathname instead of router.asPath
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.1, duration: 0.3 }} // Reduce delay
              className="overflow-y-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
}
