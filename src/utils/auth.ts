import { STORAGE_KEYS } from './constants/api';

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const getUserData = () => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return userData ? JSON.parse(userData) : null;
};

export const logout = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);

  // Clear cookies
  document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
