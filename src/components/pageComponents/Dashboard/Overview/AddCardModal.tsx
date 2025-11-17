'use client';

import Image from 'next/image';
import Modal from '@/src/components/ui-components/Modal';
import BackButton from '@/src/components/ui-components/Buttons/BackButton';
import useOverviewStore from '@/src/utils/store/overviewStore';
import { Button, Checkbox } from 'antd';
import { ChangeEvent, useState } from 'react';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import { FieldValues, useForm } from 'react-hook-form';
import {
  detectCardType,
  removeSpaces,
} from '@/src/utils/functions';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCardValidation } from '@/src/schema/validation/overview';
import overview from '@/src/app/api/services/overview';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import useGetBalances from '@/src/app/api/hooks/overview/useGetBalances';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function AddCardModal({ isOpen, setIsOpen }: Props) {
  const [cardNumber, setCardNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [cardType, setCardType] = useState<'visa-icon' | 'mastercard-icon' | null>(null);


  const { 
    fundPayload, 
    setOpenCardList,
    setOpenSuccessModal,
    setOpenFundPayout,
    setOpenPaymentMethod,
    setOpenAmountModal,
  } = useOverviewStore();

  const { mutate } = useGetBalances();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addCardValidation),
  });

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setCardType(detectCardType(rawValue));
    setCardNumber(formatCardNumber(rawValue));
    clearErrors('cardNumber');
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{2})(\d{1,2})/, '$1/$2')
      .slice(0, 5);
  };

  const handleExpiryDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length === 1 && parseInt(value, 10) > 1) {
      value = `0${value}`;
    }

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }

    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    if (expiryDate.length === 3 && value.length === 2) {
      setExpiryDate(value);
    } else {
      setExpiryDate(formatExpiryDate(value));
    }
    clearErrors('expiryDate');
  };

  const closeAllModals = () => {
    setIsOpen(false);
    setOpenCardList(false);
    setOpenFundPayout(false);
    setOpenPaymentMethod(false);
    setOpenAmountModal(false);
  };

  // const onSubmit = async (data: FieldValues) => {
  //   try {
  //     const response = await overview.charge({
  //       amount: Number(fundPayload?.amount) || 0,
  //       cardNumber: removeSpaces(data.cardNumber),
  //       cvv: data.cvv,
  //       cardDate: data.expiryDate,
  //       cardName: removeSpaces(data.cardName),
  //       transactionId: fundPayload?.transactionId,
  //     });

  //     if (response.statusCode !== 200) {
  //       return openGlobalNotification({
  //         description: response.message || 'Payment failed',
  //         message: 'Error',
  //         type: 'error',
  //       });
  //     }

  //     closeAllModals();
      
  //     openGlobalNotification({
  //       description: 'Your wallet has been funded successfully',
  //       message: 'Success',
  //       type: 'success',
  //     });

  //     setOpenSuccessModal(true);
      
  //     mutate();

  //     reset();
  //     setCardNumber('');
  //     setExpiryDate('');
  //     setCardType(null);
  //     setIsChecked(false);
  //   } catch (error) {
  //     console.log(error);
  //     openGlobalNotification({
  //       description: 'An error occurred while processing payment',
  //       message: 'Error',
  //       type: 'error',
  //     });
  //   }
  // };
  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await overview.charge({
        amount: Number(fundPayload?.amount) || 0,
        cardNumber: removeSpaces(data.cardNumber),
        cvv: data.cvv,
        cardDate: data.expiryDate,
        cardName: removeSpaces(data.cardName),
        transactionId: fundPayload?.transactionId,
      });
  
      console.log('Charge response:', response);
  
      // Check if response exists and has the expected data
      if (!response || !response.cardDetails) {
        return openGlobalNotification({
          description: response?.message || 'Payment failed',
          message: 'Error',
          type: 'error',
        });
      }
  
      closeAllModals();
      
      openGlobalNotification({
        description: 'Your wallet has been funded successfully',
        message: 'Success',
        type: 'success',
      });
  
      setOpenSuccessModal(true);
      
      mutate();
  
      reset();
      setCardNumber('');
      setExpiryDate('');
      setCardType(null);
      setIsChecked(false);
    } catch (error) {
      console.log(error);
      openGlobalNotification({
        description: 'An error occurred while processing payment',
        message: 'Error',
        type: 'error',
      });
    }
  };
  return (
    <Modal
      customWidth={470}
      closeIcon={null}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <BackButton
        onClick={() => {
          setIsOpen(false);
          setOpenCardList(true);
        }}
      />

      <div className="mt-4">
        <h1 className="text-sm font-medium text-[#101828]">
          Input Card Details
        </h1>
        <p className="text-[13px] text-[#475467]">
          Your card will be automatically debited.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-7 flex flex-col gap-7 mb-2">
          <div className="grid grid-cols-[auto_80px] gap-6 items-center">
            <NewInput
              register={register}
              errors={errors}
              id="cardName"
              name="cardName"
              placeholder="Enter card name"
              label="Name on card"
              labelCss="!text-xs"
              inputCss="!h-[44px] !rounded-[8px] !border-[#EAECF0] !border !text-[#344054] !text-base"
            />

            <div className="w-full relative">
              <label
                htmlFor="expiry"
                className="block mb-1 text-[#344054] text-[12px]"
              >
                Expiry
              </label>
              <input
                type="text"
                {...register('expiryDate')}
                placeholder="MM/YY"
                value={expiryDate}
                maxLength={5}
                className="tracking-widest !outline-none w-full !h-[44px] px-3 !rounded-[8px] !border-[#EAECF0] !border !text-[#344054] !text-base"
                onChange={handleExpiryDateChange}
              />
              {errors?.expiryDate?.message && (
                <p className="text-[10px] absolute bottom-[-14px] text-danger-500">
                  {errors?.expiryDate?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[auto_80px] gap-6 items-center">
            <div className="w-full relative">
              <label
                htmlFor="cardNumber"
                className="block mb-1 text-[#344054] text-[12px]"
              >
                Card number
              </label>

              {cardType && (
                <div className={`absolute top-[34px] left-3 h-[24px] w-[34px]`}>
                  <Image
                    src={`/images/icons/${cardType}.svg`}
                    width={40}
                    height={40}
                    alt="card type icon"
                  />
                </div>
              )}

              <input
                type="text"
                id="cardNumber"
                {...register('cardNumber')}
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                className={`${
                  cardType ? 'pl-14' : 'pl-3'
                } tracking-widest !outline-none w-full transition-all duration-300 ease-in-out !h-[44px] pr-3 !rounded-[8px] !border-[#EAECF0] !border !text-[#344054] !text-base`}
                maxLength={19}
                onChange={handleCardNumberChange}
              />
              {errors?.cardNumber?.message && (
                <p className="text-[10px] absolute bottom-[-14px] text-danger-500">
                  {errors?.cardNumber?.message}
                </p>
              )}
            </div>

            <div className="w-full relative">
              <label
                htmlFor="cvv"
                className="block mb-1 text-[#344054] text-[12px]"
              >
                CVV
              </label>
              <input
                type="password"
                {...register('cvv')}
                placeholder="***"
                maxLength={3}
                onChange={(e) => {
                  clearErrors('cvv');
                }}
                className="tracking-widest !outline-none w-full !h-[44px] px-3 !rounded-[8px] !border-[#EAECF0] !border !text-[#344054] !text-sm"
              />
              {errors?.cvv?.message && (
                <p className="text-[10px] absolute bottom-[-14px] text-danger-500">
                  {errors?.cvv?.message}
                </p>
              )}
            </div>
          </div>

          <Checkbox
            onChange={(e: CheckboxChangeEvent) =>
              setIsChecked(e.target.checked)
            }
            value={isChecked}
          >
            <p className="text-[12px]">
              Save card details for frequent transactions
            </p>
          </Checkbox>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <Button 
            onClick={() => {
              setIsOpen(false);
              setOpenCardList(true);
            }}
            className="!border !font-semibold !border-[#EAECF0] !h-[50px] !rounded-[12px] !w-[200px]"
          >
            Cancel
          </Button>
          <Button
            loading={isSubmitting}
            htmlType="submit"
            className="!bg-primary-500 hover:!bg-primary-700 border-none !font-semibold !h-[50px] !rounded-[12px]!text-sm !text-white !w-[200px]"
          >
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
}