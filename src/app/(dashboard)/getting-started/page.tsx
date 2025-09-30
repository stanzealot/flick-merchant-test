'use client';

import Link from 'next/link';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GetStartedPage = () => {
  const cardVariants = {
    initial: { y: '-100vh', opacity: 0 }, // Start off the screen (top)
    drop: (i: number) => ({
      y: 0, // Drop to the normal position
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80 + i * 20, // Vary stiffness
        damping: 20, // Smoother stop
        duration: 1.5 + i * 0.5, // Vary the duration
      },
    }),
    float: (i: number) => ({
      y: [0, -10, 0], // Floating motion: moving up and down
      transition: {
        repeat: Infinity,
        repeatType: 'reverse' as 'reverse' | 'loop' | 'mirror', // Explicitly cast to the allowed type
        duration: 3 + i * 0.5, // Slower float animation with varied duration
      },
    }),
  };

  return (
    <div className="bg-[#F6F7F9] h-screen">
      <div className="bg-white rounded-xl px-5 py-5">
        <h1 className="text-[#101828] text-[20px] font-semibold">
          You are getting started
        </h1>
        <p className="text-[#999999] text-[13px] mt-2">
          Take a few minutes to explore Flick
        </p>
      </div>

      <div className="mt-7 rounded-xl grid grid-cols-2 h-[320px] overflow-hidden">
        <div className="bg-white h-full px-6 py-7 flex flex-col">
          <div className="w-9/12">
            <h1 className="text-2xl text-[#151F32] font-semibold">
              One API powering all your <br /> innovations
            </h1>
            <p className="mt-5 text-[#8C8F97] text-sm">
              Seamless end-to-end integration for identity, <br /> financial
              data and payments
            </p>
          </div>

          <div className="mt-auto mb-0">
            <Link
              href="#!"
              className="text-primary-500 text-sm flex items-center gap-2 w-48"
            >
              Explore Sandbox <MdOutlineArrowOutward />
            </Link>
          </div>
        </div>
        <div className="bg-[#F4FBFB]">
          <div className="relative flex justify-center items-center h-full">
            {/* Card 1 */}
            <motion.img
              src="/images/dashboard/card-1.png"
              alt="Illustration"
              className="absolute left-5 top-7 w-72"
              variants={cardVariants}
              custom={0} // Custom index to vary durations
              initial="initial"
              animate={['drop', 'float']} // Animate both the drop and float
            />

            {/* Card 2 */}
            <motion.img
              src="/images/dashboard/card-2.png"
              alt="Illustration"
              className="absolute left-32 top-24 w-72"
              variants={cardVariants}
              custom={1} // Custom index for varied transition times
              initial="initial"
              animate={['drop', 'float']}
            />

            {/* Card 3 */}
            <motion.img
              src="/images/dashboard/card-3.png"
              alt="Illustration"
              className="absolute left-64 top-40 w-72"
              variants={cardVariants}
              custom={2} // Custom index for different duration
              initial="initial"
              animate={['drop', 'float']}
            />
          </div>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-[60%_auto] gap-10 h-[160px] overflow-hidden">
        <div className="bg-white h-full px-5 py-5 rounded-xl flex flex-col relative">
          <h1 className="text-base font-semibold text-[#151F32]">
            Our Latest Announcements and News
          </h1>
          <p className="text-[13px] text-[#8C8F97] mt-3">
            Find relevant guides and resources to access and build <br /> with
            Flick&apos;s suite of APIs
          </p>

          <div className="mt-auto mb-0">
            <Link
              href="#!"
              className="text-primary-500 text-sm flex items-center gap-2 w-48"
            >
              Show me <MdOutlineArrowOutward />
            </Link>
          </div>
          <Image
            src="/images/dashboard/news.svg"
            alt="News"
            width={500}
            height={500}
            className="absolute right-0 w-48"
          />
        </div>
        <div className="bg-white rounded-xl px-5 py-5 grid grid-cols-[130px_auto] gap-5">
          <div className="overflow-hidden w-full">
            <Image
              src="/images/dashboard/resource.svg"
              alt="resource"
              width={500}
              height={500}
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <div>
              {' '}
              <h1 className="text-[15px] font-semibold text-[#151F32]">
                Helpful Resources
              </h1>
              <p className="text-[13px] text-[#8C8F97] mt-3">
                Find relevant guides and resources to access and build with
                Flick&apos;s suite of APIs
              </p>
            </div>
            <div className="mt-auto mb-0">
              <Link
                href="#!"
                className="text-primary-500 text-sm flex items-center gap-2 w-48"
              >
                Show me <MdOutlineArrowOutward />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
