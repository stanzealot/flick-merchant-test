'use client';

import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import nookies, { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import useAuthenticationStore from '@/src/utils/store/authentication';
import CustomIcon from '../../blocks/CustomIcon';
import OTPInput from '../../blocks/otp-Input';
import { ROUTE_KEYS } from '@/src/utils/constants';
import { API, STORAGE_KEYS } from '@/src/utils/constants/api';
import useUserDataStore from '@/src/utils/store/userStore';
import authentication from '@/src/app/api/services/authentication';
import { openGlobalNotification } from '../../blocks/toast-notification';

const OTPVerification = () => {
  const { setUserData } = useUserDataStore();
  const cookies = parseCookies();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otpToken = cookies[STORAGE_KEYS.OTP_TOKEN];

  const { step, setStep, signUpData } = useAuthenticationStore();
  const [otp, setOtp] = useState('');

  const RIGHT_TAB_SWITCH_VARIANT = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const LEFT_TAB_SWITCH_VARIANT = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const payload = {
        email: signUpData.business_email,
        otp: otp,
      };

      const response = await authentication.verifyAccount(payload);
      if (response?.error) {
        setIsSubmitting(false);
        return openGlobalNotification({
          type: 'error',
          message: 'OTP verification failed',
          description: response.message || 'Invalid OTP',
        });
      }

      // Success - user is now logged in
      if (response?.token && response?.user) {
        const userData = {
          ...response.user,
          token: response.token,
        };

        // Store in Zustand store
        setUserData(userData);

        // Store in localStorage (like in login)
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);

        // Store in cookies for server-side access (optional)
        nookies.set(null, STORAGE_KEYS.AUTH_TOKEN, response.token, {
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });

        openGlobalNotification({
          type: 'success',
          message: response.message || 'Login successful',
          description: `Welcome ${response.user.name}`,
        });

        router.push(ROUTE_KEYS.GETTING_STARTED);
      }
    } catch (error: any) {
      setIsSubmitting(false);
      openGlobalNotification({
        type: 'error',
        message: 'Verification Error',
        description: error?.response?.data?.message || 'An error occurred',
      });
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      onSubmit();
    }
  }, [otp.length, otp]);

  useEffect(() => {}, [signUpData]);

  return (
    <div className="p-[50px] flex flex-col items-center justify-center">
      <Button
        onClick={() => setStep(2)}
        className="!absolute top-8 left-5 !border-none !text-xs custom-shadow"
        icon={<IoMdArrowBack size={17} />}
        iconPosition="start"
      >
        Go back
      </Button>

      <motion.div
        variants={
          step === 1 ? RIGHT_TAB_SWITCH_VARIANT : LEFT_TAB_SWITCH_VARIANT
        }
        initial="hidden"
        animate="visible"
        className="max-w-[400px] mt-10"
      >
        <div className="">
          <CustomIcon
            path={'/images/icons/email-flick-icon.svg'}
            className="w-20"
          />
          <h1 className="text-[26px] font-semibold mt-8">Verify your email</h1>
          <p className="text-[#666666] text-sm mt-1">
            A verification code has been sent to <br />{' '}
            <span className="text-secondary-900 font-medium">
              {signUpData?.business_email}
            </span>
            , please enter below to verify your account.
          </p>

          <OTPInput
            autoFocus
            isNumberInput
            length={6}
            className="mt-10 mx-auto space-x-1 flex justify-between"
            inputClassName={`w-[50px] lg:w-[55px] h-[50px] lg:h-[55px] rounded-full border-secondary-300 !bg-white focus:outline-none focus:border-primary-500 focus:border-b-4 text-center text:xl lg:text-2xl font-semibold`}
            onChangeOTP={(otp) => {
              setOtp(otp);
            }}
          />

          <Button
            loading={isSubmitting}
            disabled={otp.length < 6}
            onClick={() => {
              onSubmit();
            }}
            iconPosition="end"
            type="primary"
            className={`!mt-10 w-full !rounded-3xl !h-[45px] ${
              otp.length === 6
                ? 'hover:!bg-primary-600'
                : '!bg-primary-300 !text-white'
            }`}
          >
            Confirm verification
          </Button>

          <p className="text-secondary-600 mt-[20px] text-[13px] text-center">
            Didn&apos;t get the code?{' '}
            <button
              className="text-primary-600 font-semibold"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Resend
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
