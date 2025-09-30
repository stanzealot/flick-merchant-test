export const ROUTE_KEYS = {
  GETTING_STARTED: '/getting-started',
  OVERVIEW: '/overview',
  BALANCE: '/balance',
  PAYMENT: '/payment',
  PAYMENT_INFLOW: '/inflow',
  PAYMENT_OUTFLOW: '/outflow',
  PAYMENT_DIRECT_DEBIT: '/direct-debit',
  PAYMENT_PAYLINKS: '/paylinks',
  PAYMENT_DISPUTES: '/disputes',
  PAYMENT_CUSTOMERS: '/customers',
  DATA: '/data',
  IDENTITY: '/identity',
  ACCOUNTS: '/accounts',
  TRANSACTIONS: '/transactions',
  STATEMENT: '/statement',
  CUSTOMERS_DATA: '/c-data',
  CUSTOMER_SINGLE: '/c-data/customer',
  SETTINGS: '/settings',
  WALLET_HISTORY: '/wallet-history',
  BUSINESS: '/business',
  KYC_PENDING: '/kyc-pending',
  AGREEMENT: '/agreement',

  // AUTHENTICATION
  SIGN_UP: '/signup',
  LOGIN: '/',
  RESET: '/reset',
  FORGOT: '/forgot',
  API_DOCS: 'https://docs.getflick.co/reference/introduction',
};

export const ROUTE_LABELS = {
  [ROUTE_KEYS.GETTING_STARTED]: 'Getting Started',
  [ROUTE_KEYS.OVERVIEW]: 'Overview',
  [ROUTE_KEYS.BALANCE]: 'Balance',
  [ROUTE_KEYS.PAYMENT]: 'Payment',
  [ROUTE_KEYS.PAYMENT_INFLOW]: 'Inflow',
  [ROUTE_KEYS.PAYMENT_OUTFLOW]: 'Outflow',
  [ROUTE_KEYS.PAYMENT_DIRECT_DEBIT]: 'Direct Debit',
  [ROUTE_KEYS.PAYMENT_PAYLINKS]: 'Paylinks',
  [ROUTE_KEYS.PAYMENT_DISPUTES]: 'Disputes',
  [ROUTE_KEYS.PAYMENT_CUSTOMERS]: 'Customers',
  [ROUTE_KEYS.DATA]: 'Data',
  [ROUTE_KEYS.IDENTITY]: 'Identity',
  [ROUTE_KEYS.ACCOUNTS]: 'Accounts',
  [ROUTE_KEYS.TRANSACTIONS]: 'Transactions',
  [ROUTE_KEYS.STATEMENT]: 'Statement',
  [ROUTE_KEYS.CUSTOMERS_DATA]: 'Customers',
  [ROUTE_KEYS.SETTINGS]: 'Settings',
};

export const TABLE_FILTER_OPTIONS = [
  { label: 'All time', value: 'all_time' },
  { label: 'Today', value: 'today' },
  { label: 'Last 7 days', value: 'last_7_days' },
  { label: 'Last 30 days', value: 'last_30_days' },
  { label: 'Last 90 days', value: 'last_90_days' },
];

export const MANDATE_FILTER_OPTIONS = [
  { label: 'All Mandates', value: 'all_mandates' },
  { label: 'Active Mandates', value: 'active_mandates' },
  { label: 'Expired Mandates', value: 'expired_mandates' },
  { label: 'Pending Mandates', value: 'pending_mandates' },
  { label: 'Deactivated Mandates', value: 'deactivated_mandates' },
];

export const HEADER_NAV_DROPDOWNS = [
  { label: 'Convert', value: 'convert' },
  { label: 'Payout to Bank', value: 'payout' },
  { label: 'Transfer to Flick Account', value: 'flick-transfer' },
  { label: 'Create PayLink', value: 'paylink' },
  { label: 'Create Direct Debit Link', value: 'direct-debit' },
];

export const API_CALLS_OPTIONS = [
  { label: 'All API Calls', value: 'all_api_calls' },
  { label: 'Successful API Calls', value: 'successful_api_calls' },
  { label: 'Failed API Calls', value: 'failed_api_calls' },
];
export const CHART_TYPE = [
  { label: 'Line Chart', value: 'line_chart' },
  { label: 'Bar Chart', value: 'bar_chart' },
];

export const SEND_CURRENCY = [
  { label: 'Nigerian Naira', symbol: '₦', value: 'NGN', iso_2: 'NG' },
  { label: 'Ghanaian Cedi', symbol: '₵', value: 'GHS', iso_2: 'GH' },
  { label: 'Kenyan Shilling', symbol: 'ksh', value: 'KES', iso_2: 'ke' },
];

export const CONVERT_CURRENCY = [
  { label: 'United States Dollar', symbol: '$', value: 'USD', iso_2: 'US' },
  { label: 'Canadian Dollar', symbol: 'C$', value: 'CAD', iso_2: 'CA' },
  { label: 'British Pound Sterling', symbol: '£', value: 'GBP', iso_2: 'GB' },
  { label: 'Euro', symbol: '€', value: 'EUR', iso_2: 'EUR' },
];

export const ALL_CURRENCY = [
  { label: 'Nigerian Naira', symbol: '₦', value: 'NGN', iso_2: 'NG' },
  { label: 'Ghanaian Cedi', symbol: '₵', value: 'GHS', iso_2: 'GH' },
  { label: 'Kenyan Shilling', symbol: 'kes', value: 'KES', iso_2: 'ke' },
  { label: 'United States Dollar', symbol: '$', value: 'USD', iso_2: 'US' },
  { label: 'Canadian Dollar', symbol: 'C$', value: 'CAD', iso_2: 'CA' },
  { label: 'British Pound Sterling', symbol: '£', value: 'GBP', iso_2: 'GB' },
  { label: 'Euro', symbol: '€', value: 'EUR', iso_2: 'EUR' },
];

// ICONS
export const ICONS = {
  SearchIcon: '/images/icons/search.svg',
  CalendarSearch: '/images/icons/calendar-search.svg',
};

// TABS
export const OVERVIEW_TAB_ITEMS = [
  { label: 'Payments', id: 'payments' },
  { label: 'Data', id: 'data' },
];

export const DIRECT_DEBIT_TAB_ITEMS = [
  { label: 'Mandate', id: 'mandate' },
  { label: 'Transaction', id: 'transaction' },
];

export const PAYLINK_TAB_ITEMS = [
  { label: 'One Time', id: 'one-time' },
  { label: 'Direct Debit', id: 'direct-debit' },
];

export const BALANCE_TAB_ITEMS = [
  { label: 'All Balances', id: 'all_balances' },
  { label: 'Balance History', id: 'balance_history' },
];

// VARIANTS
export const RIGHT_TAB_SWITCH_VARIANT = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.5 },
};

export const LEFT_TAB_SWITCH_VARIANT = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
  transition: { duration: 0.5 },
};

// SCREEN
export const SCREEN_SIZES = {
  extraSmall: 320,
  small: 480,
  medium: 768,
  large: 1024,
  extraLarge: 1280,
};

export const PHONE_CODES = [
  { iso_2: 'NG', phone_code: '+234', value: '+234' },
  { iso_2: 'UG', phone_code: '+256', value: '+256' },
  { iso_2: 'KE', phone_code: '+254', value: '+254' },
  { iso_2: 'GH', phone_code: '+254', value: '+254' },
  { iso_2: 'ZM', phone_code: '+260', value: '+260' },
  { iso_2: 'SA', phone_code: '+966', value: '+966' },
  { iso_2: 'ZA', phone_code: '+27', value: '+27' },
];

export const COUNTRY_OPTIONS = [
  { iso_2: 'NG', label: 'Nigeria', value: 'nigeria' },
  { iso_2: 'UG', label: 'Uganda', value: 'uganda' },
  { iso_2: 'KE', label: 'Kenya', value: 'kenya' },
  { iso_2: 'GH', label: 'Ghana', value: 'ghana' },
  { iso_2: 'ZM', label: 'Zambia', value: 'zambia' },
  { iso_2: 'SA', label: 'Saudi Arabia', value: 'saudi-arabia' },
  { iso_2: 'ZA', label: 'South Africa', value: 'south-africa' },
];

export const ALL_COUNTRY_OPTIONS = [
  // { iso_2: "NG", label: "Nigeria", value: "Nigeria" },
  // { iso_2: "KE", label: "Kenya", value: "Kenya" },
  // { iso_2: "GH", label: "Ghana", value: "Ghana" },
  { iso_2: 'CA', label: 'Canada', value: 'canada' },
  { iso_2: 'US', label: 'United States', value: 'United States' },
  { iso_2: 'GB', label: 'United Kingdom', value: 'United Kingdom' },
];

export const EURO_COUNTRIES = [
  { name: 'Austria', iso2: 'AT' },
  { name: 'Belgium', iso2: 'BE' },
  { name: 'Cyprus', iso2: 'CY' },
  { name: 'Estonia', iso2: 'EE' },
  { name: 'Finland', iso2: 'FI' },
  { name: 'France', iso2: 'FR' },
  { name: 'Germany', iso2: 'DE' },
  { name: 'Greece', iso2: 'GR' },
  { name: 'Ireland', iso2: 'IE' },
  { name: 'Italy', iso2: 'IT' },
  { name: 'Latvia', iso2: 'LV' },
  { name: 'Lithuania', iso2: 'LT' },
  { name: 'Luxembourg', iso2: 'LU' },
  { name: 'Malta', iso2: 'MT' },
  { name: 'Netherlands', iso2: 'NL' },
  { name: 'Portugal', iso2: 'PT' },
  { name: 'Slovakia', iso2: 'SK' },
  { name: 'Slovenia', iso2: 'SI' },
  { name: 'Spain', iso2: 'ES' },
];

export const COUNTRY_CODES = [
  { label: 'Canada', value: 'CA', iso2: 'CA', iso3: 'CAN' },
  { label: 'United States', value: 'US', iso2: 'US', iso3: 'USA' },
  { label: 'United Kingdom', value: 'GB', iso2: 'GB', iso3: 'GBR' },
  { label: 'Singapore', value: 'SG', iso2: 'SG', iso3: 'SGP' },
  { label: 'Nigeria', value: 'NG', iso2: 'NG', iso3: 'NGA' },
  { label: 'Andorra', value: 'AD', iso2: 'AD', iso3: 'AND' },
  { label: 'Argentina', value: 'AR', iso2: 'AR', iso3: 'ARG' },
  { label: 'Austria', value: 'AT', iso2: 'AT', iso3: 'AUT' },
  { label: 'Australia', value: 'AU', iso2: 'AU', iso3: 'AUS' },
  { label: 'Belgium', value: 'BE', iso2: 'BE', iso3: 'BEL' },
  { label: 'Cyprus', value: 'CY', iso2: 'CY', iso3: 'CYP' },
  { label: 'Estonia', value: 'EE', iso2: 'EE', iso3: 'EST' },
  { label: 'Finland', value: 'FI', iso2: 'FI', iso3: 'FIN' },
  { label: 'France', value: 'FR', iso2: 'FR', iso3: 'FRA' },
  { label: 'Germany', value: 'DE', iso2: 'DE', iso3: 'DEU' },
  { label: 'Greece', value: 'GR', iso2: 'GR', iso3: 'GRC' },
  { label: 'Ireland', value: 'IE', iso2: 'IE', iso3: 'IRL' },
  { label: 'Italy', value: 'IT', iso2: 'IT', iso3: 'ITA' },
  { label: 'Latvia', value: 'LV', iso2: 'LV', iso3: 'LVA' },
  { label: 'Lithuania', value: 'LT', iso2: 'LT', iso3: 'LTU' },
  { label: 'Luxembourg', value: 'LU', iso2: 'LU', iso3: 'LUX' },
  { label: 'Malta', value: 'MT', iso2: 'MT', iso3: 'MLT' },
  { label: 'Netherlands', value: 'NL', iso2: 'NL', iso3: 'NLD' },
  { label: 'Portugal', value: 'PT', iso2: 'PT', iso3: 'PRT' },
  { label: 'Slovakia', value: 'SK', iso2: 'SK', iso3: 'SVK' },
  { label: 'Slovenia', value: 'SI', iso2: 'SI', iso3: 'SVN' },
  { label: 'Spain', value: 'ES', iso2: 'ES', iso3: 'ESP' },
  { label: 'China', value: 'CN', iso2: 'CN', iso3: 'CHN' },
  { label: 'Kenya', value: 'KE', iso2: 'KE', iso3: 'KEN' },
  { label: 'Ghana', value: 'GH', iso2: 'GH', iso3: 'GHA' },
];

export const BUSINESS_COUNTRY_OPTIONS = [
  { iso_2: 'NG', label: 'Nigeria', value: 'nigeria' },
  { iso_2: 'UG', label: 'Uganda', value: 'uganda' },
  { iso_2: 'KE', label: 'Kenya', value: 'kenya' },
  { iso_2: 'GH', label: 'Ghana', value: 'ghana' },
];

export const BUSINESS_TYPES = [
  { label: 'Agriculture', value: 'agriculture' },
  { label: 'E-Commerce', value: 'e-commerce' },
  { label: 'Education', value: 'education' },
  { label: 'Energy', value: 'energy' },
  { label: 'Fintech', value: 'fintech' },
  { label: 'Food & Entertainment', value: 'food-entertainment' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Logistics', value: 'logistics' },
];

export const BANK_LIST = [
  { label: '9 Payment Service Bank', value: '120001', path: '/images/banks/9mobile.png' },
  { label: 'Access Bank', value: '044', path: '/images/banks/access-bank-icon.png' },
  { label: 'Access Bank (Diamond)', value: '063', path: '/images/banks/access-bank-icon.png' },
  { label: 'Citibank Nigeria', value: '023', path: '/images/banks/citi-bank.png' },
  { label: 'Ecobank Nigeria', value: '050', path: '/images/banks/ecobank-icon.png' },
  { label: 'Fidelity Bank', value: '070', path: '/images/banks/fidelity-bank-icon.png' },
  { label: 'First Bank of Nigeria', value: '011', path: '/images/banks/first-bank-icon.png' },
  { label: 'First City Monument Bank', value: '214', path: '/images/banks/fcmb-bank-icon.png' },
  { label: 'Globus Bank', value: '103', path: '/images/banks/globus-bank-icon.jpeg' },
  { label: 'Guaranty Trust Bank', value: '058', path: '/images/banks/gtbank-icon.png' },
  { label: 'Heritage Bank', value: '030', path: '/images/banks/heritage-bank-icon.png' },
  { label: 'Jaiz Bank', value: '301', path: '/images/banks/jaiz-bank-icon.png' },
  { label: 'Keystone Bank', value: '082', path: '/images/banks/keystone.png' },
  { label: 'Kuda Bank', value: '090267', path: '/images/banks/kuda-bank-icon.png' },
  { label: 'Moniepoint MFB', value: '50515', path: '/images/banks/moniepoint.png' },
  { label: 'Opay (paycom)', value: '999992', path: '/images/banks/opay-icon.jpg' },
  { label: 'PalmPay', value: '999991', path: '/images/banks/palmpay.png' },
  { label: 'Paystack-Titan', value: '100039', path: '/images/banks/paystack-titan.png' },
  { label: 'Polaris Bank', value: '076', path: '/images/banks/polaris-bank.png' },
  { label: 'Providus Bank', value: '101', path: '/images/banks/providus-bank-icon.png' },
  { label: 'Rubies MFB', value: '125', path: '/images/banks/rubies-icon.png' },
  { label: 'Sparkle Microfinance Bank', value: '51310', path: '/images/banks/sparkle-icon.png' },
  { label: 'Stanbic IBTC Bank', value: '221', path: '/images/banks/stanbic-bank-icon.png' },
  {
    label: 'Standard Chartered Bank',
    value: '068',
    path: '/images/banks/standard-charter-bank-icon.png',
  },
  { label: 'Sterling Bank', value: '232', path: '/images/banks/sterling-bank-icon.png' },
  { label: 'Union Bank of Nigeria', value: '032', path: '/images/banks/union-bank-icon.png' },
  {
    label: 'United Bank For Africa',
    value: '033',
    path: '/images/banks/united-bank-africa-icon.png',
  },
  { label: 'Unity Bank', value: '215', path: '/images/banks/unity-bank-icon.png' },
  { label: 'VFD Microfinance Bank Limited', value: '566', path: '/images/banks/vfd.jpg' },
  { label: 'Wema Bank', value: '035', path: '/images/banks/wema.png' },
  { label: 'Zenith Bank', value: '057', path: '/images/banks/zenith-bank-icon.png' },
];

export const VERIFICATIONS = [
  { label: 'National Identification Number', value: 'nin' },
  { label: 'Virtual National Identification Number', value: 'vnin' },
  { label: 'Bank Verification Number', value: 'bvn' },
  { label: 'NUBAN', value: 'nuban' },
  { label: 'Phone Number', value: 'phone' },
  { label: 'Driver’s License', value: 'license' },
  { label: 'CAC Basic', value: 'cac' },
  { label: 'International Passport', value: 'passport' },
  { label: 'Credit Bureau', value: 'bureau' },
];

export const PAYLINK_PRODUCT_TYPE = [{ label: 'Checkout', value: 'oneTime' }];

export const DEBIT_TYPE = [
  { label: 'Recurring', value: 'recurring' },
  { label: 'One Time', value: 'onetime' },
];

export const ROLE_OPTIONS = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Operations', value: 'operate' },
  { label: 'User', value: 'user' },
  { label: 'Developer', value: 'dev' },
  { label: 'Customer support', value: 'customer' },
];

export const INFLOW_OUTFLOW_TABS = [
  { label: 'Inflow', id: 'inflow' },
  { label: 'Outflow', id: 'outflow' },
];

export const STATEMENT_TABS = [
  { label: 'Statement', id: 'statement' },
  { label: 'Links', id: 'link' },
];

export const APP_TYPE = [
  { label: 'Flick', value: 'Flick' },
  { label: 'Flick card', value: 'Flick card' },
  { label: 'Flick-sandbox', value: 'Flick-sandbox' },
];

export const STATEMENT_PERIODS = [
  { label: '1 day', value: '1 day' },
  { label: '3 days', value: '3 days' },
  { label: '7 days', value: '7 days' },
  { label: '14 days', value: '14 days' },
  { label: '1 month', value: '1 month' },
  { label: '2 months', value: '2 months' },
  { label: '3 months', value: '3 months' },
  { label: '4 months', value: '4 months' },
  { label: '5 months', value: '5 months' },
  { label: '6 months', value: '6 months' },
];

export const UNITED_KINGDOM_TRANSFER_TYPE = [
  { label: 'Faster Payment', value: 'fsp' },
  { label: 'CHAPS', value: 'chaps' },
];

export const UNITED_STATES_TRANSFER_TYPE = [
  { label: 'Fed Wire', value: 'fed_wire' },
  { label: 'ACH', value: 'ach' },
];

export const CANADA_TRANSFER_TYPE = [
  { label: 'Interac', value: 'interac' },
  { label: 'Wire', value: 'wire' },
];

export const UNITED_STATES_BANKS = [{ label: 'Wells Fargo', value: 'Wells Fargo' }];
