"use client";

import { Button } from "antd";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";

const TableExport = () => {
    return (
        <div className="flex items-center flex-col h-20 justify-center bg-white">
            <Button
                icon={<HiMiniArrowTopRightOnSquare />}
                iconPosition="end"
                className="!border-none !outline-none !text-primary-500 !font-normal"
            >
                Export Data
            </Button>
        </div>
    );
};

export default TableExport;
