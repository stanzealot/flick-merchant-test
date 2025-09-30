export const API = {
  baseURL: process.env.NEXT_PUBLIC_LIVE_SERVER_URL1 as string,

  SLACK_FRONTEND_ERRORS_WEBHOOK: process.env
    .NEXT_PUBLIC_FRONTEND_SLACK_WEBHOOK_URL as string,
  NEXT_PUBLIC_KYC_LINK: process.env.NEXT_PUBLIC_KYC_LINK as string,
  routes: {
    authentication: {
      login: '/auth/login',
      recover: '/initiate-reset',
      signup: '/auth/signup',
      verifyAccount: '/auth/verify-email',
      resetPassword: '/change-password',
      merchantInfo: '/merchant-info',
    },

    overview: {
      balances: 'business/balances',
      transactions: '/business/transactions',
      nubanMerchant: '/nuban-create-merchant',
      transactionGraph: '/transaction-graph',
      addCurrency: '/merchant/add-currency',
      paymentCards: '/get-all-payment-card',
      createCharge: '/create-charge',
      charge: 'business/charge',
      verifyOtp: '/verify-otp',
      verifyPin: '/verify-pin',
      getEncryptionKey: '/get-encryption-key',
      merchantKyc: '/merchant-kyc',
      setLimit: '/set-low-limit',
      getIntentCode: '/get-intent-code',
      fundWalletLink: '/fund-wallet-link',
    },

    directDebit: {
      directDebits: '/direct-debit/list',
      mandateTransaction: '/direct-debit/mandate-transactions',
      mandateDetails: '/direct-debit/mandate-details',
    },

    paylinks: {
      oneTime: '/get-payment-pages',
      directDebitLinks: '/direct-debit/listLinks',
      createPaylink: '/create-payment-page',
      createDirectDebitLink: '/direct-debit/initialize-dashboard',
    },

    data: {
      identity: '/get-identity-record',
      accounts: '/get-accounts',
      dataTransactions: '/linked-transaction-data',
      singleTransaction: '/get-single-transaction',
      postIdentity: '/identity',
    },

    statement: {
      allStatements: '/linked-statements-data',
      statementLinks: '/get-job-pages',
    },

    topMenuService: {
      exchangeRate: '/otc-dash/exchange_rate',
      initiateExchange: '/otc-dash/initiate_exchange',
      completeExchange: '/otc-dash/complete_exchange',
      getBeneficiaries: '/merchant/get-beneficiary',
      getCountryCodes: '/merchant/get-countrycode',
      getBanks: '/banks',
      resolveAccount: '/name-enquiry',
      makePayout: '/payout',
      resendCode: '/resend-token',
      completePayout: '/complete-payout',
      completeForeignPayout: '/merchant/complete-payout',
      saveBeneficiary: '/merchant/save-beneficiary',
    },

    customers: {
      getMerchantCustomers: '/get-merchant-customers',
      getSingleCustomer: '/get-single-customer',
      getMerchantBusiness: '/get-all-businesses',
      getMerchantKycDetails: '/merchant-kyc-details',
    },

    profile: {
      updateProfile: '/update-profile',
      updateSecurity: '/security-settings',
      profileSettings: '/profile-settings',
      enableServices: '/enable-services',
      updateNotification: '/notification-settings',
      addSettlementAccount: '/add-settlement-account',
      settlementAccounts: '/settlement-account',
      getTeamMembers: '/get-all-team-members',
      createTeamMember: '/create-team-member',
      deleteTeamMember: '/remove-team-member',
      changeTeamMember: '/change-team-member-role',
      whitelistIpAddress: '/whitelist-ip-address',
      createLiveWebhook: '/create-webhook',
      getWebhook: '/get-webhook',
      accountTeamInvite: '/accept-team-invite',
      switchBusinessAccounts: '/activate-account',
      requestKeys: '/request-keys',
      revealKeys: '/reveal-keys',
      generateKeys: '/generate-live-keys',
      customization: '/checkout-customization',
    },
  },
  timeout: 45000,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'flick_auth_token',
  USER_DATA: 'flick_user_data',
  MERCHANT_KEY: 'flick_merchant_key',
  MERCHANT_CODE: 'flick_merchant_code',
  OTP_TOKEN: 'flick_otp_token',
};
