'use client';

import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { FaAsterisk } from 'react-icons/fa6';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { IoMdArrowBack } from 'react-icons/io';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import NewSelect from '@/src/components/ui-components/Select/NewSelect';
import { ROLE_OPTIONS } from '@/src/utils/constants';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import { STORAGE_KEYS } from '@/src/utils/constants/api';
import useGetTeamMembers from '@/src/app/api/hooks/authentication/useGetTeamMembers';
import authentication from '@/src/app/api/services/authentication';

const CreateTeamPage = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies[STORAGE_KEYS.AUTH_TOKEN];
  const { mutate } = useGetTeamMembers();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await authentication.createTeamMember({
        token,
        teamMemberEmail: data.teamMemberEmail,
        teamMemberRole: data.teamMemberRole,
      });

      if (response.status !== 200) {
        return openGlobalNotification({
          message: 'Team member invite failed',
          description: '',
          type: 'error',
        });
      }

      mutate();
      router.back();
      openGlobalNotification({
        message: `Invitation sent to ${data.teamMemberEmail}`,
        description: '',
        type: 'success',
      });
    } catch (error: any) {
      const errorMessage = error.message || JSON.stringify(error);
      console.log({ error });

      return openGlobalNotification({
        message: 'Team member invite failed',
        description: errorMessage,
        type: 'error',
      });
    }
  };

  return (
    <div>
      <Button
        onClick={() => router.back()}
        className="!border-none !text-xs custom-shadow"
        icon={<IoMdArrowBack size={17} />}
        iconPosition="start"
      >
        Go back
      </Button>

      <div className="border border-t-0 border-x-0 border-[#EAECF0] py-5 mt-2">
        <h1 className="text-sm font-semibold text-secondary-900">Send an invite to new members</h1>
        <p className="text-secondary-400 text-xs mt-1 font-normal">
          Enter the email address of the user you want to invite, and choose the role they should
          have.
        </p>
      </div>

      <div className="grid grid-cols-2 mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 pr-5">
            <NewInput
              id="teamMemberEmail"
              label="Email address"
              name="teamMemberEmail"
              type="text"
              register={register}
              errors={errors}
              inputCss=""
              placeholder="example@email.com"
              labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
            />

            <Controller
              control={control}
              name="teamMemberRole"
              render={({ field }) => (
                <NewSelect
                  {...field}
                  id="teamMemberRole"
                  name="teamMemberRole"
                  labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                  register={register}
                  errors={errors}
                  placeholder="Select role"
                  className="!h-[42px] !outline-none"
                  label="Role"
                  required={false}
                  options={ROLE_OPTIONS}
                />
              )}
            />
            <Button
              loading={isSubmitting}
              htmlType="submit"
              type="primary"
              className="hover:!bg-primary-600 !h-[40px] !w-[120px] !text-[13px]"
            >
              Continue
            </Button>
          </div>
        </form>

        <div className="border border-[#EAECF0] border-y-0 border-r-0 px-5 py-2">
          <h1 className="text-sm font-semibold text-secondary-900">Role descriptions</h1>
          <div className="mt-3 flex flex-col gap-7">
            <div className="bg-[#F7FDFC] px-4 rounded-lg grid grid-cols-[20px_auto] gap-3 py-4">
              <FaAsterisk className="text-[#1A1A1A] text-lg" />
              <p className="text-[13px] text-[#8C8F97] leading-7">
                <span className="font-medium text-[#1A1A1A]">Admin - </span>an executive team member
                that will require full <br /> admin access.{' '}
                <Link href="#!" className="!text-primary-600">
                  View permissions
                </Link>
              </p>
            </div>

            <div className="bg-[#F7FDFC] px-4 rounded-lg grid grid-cols-[20px_auto] gap-3 py-4">
              <FaAsterisk className="text-[#1A1A1A] text-lg" />
              <p className="text-[13px] text-[#8C8F97] leading-7">
                <span className="font-medium text-[#1A1A1A]">Operations - </span>customer and
                beneficiary lists, and can manage <br /> transfers.{' '}
                <Link href="#!" className="!text-primary-600">
                  View permissions
                </Link>
              </p>
            </div>

            <div className="bg-[#F7FDFC] px-4 rounded-lg grid grid-cols-[20px_auto] gap-3 py-4">
              <FaAsterisk className="text-[#1A1A1A] text-lg" />
              <p className="text-[13px] text-[#8C8F97] leading-7">
                <span className="font-medium text-[#1A1A1A]">Customer support - </span>access and
                permission to perform actions like <br />
                refunds, and dispute resolutions.{' '}
                <Link href="#!" className="!text-primary-600">
                  View permissions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamPage;
