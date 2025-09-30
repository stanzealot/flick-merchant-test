"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CollapseProps {
    children: any;
    title: any;
    isOpen: boolean;
    onClick: () => void;
}

const SimpleCollapse: React.FC<CollapseProps> = ({ children, title, isOpen, onClick }) => {
    return (
        <div className="w-full">
            <button className="" onClick={onClick}>
                {title}
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden mt-4 text-sm leading-6 sm:text-base font-light"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SimpleCollapse;
