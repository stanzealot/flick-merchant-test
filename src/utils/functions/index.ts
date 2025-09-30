import { jwtDecode, JwtPayload } from 'jwt-decode';
import { format } from 'date-fns';
import CryptoJS from 'crypto-js';
import { destroyCookie } from 'nookies';
import { MutableRefObject } from 'react';
import JSEncrypt from 'jsencrypt';
import html2canvas, { Options } from 'html2canvas';
import { API, STORAGE_KEYS } from '../constants/api';
import { ROUTE_KEYS } from '../constants';
import { TableDataFilter } from '@/src/schema/data/balance';

interface Card {
  cardCountry: string;
  cardIssuer: string;
  cardFirstSix: string;
  cardBin: string;
  cardId: string;
  cardName: string;
}

export function formatWords(str: string) {
  if (!str) return;
  return str
    .split(/[_-]/)
    .map((word: string) => word.charAt(0).toUpperCase() + word?.slice(1))
    .join(' ');
}

export function formatNumber(
  value: number | string | undefined = 0,
  options?: Intl.NumberFormatOptions
) {
  const currencyOptions: Intl.NumberFormatOptions = options?.currency
    ? {
        currency: options.currency,
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
      }
    : {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };

  return new Intl.NumberFormat('en-US', {
    ...options,
    ...currencyOptions,
  }).format(isNaN(+value) ? 0 : +value);
}

export function getFirstLetterOfWords(str: string) {
  if (!str) return;
  return str
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('');
}

export const isTokenExpired = (token: string): boolean => {
  const decodedToken: JwtPayload = jwtDecode(token);
  return !decodedToken.exp || decodedToken.exp * 1000 < Date.now();
};

export function logout() {
  destroyCookie(null, STORAGE_KEYS.AUTH_TOKEN);
  destroyCookie(null, STORAGE_KEYS.MERCHANT_CODE);
  destroyCookie(null, STORAGE_KEYS.MERCHANT_KEY);
  localStorage.clear();
  window.location.pathname = ROUTE_KEYS.LOGIN;
}

export function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  return hours < 12 ? 'Morning 🌅' : hours < 18 ? 'Afternoon 🌞' : 'Evening 🌜';
}

export function getCurrencySymbol(currency: string) {
  switch (currency) {
    case 'USD':
      return {
        symbol: '$',
        iso_2: 'US',
        color: 'bg-[#F1F5FE]',
        name: 'United States Dollar',
        nameShort: 'dollars',
      };
    case 'NGN':
      return {
        symbol: '₦',
        iso_2: 'NG',
        color: 'bg-[#F0FFF5]',
        name: 'Nigerian Naira',
        nameShort: 'naira',
      };
    case 'GHS':
      return {
        symbol: '₵',
        iso_2: 'GH',
        color: 'bg-[#FEFAEE]',
        name: 'Ghanaian Cedi',
        nameShort: 'cedi',
      };
    case 'KES':
      return {
        symbol: 'Ksh',
        iso_2: 'KE',
        color: 'bg-[#FFF5F1]',
        name: 'Kenyan Shilling',
        nameShort: 'shillings',
      };
    case 'CAD':
      return {
        symbol: 'C$',
        iso_2: 'CA',
        color: 'bg-[#E3ECFF]',
        name: 'Canadian Dollars',
        nameShort: 'Canadian dollars',
      };
    case 'GBP':
      return {
        symbol: '£',
        iso_2: 'GB',
        color: 'bg-[#DFE3EC]',
        name: 'British Pounds',
        nameShort: 'pounds',
      };
    case 'EUR':
      return {
        symbol: '€',
        iso_2: 'EUR',
        color: 'bg-[#F1F5FE]',
        name: 'Euro',
        nameShort: 'euro',
      };

    default:
      return {
        symbol: '$',
        color: 'bg-[#F1F5FE]',
        name: 'United States Dollar',
        nameShort: 'dollars',
      };
  }
}

export function getMoney(value: number) {
  const result = Number(value) / 100;
  return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatDateTime = (date: Date | string) => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

export const formatDate = (date: Date | string) => {
  return format(date, 'yyyy-MM-dd');
};

export const formatTime = (date: Date | string) => {
  return format(date, 'HH:mm:ss');
};

export function capitalizeWords(str: string) {
  if (!str) return '';
  return str
    .split('_')
    .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
    .join(' ');
}

export function subStringText(text: string, length: number) {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

interface FilterParams {
  [key: string]: string | null;
}

export const filterFunction = ({
  data,
  search,
  searchParams,
  dateRange,
  channel,
  status,
  email,
}: {
  data: any[];
  search: string;
  searchParams: string[];
  dateRange: { dateFrom?: string | null; dateTo?: string | null };
  channel?: string;
  status?: string;
  email?: string;
}): TableDataFilter[] => {
  const { dateFrom = null, dateTo = null } = dateRange || {};
  const formattedData = data?.filter((item) => {
    const itemDate = new Date(item.dated || item.dated_raw || item.datedStamp || item.dateCreated);

    const isWithinDateRange = (() => {
      if (dateFrom && dateTo) {
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        return itemDate >= from && itemDate <= to;
      } else if (dateFrom) {
        const from = new Date(dateFrom);
        return itemDate >= from;
      } else if (dateTo) {
        const to = new Date(dateTo);
        return itemDate <= to;
      }
      return true;
    })();

    const searchLower = search?.toLowerCase() || '';

    // Check all fields for the search term
    const isMatch = searchParams.some((key) => {
      const value = item[key]?.toString().toLowerCase() || '';
      return value.includes(searchLower);
    });

    const isChannelMatch = channel ? item.channel === channel : true;
    const isEmailMatch = email ? item.email?.toLowerCase().includes(email.toLowerCase()) : true;
    const isStatusMatch = status ? item.status === status : true;

    return isMatch && isWithinDateRange && isChannelMatch && isStatusMatch && isEmailMatch;
  });

  return formattedData;
};

export const captureSection = (
  sectionRef: MutableRefObject<HTMLDivElement | null>,
  fileName: string,
  config?: {
    scale: 2;
    useCORS: true;
  }
): void => {
  if (sectionRef?.current) {
    html2canvas(sectionRef.current, config)
      .then((canvas) => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${fileName}.png`;
        link.click();
      })
      .catch((error) => {
        console.error('Error capturing section as an image:', error);
      });
  }
};

export function filterUniqueCards(cards: Card[]): Card[] {
  const uniqueCardsMap = new Map<string, Card>();

  cards?.forEach((card) => {
    if (!uniqueCardsMap.has(card.cardId)) {
      uniqueCardsMap.set(card.cardId, card);
    }
  });

  return Array.from(uniqueCardsMap.values());
}

const secretKey = 'Shinra_Tensei';

export function encryptString(text: string) {
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export function decryptString(ciphertext: string): string {
  try {
    if (!ciphertext) return '';
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) throw new Error('Decryption failed; result is empty or malformed.');

    return decryptedText;
  } catch (error: any) {
    console.error('Decryption error:', error.message);
    return '';
  }
}

export function sendMessageToSlack(message: string) {
  fetch('/api/send-slack-message', {
    method: 'POST', // Ensure this is POST
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      console.log('Message sent to Slack successfully');
    })
    .catch((error) => {
      console.error('Error calling Slack API:', error);
    });
}

export function detectCardType(cardNumber: string): 'visa-icon' | 'mastercard-icon' | null {
  const cardNumberClean = cardNumber.replace(/\s/g, '');
  if (/^4/.test(cardNumberClean)) {
    return 'visa-icon';
  } else if (/^5[1-5]/.test(cardNumberClean)) {
    return 'mastercard-icon';
  }
  return null;
}

export function removeSpaces(text: string) {
  if (!text) return '';
  return text.replace(/\s/g, '');
}

export function encryptWithPublicKey(data: string, pubk: string) {
  try {
    console.log('Data to encrypt:', data);
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubk);
    const encryptedData = encrypt.encrypt(data);
    console.log('Encrypted data:', encryptedData);
    return encryptedData;
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
}

export const convertToCSV = <T>(data: T[]): string => {
  if (!data.length) return '';

  const headers = Object.keys(data[0] as Record<string, unknown>).join(',');
  const rows = data
    .map((row) => Object.values(row as Record<string, unknown>).join(','))
    .join('\n');

  return `${headers}\n${rows}`;
};

export const downloadCSV = <T>(data: T[], filename: string = 'data.csv') => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export function validateDateInput(value: string, type: string): string {
  value = value.replace(/[^0-9]/g, '');

  if (value === '0' || value === '') {
    return '';
  }

  if (value.length === 1 && parseInt(value, 10) > (type === 'day' ? 3 : 1)) {
    value = `0${value}`;
  }

  if (
    value.length === 2 &&
    (parseInt(value, 10) < 1 || parseInt(value, 10) > (type === 'day' ? 31 : 12))
  ) {
    return value.slice(0, -1);
  }

  return value;
}

export function assignBankImage(bankName: string): string {
  const formattedBankName = /Bank|-/.test(bankName)
    ? bankName.replace(/-/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
    : bankName;

  const bankImageMap: Record<string, string> = {
    'Access Bank': '/images/banks/access-bank-icon.png',
    'First Bank': '/images/banks/first-bank-icon.png',
    GTBank: '/images/banks/gtbank.png',
    'Zenith Bank': '/images/banks/zenith-bank-icon.png',
    UBA: '/images/banks/united-bank-africa-icon.png',
    'Fidelity Bank': '/images/banks/fidelity-bank-icon.png',
    'Polaris Bank': '/images/banks/polaris-bank.png',
    'Union Bank': '/images/banks/union-bank-icon.png',
    'Sterling Bank': '/images/banks/sterling-bank-icon.png',
    'Stanbic IBTC': '/images/banks/stanbic-bank-icon.png',
    'Wema Bank': '/images/banks/wema.png',
    FCMB: '/images/banks/fcmb-bank-icon.png',
    'Heritage Bank': '/images/banks/heritage-bank-icon.png',
    'Keystone Bank': '/images/banks/keystone.png',
    'Unity Bank': '/images/banks/unity-bank-icon.png',
    'Jaiz Bank': '/images/banks/jaiz-bank-icon.png',
    'Providus Bank': '/images/banks/providus-bank-icon.png',
    'Stanbic Mobile': '/images/banks/stanbic-bank-icon.png',
    'Kuda Bank': '/images/banks/kuda-bank-icon.png',
    'Rubies Bank': '/images/banks/rubies-icon.png',
    'Titan Trust Bank': '/images/banks/paystack-titan.png',
    'Standard Chartered Bank': '/images/banks/standard-charter-bank-icon.png',
    'Citi Bank': '/images/banks/citi-bank.png',
    Ecobank: '/images/banks/ecobank-icon.png',
    Moniepoint: '/images/banks/moniepoint.png',
    Opay: '/images/banks/opay-icon.jpg',
    PalmPay: '/images/banks/palmpay.png',
    PaystackTitan: '/images/banks/paystack-titan.png',
    SparkleBank: '/images/banks/sparkle-icon.png',
  };

  return bankImageMap[formattedBankName] || '/images/banks/globe.png';
}

export function addOrdinalSuffix(day: number | string) {
  const parsedDay = parseInt(day.toString(), 10);
  if (parsedDay > 3 && parsedDay < 21) return `${parsedDay}th`;
  switch (parsedDay % 10) {
    case 1:
      return `${parsedDay}st`;
    case 2:
      return `${parsedDay}nd`;
    case 3:
      return `${parsedDay}rd`;
    default:
      return `${parsedDay}th`;
  }
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const convertFileToBinary = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = (error) => reject(error);
  });
};
