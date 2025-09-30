'use client';

import { Button } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';

export default function KycPending() {
  return (
    <div>
      <motion.div
        style={{
          background: 'linear-gradient(45deg, #F5FAF9, #E9F5F4, #BBDFDD)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          background: [
            'linear-gradient(45deg, #E9F5F4, #BBDFDD,#F5FAF9)',
            'linear-gradient(45deg, #BBDFDD, #F5FAF9, #E9F5F4)',
            'linear-gradient(45deg, #E9F5F4, #BBDFDD, #F5FAF9)',
          ],
        }}
        transition={{
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="bg-[#F5FBFB] h-[100vh] justify-center flex items-center"
      >
        <div className="w-[500px] flex justify-center flex-col items-center mx-auto gap-7">
          <h1 className="text-[40px] font-bold text-center">
            Your KYC is still under review and awaiting approval
          </h1>
          <Link href="/">
            <Button
              icon={<IoIosArrowRoundForward size={24} />}
              iconPosition="end"
              className="!text-white !bg-primary-500 hover:!bg-primary-600 !rounded-3xl !border-none !h-[46px] !mx-auto block"
            >
              Back of Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
