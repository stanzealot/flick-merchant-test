"use client";

import { useState } from "react";
import CustomDropdown from "../../ui-components/CustomDropdown";
import { formatWords } from "@/src/utils/functions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import clsx from "clsx";

type Props = {
    items: {
        value: string;
        label: string;
        icon?: React.ReactNode | string;
        iconCss?: string;
        labelCss?: string;
    }[];
    selected: string;
    onSelect: (selected: string) => void;
    buttonChildren?: React.ReactNode;
};
export default function FilterDropdown({ items, selected, onSelect, buttonChildren }: Props) {
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(!open);

    return (
        <CustomDropdown
            open={open}
            onOpenChange={setOpen}
            actionChildren={
                buttonChildren ? (
                    buttonChildren
                ) : (
                    <button
                        className="flex items-center gap-2 font-medium text-[13px] justify-between px-5 py-2 bg-white rounded-md custom-shadow"
                        onClick={toggleDropdown}
                    >
                        {formatWords(selected)} {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                )
            }
            renderChildren={
                <div className="custom-shadow flex flex-col gap-2 bg-white px-3 py-3 rounded-md">
                    {items.map(
                        (
                            item: {
                                value: string;
                                label: string;
                                icon?: React.ReactNode | string;
                                iconCss?: string;
                                labelCss?: string;
                            },
                            index
                        ) => (
                            <button
                                key={Number(index)}
                                onClick={() => {
                                    onSelect(item?.value as string);
                                    setOpen(false);
                                }}
                                className={`${selected === item.value ? "text-primary-500" : ""} ${clsx(
                                    item.labelCss
                                )} flex items-center justify-between gap-5 text-[13px] text-left hover:bg-gray-100 px-3 py-1 rounded-sm`}
                            >
                                {item.label} <span className={`${item?.iconCss}`}>{item.icon}</span>
                            </button>
                        )
                    )}
                </div>
            }
        />
    );
}
