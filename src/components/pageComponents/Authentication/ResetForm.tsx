'use client';

import { Button } from 'antd';
import { IoMdArrowForward } from 'react-icons/io';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordValidationSchema } from '@/src/schema/validation/authentication';
import { useRouter, useParams } from 'next/navigation';
import { ResetPasswordData } from '@/src/schema/data/auth';
import { openGlobalNotification } from '../../blocks/toast-notification';
import { ROUTE_KEYS } from '@/src/utils/constants';
import authentication from '@/src/app/api/services/authentication';

const ResetForm = () => {
  const params = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
    // try {
    //     const payload = {
    //         password: data.password,
    //         confirmPassword: data.confirmPassword,
    //         token: String(params.token),
    //     };
    //     const response = await authentication.resetPassword(payload);
    //     if (response.message) {
    //         router.push(ROUTE_KEYS.LOGIN);
    //         return openGlobalNotification({
    //             type: "success",
    //             message: "Password updated",
    //             description: "Your password reset was successful",
    //         });
    //     } else {
    //         return openGlobalNotification({
    //             type: "error",
    //             message: "Password reset failed",
    //             description: response.msg,
    //         });
    //     }
    // } catch (error: any) {
    //     console.log(error);
    // }
  };

  return (
    <div className="p-[50px] flex flex-col items-center justify-center">
      <div className="min-w-[400px] mt-14">
        <div className="">
          <h1 className="text-[26px] font-semibold">Set new password</h1>
          <p className="text-[#666666] text-sm mt-1">
            Enter your new password to reset your password
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-7 flex flex-col gap-5">
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
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              register={register}
              errors={errors}
              required={true}
              placeholder="*************"
            />
          </div>

          <div className="mt-7">
            <Button
              htmlType="submit"
              loading={isSubmitting}
              icon={<IoMdArrowForward size={20} />}
              iconPosition="end"
              type="primary"
              className="w-full !rounded-3xl !h-[42px] hover:!bg-primary-600"
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetForm;
