'use client';

import { Button } from 'antd';
import nookies from 'nookies';
import { IoMdArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import { ROUTE_KEYS } from '@/src/utils/constants';
import { LoginData } from '@/src/schema/data/auth';
import { API, STORAGE_KEYS } from '@/src/utils/constants/api';
import { loginValidationSchema } from '@/src/schema/validation/authentication';
import { openGlobalNotification } from '../../blocks/toast-notification';
import useUserDataStore from '@/src/utils/store/userStore';
import authentication from '@/src/app/api/services/authentication';
import { getErrorMessage, hasError } from '@/src/utils/errorHandler';

const LoginForm = () => {
  const router = useRouter();
  const { setUserData } = useUserDataStore();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const apiPayload = {
      email: data.business_email,
      password: data.password,
    };

    try {
      const response = await authentication.login(apiPayload);

      if (hasError(response)) {
        return openGlobalNotification({
          type: 'error',
          message: 'Login Failed',
          description: getErrorMessage(response),
        });
      }
      if (response?.token && response?.user) {
        const userData = {
          ...response.user,
          token: response.token,
        };

        // Store in Zustand store
        setUserData(userData);

        // Store in localStorage
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);

        // Store in cookies for server-side (optional)
        nookies.set(null, STORAGE_KEYS.AUTH_TOKEN, response.token, {
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });

        openGlobalNotification({
          type: 'success',
          message: response.message || 'Login Successful',
          description: `Welcome back ${response.user.name}`,
        });

        reset();
        router.push(ROUTE_KEYS.GETTING_STARTED);
      }
    } catch (error: any) {
      openGlobalNotification({
        type: 'error',
        message: 'Login Error',
        description:
          error?.response?.data?.message || 'An error occurred during login',
      });
    }
  };
  return (
    <div className="p-[50px] flex flex-col items-center justify-center">
      <div className="min-w-[400px] mt-14">
        <div className="">
          <h1 className="text-[26px] font-semibold">
            We’re glad you’re back! 😊
          </h1>
          <p className="text-[#666666] text-sm mt-1">
            Welcome back chief, let’s keep the energy moving!
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-7 flex flex-col gap-5">
            <NewInput
              id="business_email"
              name="business_email"
              label="Email"
              type="email"
              register={register}
              required={true}
              errors={errors}
              placeholder="business@email.com"
            />

            <NewInput
              id="password"
              name="password"
              label="Password"
              type="password"
              register={register}
              required={true}
              errors={errors}
              placeholder="*************"
            />
          </div>

          <div className="flex mt-5 items-center justify-end">
            {/* <Checkbox onChange={(e) => setIsChecked(e.target.checked)} value={isChecked}>
                            <p className="text-[13px]">Remember me </p>
                        </Checkbox> */}
            <Link
              href={ROUTE_KEYS.FORGOT}
              className="text-primary-500 text-xs font-medium"
            >
              Reset Password
            </Link>
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
              Log in
            </Button>

            <p className="text-secondary-600 mt-[32px] text-[13px] text-center">
              Don&apos;t have an account?{' '}
              <Link
                href={ROUTE_KEYS.SIGN_UP}
                className="text-primary-600 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
