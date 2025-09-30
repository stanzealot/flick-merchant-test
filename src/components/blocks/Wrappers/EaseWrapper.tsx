'use client';

import { motion } from 'framer-motion';

type ItemProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function EaseWrapper({ children, className }: ItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
