'use client';

import { Layout } from 'antd';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import ConvertDrawal from '../../pageComponents/Dashboard/TopNavModals/ConvertDrawal';
import ConfirmConvertDrawal from '../../pageComponents/Dashboard/TopNavModals/ConfirmConvertDrawal';
import Notifications from '../../pageComponents/Dashboard/TopNavModals/Notifications';
import DirectDebitDrawer from '../../pageComponents/Dashboard/Paylinks/DirectDebitDrawer';
import PaylinkDrawer from '../../pageComponents/Dashboard/Paylinks/PayliinkDrawer';
import MakePayoutDrawer from '../../pageComponents/Dashboard/Outflow/MakePayoutDrawer';
import useOutflowStore from '@/src/utils/store/outflowStore';
import FlickAccountDrawer from '../../pageComponents/Dashboard/Outflow/FlickAccountDrawer';
import BeneficiaryDrawer from '../../pageComponents/Dashboard/Outflow/BeneficiaryDrawer';
import PayoutOtpDrawer from '../../pageComponents/Dashboard/Outflow/PayoutOtpDrawer';
import BusinessModal from '../../pageComponents/Dashboard/TopNavModals/BusinessModal';
import SlaModal from '../../pageComponents/Dashboard/TopNavModals/SlaModal';
import SignatureModal from '../../pageComponents/Dashboard/TopNavModals/SignatureModal';
import useUserDataStore from '@/src/utils/store/userStore';
import AddForeignBeneficiaryDrawer from '../../pageComponents/Dashboard/Outflow/AddForeignBeneficiaryDrawer';
import BankDetailsDrawer from '../../pageComponents/Dashboard/Outflow/BankDetailsDrawer';
import SuccessPaymentDrawer from '../../pageComponents/Dashboard/Outflow/SuccessPaymentDrawer';
import ConfirmForeignDetailsDrawer from '../../pageComponents/Dashboard/Outflow/ConfirmForeignDetailsDrawer';
import BalancesModal from '../../pageComponents/Dashboard/Balance/BalancesModal';
import SetLimitModal from '../../pageComponents/Dashboard/Balance/SetLimitModal';
import useOverviewStore from '@/src/utils/store/overviewStore';
import FundWallet from '../../pageComponents/Dashboard/Balance/FundWallet';
import BalanceAmountModal from '../../pageComponents/Dashboard/Balance/BalanceAmountModal';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Content({ children }: Readonly<Props>) {
  //   const { userData } = useUserDataStore();
  //   const {
  //     openConvert,
  //     setOpenConvert,
  //     openConvertConfirm,
  //     setOpenConvertConfirm,
  //     payload,
  //     openNotification,
  //     setOpenNotification,
  //     openDirectDebitDrawer,
  //     setOpenDirectDebitDrawer,
  //     openPaylinkDrawer,
  //     setOpenPaylinkDrawer,
  //     setOpenSignature,
  //     openSignature,
  //   } = useTopMenuStore();

  //   const {
  //     openBeneficiary,
  //     setOpenBeneficiary,
  //     openConfirmTransfer,
  //     setOpenConfirmTransfer,
  //     openConfirmForeignTransfer,
  //     setOpenConfirmForeignTransfer,
  //   } = useOutflowStore();

  //   const {
  //     openPayout,
  //     setOpenPayout,
  //     where,
  //     openFlickAccountDrawer,
  //     setOpenFlickAccountDrawer,
  //     openAddBeneficiary,
  //     setOpenAddBeneficiary,
  //     openBankDetails,
  //     setOpenBankDetails,
  //     openSuccess,
  //     setOpenSuccess,
  //   } = useOutflowStore();
  //   const {
  //     openCreateBusiness,
  //     setOpenCreateBusiness,
  //     openBalancesModal,
  //     setOpenBalancesModal,
  //   } = useTopMenuStore();

  const {
    openFundWallet,
    setOpenFundWallet,
    fundWalletPayload,
    openBalanceAmountModal,
    setOpenBalanceAmountModal,
  } = useOverviewStore();

  return (
    <Layout.Content className="px-5 py-5">
      {children}
      {/* <FlickAccountDrawer isOpen={openFlickAccountDrawer} setIsOpen={setOpenFlickAccountDrawer} />
            {where === "top-menu" && <MakePayoutDrawer isOpen={openPayout} setIsOpen={setOpenPayout} />}
            <PayoutOtpDrawer isOpen={openConfirmTransfer} setIsOpen={setOpenConfirmTransfer} />
            <DirectDebitDrawer isOpen={openDirectDebitDrawer} setIsOpen={setOpenDirectDebitDrawer} />
            <PaylinkDrawer isOpen={openPaylinkDrawer} setIsOpen={setOpenPaylinkDrawer} />
            <ConvertDrawal isOpen={openConvert} setIsOpen={setOpenConvert} />
            {openConvertConfirm && (
                <ConfirmConvertDrawal payload={payload} isOpen={openConvertConfirm} setIsOpen={setOpenConvertConfirm} />
            )}
            <Notifications isOpen={openNotification} setIsOpen={() => setOpenNotification(false)} />
            <BeneficiaryDrawer isOpen={openBeneficiary} setIsOpen={setOpenBeneficiary} />
            <BusinessModal isOpen={openCreateBusiness} setIsOpen={setOpenCreateBusiness} />
            <SlaModal
                setOpenSignature={setOpenSignature}
                isOpen={userData?.kycStatus === "completed" && userData?.sla === false}
            /> */}
      {/* <SlaModal setOpenSignature={setOpenSignature} isOpen={true} /> */}
      {/* <SignatureModal isOpen={openSignature} setIsOpen={setOpenSignature} />
            <AddForeignBeneficiaryDrawer isOpen={openAddBeneficiary} setIsOpen={setOpenAddBeneficiary} />
            <BankDetailsDrawer isOpen={openBankDetails} setIsOpen={setOpenBankDetails} />
            <SuccessPaymentDrawer isOpen={openSuccess} setIsOpen={setOpenSuccess} />
            <ConfirmForeignDetailsDrawer
                isOpen={openConfirmForeignTransfer}
                setIsOpen={setOpenConfirmForeignTransfer}
            /> */}

      {/* <BalancesModal isOpen={openBalancesModal} setIsOpen={setOpenBalancesModal} />
            <SetLimitModal isOpen={openLimitModal} setIsOpen={setOpenLimitModal} /> */}
      <FundWallet isOpen={openFundWallet} setIsOpen={setOpenFundWallet} payload={fundWalletPayload} />
      <BalanceAmountModal isOpen={openBalanceAmountModal} setIsOpen={setOpenBalanceAmountModal} />
    </Layout.Content>
  );
}
