'use client';

import { Button, Collapse, CollapseProps, Popover } from 'antd';
import React, { useEffect } from 'react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import CloseButton from '@/src/components/ui-components/Buttons/CloseButton';
import Drawer from '@/src/components/ui-components/Drawer';
import useOutflowStore from '@/src/utils/store/outflowStore';
import { foreignPayoutValidationSchema } from '@/src/schema/validation/topMenu';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import ImageIconWrap from '@/src/components/blocks/ImageIconWrap';
import { COUNTRY_CODES, EURO_COUNTRIES } from '@/src/utils/constants';
import NewSelect from '@/src/components/ui-components/Select/NewSelect';
import BackButton from '@/src/components/ui-components/Buttons/BackButton';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import useGetCountryCodes from '@/src/app/api/hooks/topMenuHooks/useGetCountryCodes';
import { HiMinusSm, HiOutlinePlus } from 'react-icons/hi';
import topMenuService from '@/src/app/api/services/topMenuService';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddForeignBeneficiaryDrawer: React.FC<Props> = (props: Props) => {
  const { setOpenPayout, foreignPayload, setForeignPayload, setOpenSuccess, setIsBeneficiary } =
    useOutflowStore();

  const { data } = useGetCountryCodes();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(foreignPayoutValidationSchema),
  });

  const formatCountries = (countries: { label?: string; name?: string; iso2: string }[]) =>
    countries.map(({ label, name, iso2 }) => ({
      label: (
        <div className="grid grid-cols-[20px_auto] items-center gap-2">
          <ImageIconWrap path={`/images/flags/${iso2}.svg`} className="!w-[20px] !h-[20px]" />
          <p className="text-[13px]">{label || name}</p>
        </div>
      ),
      value: iso2,
    }));

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <p className="text-sm"></p>,
      children: (
        <RecipientDetails
          control={control}
          register={register}
          errors={errors}
          countryCodes={formatCountries(COUNTRY_CODES)}
        />
      ),
    },
  ];

  const accountType = watch('account_type');

  const countryCodes = data?.data.countries ?? [];

  useEffect(() => {
    setValue('transfer_type', foreignPayload.transfer_type as string);
  }, [foreignPayload.transfer_type, setValue]);
  let formattedCountries;

  if (foreignPayload.transfer_type === 'sepa') {
    formattedCountries = formatCountries(EURO_COUNTRIES);
  } else if (foreignPayload.transfer_type === 'fps' || foreignPayload.transfer_type === 'chaps') {
    formattedCountries = formatCountries([{ label: 'United Kingdom', iso2: 'GB' }]);
  } else if (foreignPayload.transfer_type === 'interac' || foreignPayload.transfer_type === 'etf') {
    formattedCountries = formatCountries([{ label: 'Canada', iso2: 'CA' }]);
  } else if (foreignPayload.transfer_type === 'ach' || foreignPayload.transfer_type === 'fedwire') {
    formattedCountries = formatCountries([{ label: 'United States', iso2: 'US' }]);
  } else if (foreignPayload.transfer_type === 'wire' && foreignPayload.currency === 'EUR') {
    formattedCountries = formatCountries(
      countryCodes?.filter((country: { iso2: string }) => country.iso2 !== 'EUR')
    );
  } else if (foreignPayload.transfer_type === 'wire' && foreignPayload.currency === 'USD') {
    formattedCountries = formatCountries(
      countryCodes?.filter((country: { iso2: string }) => country.iso2 !== 'US')
    );
  } else if (foreignPayload.transfer_type === 'wire' && foreignPayload.currency === 'GBP') {
    formattedCountries = formatCountries([
      { label: 'Nigeria', iso2: 'NG' },
      { label: 'Kenya', iso2: 'KE' },
      ...EURO_COUNTRIES,
    ]);
  } else {
    formattedCountries = formatCountries(countryCodes);
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const {
        account_type,
        type,
        number,
        issuedCountryCode,
        issuedBy,
        issuedDate,
        expirationDate,
        birthDate,
        ...filteredData
      } = data;

      setForeignPayload(data);

      const response = await topMenuService.saveBeneficiary({
        ...filteredData,
        is_individual: accountType === 'true',
        recipient_kyc: {
          type,
          number,
          issuedCountryCode,
          issuedBy,
          issuedDate,
          expirationDate,
          birthDate,
        },
      });

      if (response.status !== 200) {
        return openGlobalNotification({
          description: response.message as string,
          message: 'Beneficiary save failed',
          type: 'error',
        });
      }

      setIsBeneficiary(true);
      props.setIsOpen(false);
      setOpenSuccess(true);
    } catch (error: any) {
      openGlobalNotification({
        description: error.message,
        message: 'Code resend failed',
        type: 'error',
      });
    }
  };

  return (
    <Drawer open={props.isOpen} closeIcon={null} onClose={() => props.setIsOpen(false)}>
      <div className="absolute top-5 left-5">
        <BackButton
          onClick={() => {
            props.setIsOpen(false);
            setOpenPayout(true);
          }}
        />
      </div>
      <div className="absolute top-5 right-5">
        <CloseButton
          onClick={() => {
            props.setIsOpen(false);
          }}
        />
      </div>
      <div className="mt-10">
        <div className="pb-8">
          <h1 className="text-[#101828] text-base font-semibold">Add Beneficiary</h1>
          <p className="text-[#475467] text-xs mt-1">
            Please provide the following details to add a new beneficiary.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="bg-[#F7FCFC] p-5 rounded-md ">
            <div className="flex flex-col gap-6">
              <div className="">
                <Controller
                  control={control}
                  name="beneficiary_country"
                  render={({ field }) => (
                    <NewSelect
                      {...field}
                      id="beneficiary_country"
                      name="beneficiary_country"
                      showSearch={false}
                      labelInValue={true}
                      value={field.value as unknown as string}
                      errors={errors}
                      placeholder="Select country"
                      className="!h-[40px] !outline-none"
                      label="Country*"
                      labelClass="!text-xs"
                      options={formattedCountries}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <NewInput
                  register={register}
                  errors={errors}
                  id="account_no"
                  name="account_no"
                  label="Account Number*"
                  labelCss="!text-xs"
                  inputCss="!h-[40px]"
                  placeholder="0000000000"
                />

                <NewInput
                  register={register}
                  errors={errors}
                  id="routing"
                  name="routing"
                  label="Routing Number*"
                  labelCss="!text-xs"
                  inputCss="!h-[40px]"
                  placeholder="0000000000"
                />
              </div>

              {foreignPayload.transfer_type !== 'wire' && (
                <div className="grid grid-cols-2 gap-5">
                  <NewInput
                    register={register}
                    errors={errors}
                    id="iban"
                    name="iban"
                    label="IBAN*"
                    labelCss="!text-xs"
                    inputCss="!h-[40px]"
                    placeholder="0000000000"
                  />

                  <NewInput
                    register={register}
                    errors={errors}
                    id="swift_code"
                    name="swift_code"
                    label="SWIFT/BIC*"
                    labelCss="!text-xs"
                    inputCss="!h-[40px]"
                    placeholder="0000000000"
                  />
                </div>
              )}

              <div>
                <Controller
                  control={control}
                  name="account_type"
                  render={({ field }) => (
                    <NewSelect
                      {...field}
                      id="account_type"
                      name="account_type"
                      showSearch={false}
                      labelInValue={true}
                      value={field.value as unknown as string}
                      errors={errors}
                      placeholder="Account Type"
                      className="!h-[40px] !outline-none"
                      label="Account Type*"
                      labelClass="!text-xs"
                      options={[
                        { label: 'Individual', value: 'true' },
                        { label: 'Business', value: 'false' },
                      ]}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                    />
                  )}
                />
              </div>

              <div className="">
                {accountType === 'true' && (
                  <div className="grid grid-cols-2 gap-5">
                    <NewInput
                      register={register}
                      errors={errors}
                      id="recipient_firstname"
                      name="recipient_firstname"
                      label="Recipient First Name*"
                      labelCss="!text-xs"
                      inputCss="!h-[40px]"
                      placeholder="0000000000"
                    />

                    <NewInput
                      register={register}
                      errors={errors}
                      id="recipient_lastname"
                      name="recipient_lastname"
                      label="Recipient Last Name*"
                      labelCss="!text-xs"
                      inputCss="!h-[40px]"
                      placeholder="0000000000"
                    />
                  </div>
                )}

                {accountType === 'false' && (
                  <div>
                    <NewInput
                      register={register}
                      errors={errors}
                      id="recipient_name"
                      name="recipient_name"
                      label="Recipient Name*"
                      labelCss="!text-xs"
                      inputCss="!h-[40px]"
                      placeholder="0000000000"
                    />
                  </div>
                )}
              </div>

              <NewInput
                register={register}
                errors={errors}
                id="beneficiary_name"
                name="beneficiary_name"
                label="Beneficiary's Account Name*"
                labelCss="!text-xs"
                inputCss="!h-[40px]"
                placeholder="0000000000"
              />

              <div className="grid grid-cols-[40%_auto] items-center w-full">
                <p className="text-xs text-[#4D4D4D]">Beneficiary Address</p>
                <div className="bg-[#D1D1D1] h-[1px] w-full"></div>
              </div>

              <NewInput
                register={register}
                errors={errors}
                id="beneficiary_address_1"
                name="beneficiary_address_1"
                label="Address*"
                labelCss="!text-xs"
                inputCss="!h-[40px]"
                placeholder="Enter address"
              />

              <div className="grid grid-cols-2 gap-5">
                <NewInput
                  register={register}
                  errors={errors}
                  id="beneficiary_city"
                  name="beneficiary_city"
                  label="City*"
                  labelCss="!text-xs"
                  inputCss="!h-[40px]"
                  placeholder="Enter city"
                />

                <NewInput
                  register={register}
                  errors={errors}
                  id="beneficiary_state"
                  name="beneficiary_state"
                  label="State*"
                  labelCss="!text-xs"
                  inputCss="!h-[40px]"
                  placeholder="Enter State"
                />
              </div>

              <Collapse
                className="payout"
                bordered={false}
                style={{ backgroundColor: 'transparent', padding: 0 }}
                accordion
                expandIcon={(panelProps) => {
                  return panelProps.isActive ? (
                    <div className="flex items-center">
                      <Button
                        icon={<HiMinusSm size={16} />}
                        className=" !text-xs !border-none !bg-white !text-primary-500 !pr-0"
                      >
                        Hide Details
                      </Button>
                      <Popover
                        content={<div className="text-xs">Recipient kyc is optional</div>}
                        trigger="hover"
                      >
                        <Button
                          className="!border-none"
                          icon={<IoIosInformationCircleOutline size={12} />}
                        />
                      </Popover>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Button
                        icon={<HiOutlinePlus size={16} />}
                        className="!text-xs !border-none !bg-white !text-primary-500 !pr-0"
                      >
                        Show Details
                      </Button>
                      <Popover
                        content={<div className="text-xs">Recipient kyc is optional</div>}
                        trigger="hover"
                      >
                        <Button
                          className="!border-none"
                          icon={<IoIosInformationCircleOutline size={12} />}
                        />
                      </Popover>
                    </div>
                  );
                }}
                expandIconPosition="start"
                items={items}
              />
            </div>
          </section>

          <div className="mt-7 flex items-center justify-between">
            <Button
              onClick={() => {
                props.setIsOpen(false);
                setOpenPayout(true);
              }}
              className="!h-[47px] !w-[150px] !border !border-[#EAECF0] !text-[#1A1A1A]"
            >
              Cancel
            </Button>

            <Button
              loading={isSubmitting}
              htmlType="submit"
              className="!border-none !outline-none !h-[47px] !w-[150px] !bg-primary-500 !text-white hover:!bg-primary-600"
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

const RecipientDetails = ({
  control,
  register,
  errors,
  countryCodes,
}: {
  control: any;
  register: any;
  errors: any;
  countryCodes?: any[];
}) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-2 gap-5 mt-5">
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <NewSelect
              {...field}
              id="type"
              name="type"
              showSearch={false}
              labelInValue={true}
              value={field.value as unknown as string}
              errors={errors}
              placeholder="Document Type"
              className="!h-[40px] !outline-none"
              label="Document Type"
              labelClass="!text-xs"
              options={[{ label: 'Passport', value: 'passport' }]}
              onChange={(e) => {
                field.onChange(e.value);
              }}
            />
          )}
        />

        <NewInput
          id="number"
          register={register}
          errors={errors}
          name="number"
          label="ID Number"
          labelCss="!text-xs"
          inputCss="!h-[40px]"
          placeholder="0000000000"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <NewInput
          id="issuedDate"
          name="issuedDate"
          register={register}
          errors={errors}
          label="Issued Date"
          labelCss="!text-xs"
          inputCss="!h-[40px]"
          isDate={true}
          placeholder="yyyy-mm-dd"
        />

        <NewInput
          id="expirationDate"
          name="expirationDate"
          register={register}
          errors={errors}
          label="Expiration Date"
          labelCss="!text-xs"
          inputCss="!h-[40px]"
          isDate={true}
          placeholder="yyyy-mm-dd"
        />
      </div>

      <div className="">
        <NewInput
          id="issuedBy"
          name="issuedBy"
          register={register}
          errors={errors}
          label="Issued By"
          labelCss="!text-xs"
          inputCss="!h-[40px]"
          placeholder="Enter name"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Controller
          control={control}
          name="issuedCountryCode"
          render={({ field }) => (
            <NewSelect
              {...field}
              id="issuedCountryCode"
              name="issuedCountryCode"
              showSearch={false}
              labelInValue={true}
              value={field.value as unknown as string}
              errors={errors}
              placeholder="Country code"
              className="!h-[40px] !outline-none"
              label="Country Code"
              labelClass="!text-xs"
              options={countryCodes}
              onChange={(e) => {
                field.onChange(e.value);
              }}
            />
          )}
        />
        <NewInput
          id="birthDate"
          name="birthDate"
          register={register}
          errors={errors}
          label="Birth Date"
          labelCss="!text-xs"
          inputCss="!h-[40px]"
          isDate={true}
          placeholder="yyyy-mm-dd"
        />
      </div>
    </div>
  );
};

export default AddForeignBeneficiaryDrawer;
