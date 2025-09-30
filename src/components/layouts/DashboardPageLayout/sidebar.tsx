'use client';

import { ROUTE_KEYS, ROUTE_LABELS } from '@/src/utils/constants';
import { MenuItem } from '@/src/utils/types';
import { Button, Layout, Menu, MenuProps } from 'antd';
import { PiSuitcaseLight } from 'react-icons/pi';
import FlickFull from '@/public/images/flick-full.svg';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { HiOutlineChartBarSquare } from 'react-icons/hi2';
import { ImStack } from 'react-icons/im';
import { RiHomeSmileLine } from 'react-icons/ri';
import FlickLogo from '@/public/images/flick-logo.svg';
import Image from 'next/image';
import { LiaWalletSolid } from 'react-icons/lia';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { IoSettingsOutline, IoDocumentAttachOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { GoCopy } from 'react-icons/go';
import CustomDropdown from '../../ui-components/CustomDropdown';
import { getFirstLetterOfWords, logout } from '@/src/utils/functions';
import { openGlobalNotification } from '../../blocks/toast-notification';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import useUserDataStore from '@/src/utils/store/userStore';
import useGetMerchantInfo from '@/src/app/api/hooks/authentication/useGetMerchantInfo';

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
};

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userData, clearUserData } = useUserDataStore();
  const { setOpenCreateBusiness } = useTopMenuStore();

  const [open, setOpen] = useState(false);

  const activeKey = useMemo(() => {
    if (!pathname || !MENU) return null;

    const findActiveKey = (items: LevelKeysProps[]): string | null => {
      for (const item of items) {
        if (pathname.startsWith(item?.key as string)) {
          return item.key as string;
        }
        if (item.children) {
          const childActiveKey = findActiveKey(item.children);
          if (childActiveKey) return childActiveKey;
        }
      }
      return null;
    };

    return findActiveKey(MENU as any);
  }, [pathname]);

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(MENU as LevelKeysProps[]);

  const [stateOpenKeys, setStateOpenKeys] = useState([activeKey as string]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Layout.Sider
      style={siderStyle}
      collapsible
      trigger={null}
      width={265}
      breakpoint="md"
      className={`sidebar !bg-white custom-shadow`}
    >
      <div className="sidebar-content">
        <Link href="/overview">
          <span className="hidden px-6 md:flex items-center">
            <Image src={FlickFull} alt="Flick Logo" className="w-[85px]" />
          </span>

          <span className="md:hidden px-6 flex items-center">
            <Image src={FlickLogo} alt="Flick Logo" className="w-[38px]" />
          </span>
        </Link>

        <div className="mt-2 h-full flex flex-col">
          <Menu
            onClick={(info) => router.push(info.key)}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[activeKey as string]}
            mode="inline"
            items={MENU}
          />

          <CustomDropdown
            actionChildren={
              <div className="grid grid-cols-[35px_auto_30px] gap-2 mt-auto items-center px-2 border-b border-x-0 border-[#EAECF0] pt-3">
                {/* Profile Icon */}
                <div className="relative w-8 h-8 rounded-full bg-[#EAF8F8] flex items-center justify-center text-primary-500">
                  {getFirstLetterOfWords(userData?.business_name || '')}
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border border-white rounded-full bg-primary-500" />
                </div>

                {/* User Information */}
                <div className="flex flex-col justify-center py-2">
                  <h1 className="text-sm font-semibold text-[#344054] mb-[-2px]">
                    {userData?.business_name}
                  </h1>
                  <div className="flex items-center text-[10px] font-light text-[#475467]">
                    <span>Merchant ID: {userData?.businessId}</span>
                    <Button
                      className="ml-2 !border-none custom-shadow !h-6 !w-6 !p-0 text-primary-500"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(
                          userData?.businessId || ''
                        );
                        openGlobalNotification({
                          message: 'Merchant ID Copied',
                          description: 'Merchant ID copied to clipboard',
                          type: 'info',
                        });
                      }}
                      icon={<GoCopy className="text-[13px]" />}
                    />
                  </div>
                </div>

                {/* Expand/Collapse Icon */}
                {open ? (
                  <IoIosArrowUp
                    className="cursor-pointer"
                    onClick={() => setOpen(!open)}
                  />
                ) : (
                  <IoIosArrowDown
                    className="cursor-pointer"
                    onClick={() => setOpen(!open)}
                  />
                )}
              </div>
            }
            onOpenChange={setOpen}
            open={open}
            renderChildren={
              <div className="flex flex-col gap-2 rounded-lg bg-white w-full py-7 px-5 custom-shadow border border-[#E7EAEE]">
                <button
                  onClick={() => {
                    setOpenCreateBusiness(true);
                    setOpen(false);
                  }}
                  className="rounded-md flex items-center gap-2 hover:bg-primary-50 hover:text-primary-500 px-3 py-2"
                >
                  <PiSuitcaseLight size={18} /> Your Business
                </button>

                <Link
                  className="hover:!bg-primary-50 hover:!text-primary-500 !px-3 !py-2 !text-[#666666]"
                  href={ROUTE_KEYS.AGREEMENT}
                >
                  <button className="rounded-md flex items-center gap-2">
                    <IoDocumentAttachOutline size={18} /> Merchant Agreement
                  </button>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    clearUserData();
                  }}
                  className="mt-2 rounded-md flex items-center justify-center gap-2 bg-danger-50 text-danger-500 px-3 py-2"
                >
                  Log Out
                </button>
              </div>
            }
          />
        </div>
      </div>
    </Layout.Sider>
  );
}

const MENU: MenuItem[] = [
  {
    key: ROUTE_KEYS.GETTING_STARTED,
    label: ROUTE_LABELS[ROUTE_KEYS.GETTING_STARTED],
    icon: <RiHomeSmileLine />,
  },
  {
    key: ROUTE_KEYS.OVERVIEW,
    label: ROUTE_LABELS[ROUTE_KEYS.OVERVIEW],
    icon: <HiOutlineChartBarSquare />,
  },
  {
    key: ROUTE_KEYS.BALANCE,
    label: ROUTE_LABELS[ROUTE_KEYS.BALANCE],
    icon: <LiaWalletSolid />,
  },

  {
    key: ROUTE_KEYS.PAYMENT,
    label: ROUTE_LABELS[ROUTE_KEYS.PAYMENT],
    icon: <CiMoneyCheck1 />,
    children: [
      {
        key: ROUTE_KEYS.PAYMENT_INFLOW,
        label: ROUTE_LABELS[ROUTE_KEYS.PAYMENT_INFLOW],
      },
      {
        key: ROUTE_KEYS.PAYMENT_OUTFLOW,
        label: ROUTE_LABELS[ROUTE_KEYS.PAYMENT_OUTFLOW],
      },
      // {
      //   key: ROUTE_KEYS.PAYMENT_DIRECT_DEBIT,
      //   label: ROUTE_LABELS[ROUTE_KEYS.PAYMENT_DIRECT_DEBIT],
      // },
      // {
      //   key: ROUTE_KEYS.PAYMENT_PAYLINKS,
      //   label: ROUTE_LABELS[ROUTE_KEYS.PAYMENT_PAYLINKS],
      // },
      // {
      //     key: ROUTE_KEYS.PAYMENT_DISPUTES,
      //     label: ROUTE_LABELS[ROUTE_KEYS.PAYMENT_DISPUTES],
      // },
      // {
      //     key: ROUTE_KEYS.PAYMENT_CUSTOMERS,
      //     label: ROUTE_LABELS[ROUTE_KEYS.PAYMENT_CUSTOMERS],
      // },
    ],
  },

  // {
  //   key: ROUTE_KEYS.DATA,
  //   label: ROUTE_LABELS[ROUTE_KEYS.DATA],
  //   icon: <ImStack />,
  //   children: [
  //     {
  //       key: ROUTE_KEYS.IDENTITY,
  //       label: ROUTE_LABELS[ROUTE_KEYS.IDENTITY],
  //     },
  //     {
  //       key: ROUTE_KEYS.ACCOUNTS,
  //       label: ROUTE_LABELS[ROUTE_KEYS.ACCOUNTS],
  //     },
  //     {
  //       key: ROUTE_KEYS.TRANSACTIONS,
  //       label: ROUTE_LABELS[ROUTE_KEYS.TRANSACTIONS],
  //     },
  //     {
  //       key: ROUTE_KEYS.STATEMENT,
  //       label: ROUTE_LABELS[ROUTE_KEYS.STATEMENT],
  //     },
  //     {
  //       key: ROUTE_KEYS.CUSTOMERS_DATA,
  //       label: ROUTE_LABELS[ROUTE_KEYS.CUSTOMERS_DATA],
  //     },
  //   ],
  // },

  // {
  //   key: ROUTE_KEYS.SETTINGS,
  //   label: ROUTE_LABELS[ROUTE_KEYS.SETTINGS],
  //   icon: <IoSettingsOutline />,
  // },
];
