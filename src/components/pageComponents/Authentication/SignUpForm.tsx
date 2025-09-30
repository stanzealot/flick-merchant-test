'use client';

import { Button } from 'antd';
import { IoMdArrowForward } from 'react-icons/io';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import { useEffect, useState } from 'react';
import useAuthenticationStore from '@/src/utils/store/authentication';
import { motion } from 'framer-motion';
import { ROUTE_KEYS } from '@/src/utils/constants';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidationSchema } from '@/src/schema/validation/authentication';
import { SignUpData } from '@/src/schema/data/auth';

const SignUpForm = () => {
  const { step, setStep, signUpData, setSignUpData } = useAuthenticationStore();
  const [selectedPhoneCode, setSelectedPhoneCode] = useState({
    iso_2: signUpData.phone_code?.iso_2 || 'NG',
    value: signUpData.phone_code?.value || '+234',
    phone_code: signUpData.phone_code?.code || '+234',
  });

  const RIGHT_TAB_SWITCH_VARIANT = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const LEFT_TAB_SWITCH_VARIANT = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: signUpData,
  });

  const onSubmit: SubmitHandler<SignUpData> = (data) => {
    const formattedData = {
      ...data,
      consent: true,
      phone_code: {
        iso_2: selectedPhoneCode.iso_2,
        code: selectedPhoneCode.phone_code,
        value: selectedPhoneCode.value,
      },
      phone: `${data.phone}`,
    };

    setSignUpData(formattedData);
    setStep(2);
  };

  useEffect(() => {}, [signUpData]);

  return (
    <div className="p-[50px] flex flex-col items-center justify-center">
      <motion.div
        variants={step === 1 ? RIGHT_TAB_SWITCH_VARIANT : LEFT_TAB_SWITCH_VARIANT}
        initial="hidden"
        animate="visible"
        className="max-w-[420px] mt-14"
      >
        <div className="">
          <h1 className="text-[26px] font-semibold">
            Get started with <span className="text-primary-600">Flick</span>
          </h1>
          <p className="text-[#666666] text-sm mt-1">Let&apos;s get to meet you first of all</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-7 flex flex-col gap-5">
            <NewInput
              id="name"
              name="name"
              label="Name"
              register={register}
              errors={errors}
              required={true}
              placeholder="Enter your name"
            />
            <NewInput
              id="business_email"
              name="business_email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
              required={true}
              placeholder="business@email.com"
            />
            <NewInput
              id="phone"
              name="phone"
              label="Phone"
              register={register}
              errors={errors}
              required={true}
              isPhone={true}
              selectedPhoneCode={selectedPhoneCode}
              onSelectPhoneCode={setSelectedPhoneCode}
              placeholder="000 0000 0000"
            />

            <div className="grid grid-cols-2 gap-5 items-center">
              <NewInput
                id="password"
                name="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                required={true}
                placeholder="*************"
              />
              <NewInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                register={register}
                errors={errors}
                required={true}
                placeholder="*************"
              />
            </div>
          </div>

          <div className="mt-10">
            <Button
              loading={isSubmitting}
              // disabled={!isValid}
              htmlType="submit"
              icon={<IoMdArrowForward size={20} />}
              iconPosition="end"
              type="primary"
              className={`w-full !rounded-3xl !h-[42px] ${
                isValid ? 'hover:!bg-primary-600' : '!bg-primary-400 !text-white'
              }`}
            >
              Continue
            </Button>

            <p className="text-secondary-600 mt-[32px] text-[13px] text-center">
              Already have an account?{' '}
              <Link href={ROUTE_KEYS.LOGIN} className="text-primary-600 font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
