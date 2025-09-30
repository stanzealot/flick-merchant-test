export interface Transaction {
  id: string;
  eventname: string;
  transtype: string;
  total_amount: number;
  settled_amount: number;
  fee_charged: string;
  currency_settled: string;
  dated: string;
  status: string;
  initiator: string;
  type: string;
  transactionid: string;
  narration: string;
  balance_before: number;
  balance_after: number;
  channel: string;
  beneficiary_bank: string | null;
  email: string;
  dated_ago: string;
}

export interface TransactionsResponse {
  message: string;
  stats: {
    range: string;
    currency: string;
    total_inflow_amount: number;
    total_outflow_amount: number;
    total_transaction_no: string;
  };
  data: Transaction[];
}

export interface TransactionsFilter {
  startDate?: string;
  endDate?: string;
  status?: string[];
  type?: string[];
  currency?: string;
  limit?: number;
  page?: number;
}
