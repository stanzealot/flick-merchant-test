/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "antd";
import "./Pagination.css";

interface PaginationProps {
    total: number | any;
    pageSize: number | any;
    current: number | any;
    dataLength?: number;
    onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, pageSize, current, dataLength, onChange }) => {
    const totalPages = Math.ceil(total / pageSize);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <div className="">
                <p className="text-[#4B5563] text-xs">
                    Showing {dataLength} of {total} results
                </p>
            </div>
            <div className="flex flex-wrap gap-4 sm:justify-center sm:items-center">
                <Button
                    style={{
                        borderRadius: "5px",
                        height: "30px",
                        width: "auto",
                    }}
                    className="!border !border-[#94A3B8] !text-primary-500 hover:!text-white flex justify-center items-center !text-xs !font-bold !h-7 !rounded-sm"
                    onClick={() => onChange(Math.max(1, current - 1))}
                    disabled={current === 1}
                >
                    Previous
                </Button>

                {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={() => onChange(page)}
                        className={`text-white !border rounded-sm w-7 h-7 text-xs outline-none custom-button flex justify-center items-center ${
                            page === current
                                ? "!bg-primary-500 !text-white !border-primary-500"
                                : " !border-[#94A3B8] !text-[#94A3B8] hover:!bg-primary-500 hover:!text-white hover:!border-primary-500"
                        }`}
                    >
                        {page}
                    </Button>
                ))}

                <Button
                    style={{
                        borderRadius: "5px",
                        height: "30px",
                        width: "auto",
                    }}
                    className="!border !border-[#94A3B8] !text-xs hover:!bg-primary-500 hover:!text-white hover:!border-primary-500 flex justify-center items-center"
                    onClick={() => onChange(Math.min(totalPages, current + 1))}
                    disabled={current === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
