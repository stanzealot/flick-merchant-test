'use client';

import dayjs from 'dayjs';
import nookies from 'nookies';
import { Button, Skeleton } from 'antd';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/src/components/ui-components/Modal';
import { CiSearch } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa6';
import { LuPlus } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import { ROUTE_KEYS } from '@/src/utils/constants';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import useUserDataStore from '@/src/utils/store/userStore';
import { STORAGE_KEYS } from '@/src/utils/constants/api';
import useAuthenticationStore from '@/src/utils/store/authentication';
import authentication from '@/src/app/api/services/authentication';
import useGetMerchantBusinesses from '@/src/app/api/hooks/customers/useGetMerchantBusinesses';
import useGetMerchantInfo from '@/src/app/api/hooks/authentication/useGetMerchantInfo';
import { getErrorMessage, hasError } from '@/src/utils/errorHandler';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

interface BusinessData {
  business_name: string;
  dated: string;
  merchantCode: string;
}

const BusinessModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const { setIsBusinessSwitching } = useAuthenticationStore();
  const { setUserData } = useUserDataStore();
  const { data, isLoading } = useGetMerchantBusinesses();
  const { data: merchantData, isLoading: merchantLoading } =
    useGetMerchantInfo();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<BusinessData[]>([]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort(
        (a, b) => dayjs(a.dated).unix() - dayjs(b.dated).unix()
      );
      setFilteredItems(sortedData);
    }
  }, [data]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data?.data?.filter((item: BusinessData) =>
      item.business_name.toLowerCase().includes(query)
    );
    setFilteredItems(filtered || data?.data || []);
  };

  const handleAccountSelection = async (business: BusinessData) => {
    setIsBusinessSwitching(true);
    try {
      const response = await authentication.switchBusinessAccounts({
        merchantCode: business.merchantCode,
      });
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
        setUserData(userData);
      }

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
        message: 'Business switch Successful',
        description: '',
      });
      setIsBusinessSwitching(false);
      window.location.reload();
    } catch (error) {
      console.error('Business switch failed', error);
    } finally {
      setIsBusinessSwitching(false);
    }
  };

  return (
    <Modal
      customWidth={380}
      closeIcon={null}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      {isLoading || merchantLoading ? (
        <div className="mb-6 px-3 pt-5">
          <Skeleton.Input active className="w-full h-[50px] rounded-lg" />
          <div className="mt-7">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton.Button
                key={Number(index)}
                active
                className="w-full h-[60px] mb-3"
              />
            ))}
          </div>
        </div>
      ) : data?.data?.length > 0 ? (
        <div className="mb-6 px-3 pt-5">
          <div className="relative">
            <input
              onChange={handleSearch}
              value={searchQuery}
              type="text"
              placeholder="Search for business"
              className="w-full h-[50px] border border-gray-200 focus:border-primary-500 outline-none rounded-lg px-4"
            />
            <CiSearch
              className="absolute right-4 top-4 text-gray-500"
              size={20}
            />
          </div>

          {searchQuery && filteredItems.length === 0 ? (
            <div className="mt-5 text-center text-gray-500">
              No results found for{' '}
              <span className="font-semibold">{searchQuery}</span>
            </div>
          ) : (
            <div className="mt-7 flex flex-col gap-3 h-72 overflow-y-scroll custom-scrollbar">
              {filteredItems.map((item, index) => (
                <motion.button
                  onClick={() => {
                    handleAccountSelection(item);
                    setIsOpen(false);
                  }}
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`flex items-center justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-4 rounded-xl ${
                    merchantData?.data?.business_name === item.business_name
                      ? 'text-primary-500'
                      : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="font-semibold rounded-full h-11 w-11 flex items-center justify-center bg-gray-100 border border-gray-300">
                      {item.business_name[0]}
                    </div>
                    <div className="ml-3">
                      <h1
                        className={`font-semibold text-base ${
                          merchantData?.data?.business_name ===
                          item.business_name
                            ? 'text-primary-500'
                            : 'text-gray-700'
                        }`}
                      >
                        {item.business_name}
                      </h1>
                      <p className="text-gray-500 text-xs text-left">
                        Business
                      </p>
                    </div>
                  </div>
                  {merchantData?.data?.business_name === item.business_name && (
                    <Button
                      icon={<FaCheck size={15} />}
                      className="!border-none !rounded-[8px] !h-[40px] !w-[40px] !text-primary-500 !font-semibold"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 mb-6 px-7 pt-5 text-center">
          <Image
            src="/images/icons/business-empty-state.svg"
            alt="No Business Icon"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h1 className="mt-7 text-gray-900 font-semibold text-xs">
            No New Business yet
          </h1>
          <p className="text-gray-500 text-xs">Click to add a new business.</p>
        </div>
      )}

      <div className="!mt-7">
        <Button
          disabled={filteredItems?.length === 0}
          icon={<LuPlus size={20} />}
          className={`${
            filteredItems?.length === 0
              ? '!bg-primary-300'
              : '!bg-primary-500 hover:!bg-primary-700'
          } !w-full !text-sm !h-[50px] !text-white !border-none`}
          onClick={() => {
            setIsOpen(false);
            router.push(ROUTE_KEYS.BUSINESS);
          }}
        >
          Add new Business
        </Button>
      </div>
    </Modal>
  );
};

export default BusinessModal;
