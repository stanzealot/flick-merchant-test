export type LoginData = {
    business_email: string;
    password: string;
};

export type RecoverData = {
    email: string;
};

export type SignUpData = {
    name: string;
    business_email: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

export type BusinessData = {
    business_name: string;
    website?: string;
    referral_code?: string;
    business_type: string;
    consent?: boolean;
};

export type ResetPasswordData = {
    password: string;
    confirmPassword: string;
};

export type MerchantInfo = {
    business_Id: string;
    isVulaUser: boolean;
    lowLimit: number;
    avatar: string;
    vc_code: string;
    is_data: boolean;
    email: string;
    supportEmail: string;
    country: string;
    name: string;
    alias: string;
    bizAddress: string;
    password: string;
    business_type: string;
    is_identity_only: boolean;
    is_regular: boolean;
    id: string;
    phone: string;
    business_email: string;
    is_otc: boolean;
    isEmailVerified: boolean;
    is_payment: boolean;
    business_name: string;
    website: string;
    is_portco: boolean;
    businessId: number;
    FPR: string;
    is_tx: boolean;
    merchantCode: string;
    isVerified: boolean;
    is_vc: boolean;
    webhook_url: string;
    dated: string;
    YPEM: string;
    referral_code: string;
    settlementType: {
        settledType: string;
        fee: string;
    };
    supportPhone: string;
    isLive: boolean;
};
