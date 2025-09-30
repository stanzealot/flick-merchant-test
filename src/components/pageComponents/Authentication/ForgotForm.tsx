'use client';

import { Button } from 'antd';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoMdArrowForward } from 'react-icons/io';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import { ROUTE_KEYS } from '@/src/utils/constants';
import { RecoverData } from '@/src/schema/data/auth';
import { openGlobalNotification } from '../../blocks/toast-notification';
import { recoverValidationSchema } from '@/src/schema/validation/authentication';
import authentication from '@/src/app/api/services/authentication';

const ForgotForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(recoverValidationSchema),
  });

  const onSubmit: SubmitHandler<RecoverData> = async (data) => {
    return openGlobalNotification({
      type: 'success',
      message: 'Recovery Link Sent',
      description: `We've sent a recovery link to ${data.email}. Please check your inbox to proceed with the password recovery.`,
    });
    // try {
    //     const response = await authentication.recover(data);

    //     if (response.message === "Email not found") {
    //         return openGlobalNotification({
    //             type: "error",
    //             message: "Email Not Found",
    //             description: `We couldn't find an account associated with ${data.email}. Please double-check the email address and try again.`,
    //         });
    //     } else {
    //         reset();
    //         return openGlobalNotification({
    //             type: "success",
    //             message: "Recovery Link Sent",
    //             description: `We've sent a recovery link to ${data.email}. Please check your inbox to proceed with the password recovery.`,
    //         });
    //     }
    // } catch (error: any) {
    //     console.log(error);
    // }
  };

  return (
    <div className="p-[50px] flex flex-col items-center justify-center">
      <div className="min-w-[380px] mt-20">
        <div className="">
          <h1 className="text-[26px] font-semibold">
            Oops! You forgot your <br /> password 🙁
          </h1>
          <p className="text-[#666666] text-sm mt-1">
            Enter your email address to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-7 flex flex-col gap-5">
            <NewInput
              id="email"
              name="email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
              required={true}
              placeholder="business@email.com"
            />
          </div>

          <div className="mt-7">
            <Button
              loading={isSubmitting}
              disabled={!isValid}
              htmlType="submit"
              icon={<IoMdArrowForward size={20} />}
              iconPosition="end"
              type="primary"
              className={`w-full !rounded-3xl !h-[42px] ${
                isValid
                  ? 'hover:!bg-primary-600'
                  : '!bg-primary-400 !text-white'
              }`}
            >
              Recover password
            </Button>

            <p className="text-secondary-600 mt-[32px] text-[13px] text-center">
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
      </div>
    </div>
  );
};

export default ForgotForm;
