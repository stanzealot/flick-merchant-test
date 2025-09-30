'use client';

import Image from 'next/image';
import Modal from '@/src/components/ui-components/Modal';
import BackButton from '@/src/components/ui-components/Buttons/BackButton';
import useOverviewStore from '@/src/utils/store/overviewStore';

type Props = Readonly<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export default function ComingSoonModal({ isOpen, setIsOpen }: Props) {
  const { setOpenFundPayout, setOpenFundWallet, comingSoonType } = useOverviewStore();

  return (
    <Modal customWidth={400} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
      <BackButton
        onClick={() => {
          setIsOpen(false);
          comingSoonType === 'local' ? setOpenFundPayout(true) : setOpenFundWallet(true);
        }}
      />

      <div className="mt-10 mb-14 flex flex-col items-center justify-center gap-7">
        <div className="w-52">
          <Image
            src="/images/icons/coming-soon.svg"
            className="w-full"
            width={1000}
            height={1000}
            alt="Coming Soon"
          />
        </div>
      </div>
    </Modal>
  );
}
