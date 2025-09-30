"use client";

import BusinessForm from "@/src/components/pageComponents/Authentication/BusinessForm";
import OTPVerification from "@/src/components/pageComponents/Authentication/OTPVerification";
import SignUpForm from "@/src/components/pageComponents/Authentication/SignUpForm";
import useAuthenticationStore from "@/src/utils/store/authentication";

const SignupPage = () => {
    const { step } = useAuthenticationStore();

    return (
        <div>
            {step === 1 && <SignUpForm />}
            {step === 2 && <BusinessForm />}
            {step === 3 && <OTPVerification />}
        </div>
    );
};

export default SignupPage;
