'use client';

import {
  HEADER_NAV_DROPDOWNS,
  ROUTE_KEYS,
  ROUTE_LABELS,
} from '@/src/utils/constants';
import useAppStore from '@/src/utils/store';
import { Layout, Button, Tooltip } from 'antd';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import CustomDropdown from '../../ui-components/CustomDropdown';
import { IoIosArrowDown } from 'react-icons/io';
import Switch from '../../ui-components/Switch';
import { LiaFileAlt } from 'react-icons/lia';
import { GoBellFill } from 'react-icons/go';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import useOutflowStore from '@/src/utils/store/outflowStore';
import useGetMerchantInfo from '@/src/app/api/hooks/authentication/useGetMerchantInfo';
import Link from 'next/link';

export default function Header() {
  const { pageTitle } = useAppStore();
  const {
    setAction,
    setOpenConvert,
    setOpenNotification,
    setOpenDirectDebitDrawer,
    setOpenPaylinkDrawer,
  } = useTopMenuStore();
  const { setOpenPayout, setWhere, setOpenFlickAccountDrawer } =
    useOutflowStore();
  const pathname = usePathname();
  const [openMoveMoney, setOpenMoveMoney] = useState(false);
  const [isLive, setIsLive] = useState<boolean>(false);

  // const { data, isLoading } = useGetMerchantInfo();

  const routerLabel = useMemo(() => {
    return pageTitle || ROUTE_LABELS[pathname];
  }, [pageTitle, pathname]);

  const handleActionClick = (action: string) => {
    setAction(action);
    if (action === 'convert') {
      setOpenConvert(true);
    }
    if (action === 'direct-debit') {
      setOpenDirectDebitDrawer(true);
    }
    if (action === 'paylink') {
      setOpenPaylinkDrawer(true);
    }
    if (action === 'payout') {
      setWhere('top-menu');
      setOpenPayout(true);
    }
    if (action === 'flick-transfer') {
      setOpenFlickAccountDrawer(true);
    }
    setOpenMoveMoney(false);
  };

  return (
    <Layout.Header className="header !flex !justify-end">
      <div className="mr-0 ml-auto flex items-center gap-4">
        {/* <CustomDropdown
          actionChildren={
            <Button className="!rounded-full !text-sm !text-[#344054] !font-semibold !h-[40px] !px-4 !border focus:!text-primary-600 focus:!border-primary-600 hover:!text-primary-600 hover:!border-primary-600 !outline-none flex items-center custom-shadow">
              Move money <IoIosArrowDown className="text-base ml-4" />
            </Button>
          }
          onOpenChange={setOpenMoveMoney}
          open={openMoveMoney}
          renderChildren={
            <div className="custom-shadow px-2 py-2 rounded-lg w-[220px] bg-white flex flex-col gap-1">
              {HEADER_NAV_DROPDOWNS.map((item, index) => (
                <button
                  key={Number(index)}
                  onClick={() => handleActionClick(item.value)}
                  className="px-3 py-2 text-sm text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-sm w-full text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          }
        /> */}
        <Link target="_blank" href={ROUTE_KEYS.API_DOCS}>
          <Button className="!rounded-full !text-sm !text-[#344054] !font-semibold !h-[40px] !px-4 !border focus:!text-primary-600 focus:!border-primary-600 hover:!text-primary-600 hover:!border-primary-600 !outline-none flex items-center custom-shadow">
            <LiaFileAlt className="text-base" /> API Docs
          </Button>
        </Link>

        <div className="px-4 flex items-center gap-3 border border-y-0 border-[#EAECF0] w-auto h-[40px]">
          <>
            <Switch checked={isLive} onChange={() => setIsLive(!isLive)} />
            <p
              className={`text-sm font-medium ${
                isLive ? 'text-primary-500' : 'text-secondary-500'
              }`}
            >
              {isLive ? 'Live Mode' : 'Test Mode'}
            </p>
          </>
          {/* {!isLoading && data?.data?.business_Id && data?.data?.business_Id !== '' ? (
          ) : (
            <Tooltip
              placement="top"
              color="white"
              title={'Your business is in Test mode. Complete KYC to enable live transactions'}
            >
              <Button className="!border !border-[#EAECF0] !text-xs !rounded-3xl">Test mode</Button>
            </Tooltip>
          )} */}
        </div>
        <Button
          onClick={() => setOpenNotification(true)}
          className="!bg-[#F2F4F7] relative !border-none !p-0 !h-[32px] !w-[32px]"
        >
          <span className="absolute h-[8px] w-[8px] border-2 top-[5px] right-[9px] border-white rounded-full bg-[#C10000]"></span>
          <GoBellFill className="text-lg text-[#4A5873]" />
        </Button>
      </div>
    </Layout.Header>
  );
}
