export interface IBalanceCard {
  iso: string;
  balance: number;
  label: string;
  bgColor: string;
  currencySymbol: string;
  currency?: string;
}

export interface IBalance {
  currency: string;
  collection_balance: number;
  payout_balance: number;
  api_balance: number;
}

export interface TableDataFilter {
  [key: string]: any;
  transactionid: string;
  eventname: string;
  transtype: string;
  total_amount: number;
  status: string;
  dated: string;
  email?: string;
}
