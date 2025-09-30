'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
// import { FileWithPath } from 'react-dropzone';
import { Button, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import { COUNTRY_OPTIONS } from '@/src/utils/constants';
import SingleUpload from '@/src/components/blocks/single-upload';
import NewSelect from '@/src/components/ui-components/Select/NewSelect';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import useGetMerchantInfo from '@/src/app/api/hooks/authentication/useGetMerchantInfo';
import authentication from '@/src/app/api/services/authentication';
import { convertFileToBinary } from '@/src/utils/functions';

type ResponsibilityState = {
  customers: boolean;
  owner: boolean;
};

type SettlementState = {
  account: boolean;
  payout: boolean;
};

const ProfileInfo = () => {
  const { data, mutate } = useGetMerchantInfo();
  const [preview, setPreview] = useState<{ path: string }>({ path: '' });
  //   const [fileList, setFileList] = useState<FileWithPath>({} as FileWithPath);
  const [fileList, setFileList] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');

  const [feeResponsibility, setFeeResponsibility] = useState({
    customers: false,
    owner: false,
  });

  const [settlement, setSettlement] = useState({
    account: false,
    payout: false,
  });

  const handleCheckboxChange = (e: CheckboxChangeEvent, type: 'fee' | 'settlement'): void => {
    const { name, checked } = e.target;

    if (type === 'fee') {
      setFeeResponsibility((prev: ResponsibilityState) => ({
        customers: name === 'customers' ? checked : false,
        owner: name === 'owner' ? checked : false,
      }));
    } else if (type === 'settlement') {
      setSettlement((prev: SettlementState) => ({
        account: name === 'account' ? checked : false,
        payout: name === 'payout' ? checked : false,
      }));
    }
  };
  const validateImage = () => {
    if (!fileList) {
      setUploadError('Please select an image');
      return false;
    }
    setUploadError('');
  };

  useEffect(() => {
    if (fileList) {
      validateImage();
    }
  }, [fileList]);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (data) {
      const { business_name, business_email, phone, bizAddress, country, FPR, avatar } =
        data.data || {};
      setValue('business_name', business_name);
      setValue('business_email', business_email);
      setValue('bizPhone', phone);
      setValue('bizAddress', bizAddress);
      setValue('country', country);
      setPreview({ path: avatar || '' });
      setFeeResponsibility({
        customers: FPR?.customer || false,
        owner: FPR?.merchant || false,
      });
      setSettlement({
        account: data.data?.YPEM?.bankAccount || false,
        payout: data.data?.YPEM?.payoutBalance || false,
      });
    }
  }, [data, setValue]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await authentication.updateProfile({
        ...data,
        FPR: {
          customer: feeResponsibility.customers,
          merchant: feeResponsibility.owner,
        },
        YPEM: {
          bankAccount: settlement.account,
          payoutBalance: settlement.payout,
        },
        ...(imageUrl && { avatar: imageUrl }),
      });

      if (response.status !== 200) {
        return openGlobalNotification({
          message: 'Profile update failed',
          description: response.message,
          type: 'error',
        });
      }

      mutate();
      openGlobalNotification({
        message: 'Profile updated successfully',
        description: '',
        type: 'success',
      });
    } catch (error: any) {
      const errorMessage = error.message || JSON.stringify(error);
      console.log({ error });
      return openGlobalNotification({
        message: 'Profile update failed',
        description: errorMessage,
        type: 'error',
      });
    }
  };

  const formatCountry = COUNTRY_OPTIONS.map((country) => ({
    label: (
      <div className="grid grid-cols-[20px_auto] items-center gap-2">
        <div className="w-[20px] h-[20px] overflow-hidden rounded-full">
          <Image
            src={`/images/flags/${country.iso_2}.svg`}
            alt="image"
            width={1000}
            height={1000}
            style={{ transform: 'scale(1.5, 1.9)' }}
          />
        </div>
        <p className="text-[13px]">{country.label}</p>
      </div>
    ),
    value: country.label,
  }));

  const fileUpload = async (file: File) => {
    if (!file) return;

    const base64File = await convertFileToBinary(file);

    const formData = new FormData();
    const blob = new Blob([base64File]);
    formData.append('file', blob);

    try {
      const response = await fetch(
        'https://flick-payments-3623f34e4cf7.herokuapp.com/file-upload-test',
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (!result) {
        return openGlobalNotification({
          message: 'File upload failed',
          description: 'An error occurred while loading the file',
          type: 'error',
        });
      }

      setFileList(result.url);
      setImageUrl(result.url);

      return result;
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="w-full mt-4 grid grid-cols-[auto_240px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border border-[#EAECF0] border-l-0 border-y-0 pr-4">
          <div className="grid grid-cols-2 items-center gap-8">
            <NewInput
              id="business_name"
              label="Business name"
              name="business_name"
              type="text"
              register={register}
              errors={errors}
              disabled={true}
              placeholder="Enter name"
              labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
            />

            <NewInput
              id="business_email"
              label="Business email address"
              type="email"
              name="business_email"
              register={register}
              errors={errors}
              disabled={true}
              placeholder="business@email.com"
              labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
            />
            <NewInput
              id="bizPhone"
              label="Business phone number"
              name="bizPhone"
              type="text"
              register={register}
              errors={errors}
              placeholder="000 000 0000"
              labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
            />

            <NewInput
              id="bizAddress"
              name="bizAddress"
              label="Business address"
              type="text"
              register={register}
              errors={errors}
              placeholder="Enter business address"
              labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
            />

            <NewInput
              id="supportEmail"
              label="Support email address"
              type="email"
              name="supportEmail"
              register={register}
              errors={errors}
              placeholder="support@email.com"
              labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
            />

            <NewInput
              id="supportPhoneNumber"
              label="Support phone number"
              type="text"
              register={register}
              errors={errors}
              name="supportPhoneNumber"
              placeholder="000 000 0000"
              labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
            />

            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <NewSelect
                  {...field}
                  id="country"
                  name="country"
                  register={register}
                  errors={errors}
                  labelClass="!text-xs !font-semibold !text-[#4D4D4D]"
                  placeholder="Select country"
                  className="!h-[45px] !outline-none"
                  label="Country"
                  options={formatCountry}
                />
              )}
            />

            <Button
              loading={isSubmitting}
              htmlType="submit"
              type="primary"
              className="hover:!bg-primary-600 !h-[40px] !w-[150px] !text-[13px]"
            >
              Save changes
            </Button>
          </div>

          <div className="grid grid-cols-2 mt-8">
            <div className="border border-[#EAECF0] border-y-0 border-l-0 pr-4">
              <h1 className="font-semibold mb-4 text-[13px]">Fee payment responsibility?</h1>
              <div className="space-y-2 flex flex-col">
                <Checkbox
                  name="customers"
                  checked={feeResponsibility.customers}
                  className="!text-[11.5px]"
                  onChange={(e) => handleCheckboxChange(e, 'fee')}
                >
                  Make customers pay the transaction fees
                </Checkbox>
                <Checkbox
                  name="owner"
                  checked={feeResponsibility.owner}
                  className="!text-[11.5px]"
                  onChange={(e) => handleCheckboxChange(e, 'fee')}
                >
                  I (business owner) will pay the transaction fees
                </Checkbox>
              </div>
            </div>

            <div className="border border-[#EAECF0] border-y-0 border-l-0 pl-4">
              <h1 className="font-semibold mb-4 text-[13px]">Your preferred earnings method?</h1>
              <div className="space-y-2 flex flex-col">
                <Checkbox
                  name="account"
                  checked={settlement.account}
                  className="!text-[11.5px]"
                  onChange={(e) => handleCheckboxChange(e, 'settlement')}
                >
                  Settle to my bank account
                </Checkbox>
                <Checkbox
                  name="payout"
                  checked={settlement.payout}
                  className="!text-[11.5px]"
                  onChange={(e) => handleCheckboxChange(e, 'settlement')}
                >
                  Settle to my payout balance
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="px-5 flex flex-col items-center">
        <SingleUpload
          preview={preview}
          setPreview={setPreview}
          uploadError={uploadError}
          validate={validateImage}
          fileList={fileList}
          setFile={setFileList}
          onSubmit={fileUpload}
        />

        <Button
          htmlType="submit"
          type="primary"
          className="!mt-5 !mx-auto hover:!bg-primary-600 !h-[35px] !w-[120px] !text-[13px]"
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          Upload Logo
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
