'use client';

import { Button, Divider } from 'antd';
import nookies from 'nookies';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next-nprogress-bar';
import { LiaUnlockAltSolid } from 'react-icons/lia';
import { FieldValues, useForm } from 'react-hook-form';
import { IoMdArrowForward } from 'react-icons/io';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import { inviteMemberValidation } from '@/src/schema/validation/authentication';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import { STORAGE_KEYS } from '@/src/utils/constants/api';
import { ROUTE_KEYS } from '@/src/utils/constants';
import authentication from '../../api/services/authentication';
import useUserDataStore from '@/src/utils/store/userStore';

const AccountTeamMember = () => {
  const router = useRouter();
  const params = useParams();
  const teamId = params.id;
  const { setUserData } = useUserDataStore();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(inviteMemberValidation),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await authentication.accountTeamInvite({
        fullName: data.fullName,
        password: data.password,
        confirmPassword: data.confirmPassword,
        encryptedTeamId: teamId,
      });

      if (!response.user) {
        return openGlobalNotification({
          type: 'error',
          message: response.msg,
          description: '',
        });
      }

      if (response.user) {
        setUserData({
          email: response.user.email,
          name: response.user.name,
          business_type: response.user.business_type,
          business_name: response.user.business_name,
          isVerified: response.user.isVerified,
          kycStatus: response.kycStatus,
          businessId: response.user.businessId,
          sla: response.sla,
        });

        nookies.set(null, STORAGE_KEYS.MERCHANT_KEY, response.user.merchantKey, {
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
        // nookies.set(null, STORAGE_KEYS.MERCHANT_KEY, response.user.merchantKey);
        nookies.set(null, STORAGE_KEYS.AUTH_TOKEN, response.user.token);
        nookies.set(null, STORAGE_KEYS.MERCHANT_CODE, response.user.merchantCode);

        openGlobalNotification({
          type: 'success',
          message: 'User invited successfully',
          description: 'User has been successfully invited to join your team',
        });

        reset();

        router.push(ROUTE_KEYS.OVERVIEW);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        background: "url('/images/account-setup.svg')",
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-8 rounded-xl max-w-[500px] w-[400px]">
          <div className="w-[70px] h-[70px] bg-[#F6F7F9] rounded-full mx-auto flex flex-col items-center justify-center">
            <Image src="/images/flick-logo.svg" alt="Logo" width={35} height={35} />
          </div>

          <div className="mt-5 mb-7">
            <h1 className="text-center text-[#1A1A1A] text-base font-semibold">
              Flick Account Setup
            </h1>
          </div>

          <Divider />

          <div className="flex flex-col gap-7">
            <NewInput
              id="fullName"
              name="fullName"
              label="Name"
              register={register}
              errors={errors}
              required={true}
              placeholder="Enter your name"
            />

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

            <Button
              loading={isSubmitting}
              htmlType="submit"
              icon={<IoMdArrowForward size={20} />}
              iconPosition="end"
              type="primary"
              className={`w-full !h-[46px] !bg-primary-500 hover:!bg-primary-600 !text-white`}
            >
              Continue
            </Button>

            <div className="flex items-center gap-2 text-[#8C8F97] text-sm mx-auto">
              <LiaUnlockAltSolid size={20} /> Secured by{' '}
              <Image src="/images/flick-full.svg" alt="logo" width={60} height={30} />
            </div>
          </div>
        </div>
      </form>

      <p className="text-white text-sm font-[300] mt-5">
        If you have any questions, contact{' '}
        <Link className="font-semibold" href="/">
          hello@getflick.app
        </Link>
      </p>
    </div>
  );
};

export default AccountTeamMember;
