"use client";

import { twMerge } from "tailwind-merge";
import { FaDotCircle } from "react-icons/fa";

const GraphLabel = ({ label, css }: { label: string; css: string }) => {
    return (
        <div className={`flex items-center gap-1`}>
            <FaDotCircle className={twMerge(css, "text-xs")} /> <p className="text-[#475467]">{label}</p>
        </div>
    );
};

export default GraphLabel;
