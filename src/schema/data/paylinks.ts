export interface PaylinkValidation {
    amount?: string;
    currency_collected: string;
    currency_settled: string;
    customLink?: string;
    description?: string;
    pageName: string;
    redirectLink?: string;
    successmsg?: string;
    productType: string;
}

export interface DirectDebitLinkValidation {
    amount?: string;
    charge_date?: string;
    currency?: string;
    pagename: string;
    type: string;
    frequency?: string;
    no_of_accounts?: string;
    is_open_banking?: boolean;
}

export type BeneficiaryData = {
    beneficiary_name: string;
    account_no: string;
    bank_name: string;
};
