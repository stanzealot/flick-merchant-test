'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from 'antd';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import FlickFull from '@/public/images/flick-full.svg';
import { motion } from 'framer-motion';
import { MdScience } from 'react-icons/md';

import LoginForm from '@/src/components/pageComponents/Authentication/LoginForm';

const SLIDE_LIST = [
  {
    title: 'Global Accounts',
    description:
      'Seamlessly create local accounts and multi-currency IBANs for your clients and customers.',
    image: '/images/authentication/auth-carousel-1.svg',
  },
  {
    title: 'Global Payment',
    description:
      'Collect real-time payment from over 13,000 banks across 21 countries and payout to 150+ countries',
    image: '/images/authentication/auth-carousel-2.svg',
  },
  {
    title: 'Financial Data',
    description: 'Access financial data from banks and more through one API.',
    image: '/images/authentication/auth-carousel-3.svg',
  },
  {
    title: 'Direct Debit',
    description:
      'Recover loan, collect recurring payment or subscription fees from single or multiple bank accounts',
    image: '/images/authentication/auth-carousel-4.svg',
  },
];

const LoginPage = () => {
  return (
    <div className="grid grid-cols-[500px_auto]">
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
        className="bg-[#F5FBFB] px-[65px] py-6 h-[100vh]"
      >
        <Link href="/">
          <Image src={FlickFull} alt="Flick Logo" className="w-[85px]" />
        </Link>

        <div className="mt-[60px]">
          <Carousel
            arrows={false}
            slidesPerRow={1}
            autoplay
            autoplaySpeed={3000}
            dots={{ className: 'dots_dots dots_dot1' }}
            draggable
            swipeToSlide
            speed={500}
            className="mt-12"
          >
            {SLIDE_LIST.map((slide, index) => (
              <SwiperSlide key={index}>
                <EachSlide
                  title={slide.title}
                  description={slide.description}
                  image={slide.image}
                />
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
      </motion.div>
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute top-6 right-8 z-10">
          <div className="flex items-center gap-2 bg-[#FFF4ED] border-2 border-[#FF9F57] px-4 py-2 rounded-full shadow-sm">
            <MdScience className="text-[#FF9F57] text-lg animate-pulse" />
            <span className="text-[#FF9F57] font-semibold text-sm">
              Test Mode
            </span>
          </div>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

const EachSlide = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[#2B2B2B]">{title}</h1>
      <p className="text-[#7F7F7F] mt-3">{description}</p>

      <div className="w-full h-[450px] mt-8">
        <Image
          src={image}
          alt="Image1"
          width={1000}
          height={1000}
          className="w-full"
        />
      </div>
    </div>
  );
};
export default LoginPage;
