"use client";

import { Button } from "antd";
import { GoCopy } from "react-icons/go";
import { openGlobalNotification } from "../toast-notification";
import React from "react";
import useAppStore from "@/src/utils/store";

interface CopyButtonProps {
    data: string;
    message: string;
    className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ data, message, className }) => {
    return (
        <Button
            className={`${className} !border-none custom-shadow !h-[23px] !w-[23px] !p-0 !m-0 !text-primary-500`}
            onClick={(e) => {
                e.preventDefault();

                navigator.clipboard.writeText(data);
                openGlobalNotification({
                    message,
                    type: "info",
                });
            }}
            icon={<GoCopy className="text-[13px]" />}
        />
    );
};

export default CopyButton;
