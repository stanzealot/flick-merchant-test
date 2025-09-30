"use client";

import { Button, DatePicker } from "antd";
import { Dayjs } from "dayjs";
import { FaFileExport } from "react-icons/fa6";
import { ICONS } from "@/src/utils/constants";
import CustomIcon from "@/src/components/blocks/CustomIcon";

type TableTopProps = Readonly<{
    title?: string;
    itemsCount?: number;
    filterChildren?: React.ReactNode;
    setSearch?: (search: string) => void;
    buttonChildren?: React.ReactNode;
    buttonPosition?: "left" | "right";
    setDateRange?: (dates: [Dayjs | null, Dayjs | null]) => void;
    handleExport?: () => void;
    filterButton?: React.ReactNode;
}>;

export default function TableTop({
    title,
    itemsCount,
    setSearch,
    buttonChildren,
    buttonPosition = "left",
    filterChildren,
    setDateRange,
    handleExport,
    filterButton,
}: Readonly<TableTopProps>) {
    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        if (dates) {
            setDateRange && setDateRange(dates);
        } else {
            setDateRange && setDateRange([null, null]);
        }
    };

    const { RangePicker } = DatePicker;
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
                {title && <h1 className="text-base font-semibold">{title}</h1>}
                {filterChildren && filterChildren}
                {Boolean(itemsCount) && (
                    <button className="border border-[#ABE5E2] bg-[#EAF8F8] text-[#1C716D] rounded-3xl font-medium text-xs px-3 py-1">
                        {itemsCount} record{itemsCount && itemsCount > 1 ? "s" : ""}
                    </button>
                )}

                {buttonPosition === "left" && buttonChildren && buttonChildren}
            </div>
            <div className="flex items-center gap-4">
                {setSearch && (
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search..."
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            className="border text-[13px] md:w-[200px] lg:w-[250px] focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent rounded-md pr-2 pl-[30px] py-2 bg-[#F9FAFC]"
                        />

                        <CustomIcon
                            path={ICONS.SearchIcon}
                            className="w-[18px] absolute top-[10.5px] left-2"
                            width={18}
                            height={18}
                        />
                    </div>
                )}

                {filterButton && filterButton}

                {setDateRange && (
                    <RangePicker
                        suffixIcon={<CustomIcon path={ICONS.CalendarSearch} className="w-7" />}
                        className="!h-[40px]"
                        onChange={(dates) => {
                            handleDateChange(dates);
                        }}
                    />
                )}

                {handleExport && (
                    <Button
                        onClick={() => {
                            handleExport();
                        }}
                        className="!text-white !rounded-3xl !pr-4 !h-[40px] !border-none !outline-none !bg-primary-500 hover:!bg-primary-700"
                        icon={<FaFileExport />}
                    >
                        Export
                    </Button>
                )}
            </div>

            {buttonPosition === "right" && buttonChildren && buttonChildren}
        </div>
    );
}

// call_source
