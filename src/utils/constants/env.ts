const DEFAULT_SANDBOX_BASE_URL = 'https://flick-checkout-sandbox.vercel.app';

export const FOREIGN_DIRECT_DEBIT_CURRENCIES = ['USD', 'EUR', 'GBP', 'GHS', 'KES'];

export const SANDBOX_CHECKOUT_BASE_URL =
  process.env.NEXT_PUBLIC_SANDBOX_CHECKOUT_BASE_URL || DEFAULT_SANDBOX_BASE_URL;

export const USE_SANDBOX_CHECKOUT =
  (process.env.NEXT_PUBLIC_USE_SANDBOX_CHECKOUT || 'true').toLowerCase() !== 'false';

export const buildSandboxCheckoutUrl = (pageId: string) => {
  const trimmedBase = SANDBOX_CHECKOUT_BASE_URL.replace(/\/$/, '');
  const trimmedPage = pageId.replace(/^\//, '').replace(/^pages\//, '');
  return `${trimmedBase}/pages/${trimmedPage}`;
};


