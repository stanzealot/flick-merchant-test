'use client';

import { Button } from 'antd';
import nookies from 'nookies';
import CopyButton from '@/src/components/blocks/copy-button';
import authentication from '@/src/app/api/services/authentication';
import { parseCookies } from 'nookies';
import { STORAGE_KEYS } from '@/src/utils/constants/api';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import { useSettingsStore } from '@/src/utils/store/settingsStore';
import DeveloperOtpModal from './DeveloperOtpModal';
import { useState } from 'react';

const ApiKeysPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [genLoading, setGenLoading] = useState<boolean>(false);
  const { openDeveloperOtpModal, setOpenDeveloperOtpModal, developerPayload, setDeveloperPayload } =
    useSettingsStore();
  const cookies = parseCookies();
  const token = cookies[STORAGE_KEYS.AUTH_TOKEN];
  const handleRevealKeys = async () => {
    setLoading(true);
    try {
      const response = await authentication.requestKeys({
        token,
      });

      if (response.status !== 200) {
        setLoading(false);
        return openGlobalNotification({
          type: 'error',
          message: 'An error occurred',
          description: '',
        });
      }

      setLoading(false);
      setOpenDeveloperOtpModal(true);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const generateKeys = async () => {
    setGenLoading(true);
    try {
      const response = await authentication.generateKeys({
        token,
      });

      if (!response.user) {
        setGenLoading(false);
        return openGlobalNotification({
          type: 'error',
          message: 'An error occurred',
          description: '',
        });
      }

      nookies.set(null, STORAGE_KEYS.MERCHANT_KEY, response.user.merchantKey, {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      // nookies.set(null, STORAGE_KEYS.MERCHANT_KEY, response.user.merchantKey);
      nookies.set(null, STORAGE_KEYS.AUTH_TOKEN, response.user.token);
      nookies.set(null, STORAGE_KEYS.MERCHANT_CODE, response.user.merchantCode);

      setDeveloperPayload({
        liveSecretKey: response.secretKey,
        livePublicEncKey: response.publicEncKey,
        livePublicKey: response.user.merchantKey,
        testPublicEncKey: '',
        testPublicKey: '',
        testSecretKey: '',
      });
      setGenLoading(false);
    } catch (error) {
      setGenLoading(false);
      console.error(error);
    }
  };
  return (
    <div className="w-full mt-4 grid grid-cols-2 pb-10">
      <div className="pr-8">
        <div className="border border-[#EAECF0] border-x-0 border-t-0 mb-5">
          <h1 className="text-sm font-medium mb-3">Live API keys</h1>
        </div>

        <div className="flex flex-col gap-6">
          <EachInput type="text" label="Public key" data={developerPayload.livePublicKey} />
          <EachInput
            type={`${developerPayload.liveSecretKey.length > 0 ? 'text' : 'password'} `}
            label="Secret key"
            data={developerPayload.liveSecretKey}
          />
          <EachInput
            type={`${developerPayload.livePublicEncKey.length > 0 ? 'text' : 'password'} `}
            label="Encryption key"
            data={developerPayload.livePublicEncKey}
          />

          <div className="flex items-center justify-between w-full">
            <Button
              loading={genLoading}
              onClick={generateKeys}
              className="border  !border-[#EAECF0] !w-[170px] !text-sm !h-12 !text-[#1A1A1A] hover:!text-white hover:!bg-primary-600"
            >
              Generate new keys
            </Button>
            <Button
              loading={loading}
              onClick={handleRevealKeys}
              type="primary"
              className="!border-none !w-[170px] !text-sm !h-12 !bg-primary-500 hover:!bg-primary-600"
            >
              Reveal keys
            </Button>
          </div>
        </div>
      </div>
      <div className="px-8 border border-r-0 border-[#EAECF0] border-y-0">
        <div className="border border-[#EAECF0] border-x-0 border-t-0 mb-5">
          <h1 className="text-sm font-medium mb-3">Test API keys</h1>
        </div>

        <div className="flex flex-col gap-6">
          <EachInput type="text" label="Public key" data={developerPayload.testPublicKey} />
          <EachInput
            type={`${developerPayload.testSecretKey.length > 0 ? 'text' : 'password'} `}
            label="Secret key"
            data={developerPayload.testSecretKey}
          />
          <EachInput
            type={`${developerPayload.testPublicEncKey.length > 0 ? 'text' : 'password'} `}
            label="Encryption key"
            data={developerPayload.testPublicEncKey}
          />

          <Button
            type="primary"
            className="!w-[170px] !text-sm !h-12 !bg-primary-500 hover:!bg-primary-600"
          >
            Generate new keys
          </Button>
        </div>
      </div>
      <DeveloperOtpModal isOpen={openDeveloperOtpModal} setIsOpen={setOpenDeveloperOtpModal} />
    </div>
  );
};

const EachInput = ({ type, label, data }: { type: string; label: string; data?: string }) => {
  return (
    <div>
      <label htmlFor="" className="block !mb-1 font-medium text-sm text-[#4D4D4D]">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          className="w-full border border-[#D0D5DD] rounded-md px-4 h-[45px] outline-none"
          placeholder="*********************************"
          value={data}
          disabled
        />
        {data && (
          <CopyButton
            message="Copied to clipboard"
            data={data}
            className="!absolute !top-3 !right-4"
          />
        )}
      </div>
    </div>
  );
};

export default ApiKeysPage;
