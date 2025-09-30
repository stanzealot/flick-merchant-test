'use client';

import { motion } from 'framer-motion';

const TabSwitch = ({
  activeTab,
  setActiveTab,
  tabs,
  className,
  onSelect,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string }[];
  className?: string;
  onSelect?: any;
}) => {
  return (
    <div className={`${className} space-x-3 bg-[#F2F5F8] rounded-[20px] px-1 py-[5px] inline-flex`}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => {
            onSelect && onSelect;
            setActiveTab(tab.id);
          }}
          className={`text-xs py-[10px] px-2 sm:px-5 rounded-3xl font-medium custom-shadow ${
            activeTab === tab.id ? 'bg-primary-500 text-white' : 'bg-[#F2F5F8] text-secondary-600'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

export default TabSwitch;
