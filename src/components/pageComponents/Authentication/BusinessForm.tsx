'use client';

import Link from 'next/link';
import nookies from 'nookies';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import useAuthenticationStore, {
  SignUpDataStore,
} from '@/src/utils/store/authentication';
import NewSelect from '../../ui-components/Select/NewSelect';
import CountryDropdown from '../../blocks/country-dropdown';
import {
  BUSINESS_TYPES,
  COUNTRY_OPTIONS,
  ROUTE_KEYS,
} from '@/src/utils/constants';
import { businessValidationSchema } from '@/src/schema/validation/authentication';
import { BusinessData } from '@/src/schema/data/auth';
import { openGlobalNotification } from '../../blocks/toast-notification';
import { STORAGE_KEYS } from '@/src/utils/constants/api';
import authentication from '@/src/app/api/services/authentication';
import { getErrorMessage, hasError } from '@/src/utils/errorHandler';

const BusinessForm = () => {
  const { step, setStep, signUpData, setSignUpData } = useAuthenticationStore();
  const [selectedCountry, setSelectedCountry] = useState({
    iso_2: 'NG',
    value: 'Nigeria',
    label: 'Nigeria',
  });
  const [isChecked, setIsChecked] = useState(false);

  const RIGHT_TAB_SWITCH_VARIANT = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const LEFT_TAB_SWITCH_VARIANT = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(businessValidationSchema),
    defaultValues: signUpData,
  });

  useEffect(() => {}, [signUpData]);

  const onSubmit: SubmitHandler<BusinessData> = async (data) => {
    const apiPayload = {
      name: signUpData?.name,
      email: signUpData.business_email,
      password: signUpData.password,
      confirm_password: signUpData.password,
      business_name: data.business_name,
      business_type: data.business_type,
      phone: signUpData.phone,
      country: selectedCountry.value,
      business_website: data.website || 'getflick.app',
    };

    console.log('apiPayload: ', apiPayload);

    try {
      const response = await authentication.signup(apiPayload);

      console.log('response: ', response);
      // Check for different error response structures
      if (hasError(response)) {
        return openGlobalNotification({
          type: 'error',
          message: 'Account Creation Failed',
          description: getErrorMessage(response),
        });
      }
      // Only proceed to OTP if there's no error and we have verification code
      // nookies.set(null, STORAGE_KEYS.OTP_TOKEN, response.data.verificationCode);

      console.log('response: ', response);
      setStep(3);
      return openGlobalNotification({
        type: 'success',
        message: 'Account Created',
        description: 'Please verify your email with the OTP sent',
      });
    } catch (error) {
      console.log('Signup error:', error);

      // Handle different error structures
      const errorDescription =
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        'An error occurred while creating your account';

      return openGlobalNotification({
        type: 'error',
        message: 'Error',
        description: errorDescription,
      });
    }
  };

  return (
    <div className="p-[50px] flex flex-col items-center justify-center">
      <Button
        onClick={() => setStep(1)}
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
        className="min-w-[400px] mt-10"
      >
        <div className="">
          <h1 className="text-[26px] font-semibold">
            Let&apos;s get&apos;s to know your business
          </h1>
          <p className="text-[#666666] text-sm mt-1">
            Let&apos;s get to meet you first of all
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-7 flex flex-col gap-5">
            <NewInput
              id="business_name"
              name="business_name"
              label="Business Name"
              register={register}
              errors={errors}
              required={true}
              placeholder="Enter your business name"
            />

            <Controller
              control={control}
              name="business_type"
              render={({ field }) => (
                <NewSelect
                  {...field}
                  id="business_type"
                  name="business_type"
                  register={register}
                  errors={errors}
                  placeholder="Select your business type"
                  className="!h-[45px] !outline-none"
                  label="Business Type"
                  required={true}
                  options={BUSINESS_TYPES}
                />
              )}
            />

            <NewInput
              id="website"
              name="website"
              register={register}
              errors={errors}
              label="Business Website"
              placeholder="https//getflick.app"
            />

            <CountryDropdown
              id="country"
              inputLabel="Country"
              required={true}
              items={COUNTRY_OPTIONS}
              onSelectCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
            />

            <div className="w-full flex flex-row gap-3 items-center mb-2">
              <Checkbox
                onChange={(e: CheckboxChangeEvent) =>
                  setIsChecked(e.target.checked)
                }
                value={isChecked}
              >
                <p className="text-[13px]">
                  I consent to Flick&apos;s{' '}
                  <Link className="text-primary-500 font-normal" href="#!">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link className="text-primary-500 font-normal" href="#!">
                    Terms of Use
                  </Link>
                </p>
              </Checkbox>
            </div>
          </div>

          <div className="mt-4">
            <Button
              loading={isSubmitting}
              disabled={!isChecked}
              htmlType="submit"
              icon={<IoMdArrowForward size={20} />}
              iconPosition="end"
              type="primary"
              className={`w-full !rounded-3xl !h-[42px] ${
                isChecked
                  ? 'hover:!bg-primary-600'
                  : '!bg-primary-300 !text-white'
              }`}
            >
              Join Flick
            </Button>

            <p className="text-secondary-600 mt-[20px] text-[13px] text-center">
              Already have an account?{' '}
              <Link
                href={ROUTE_KEYS.LOGIN}
                className="text-primary-600 font-semibold"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BusinessForm;
