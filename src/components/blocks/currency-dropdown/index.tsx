"use client";

import Image from "next/image";
import CustomDropdown from "../../ui-components/CustomDropdown";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export type CurrencyItemProps = {
    value: string;
    iso_2: string;
    symbol: string;
    label?: string;
};

type DropdownButtonProps = {
    currency: string;
    iso: string;
    isOpen: boolean;
    toggleOpen: () => void;
    buttonClass?: string;
    label?: string;
    labelCss?: string;
};

type DropdownItemsProps = {
    items: CurrencyItemProps[];
    selectedCurrency: string;
    onSelectCurrency: (item: CurrencyItemProps) => void;
    toggleOpen: () => void;
};

type CurrencyDropdownProps = {
    items: CurrencyItemProps[];
    selectedCurrency: CurrencyItemProps;
    onSelectCurrency: (item: CurrencyItemProps) => void;
    buttonClass?: string;
    label?: string;
    labelCss?: string;
};

const DropdownButton = ({ currency, iso, isOpen, toggleOpen, buttonClass, label, labelCss }: DropdownButtonProps) => (
    <div>
        {label && <label className={labelCss}>{label}</label>}
        <button
            className={twMerge(
                buttonClass || "w-[90px]",
                `gap-1 grid grid-cols-[25px_auto] items-center h-full bg-white custom-shadow !rounded-md px-2 py-2`
            )}
            onClick={(e) => {
                e.preventDefault();
                toggleOpen();
            }}
        >
            <div className="w-[20px] h-[20px] rounded-full overflow-hidden text-[#1E293B]">
                <Image
                    src={`/images/flags/${iso}.svg`}
                    width={1000}
                    height={1000}
                    alt="country-img"
                    style={{ transform: "scale(1.5, 1.9)" }}
                />
            </div>
            <div className="flex items-center gap-2">
                <p className="text-[13px]">{currency}</p>
                <p className="text-[11px]">{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
            </div>
        </button>
    </div>
);

// Reusable dropdown items
const DropdownItems = ({ items, selectedCurrency, onSelectCurrency, toggleOpen }: DropdownItemsProps) => (
    <div className="w-[90px] px-1 py-2 custom-shadow bg-white !rounded-md flex flex-col gap-2">
        {items.map((item, index) => (
            <button
                onClick={() => {
                    onSelectCurrency(item);
                    toggleOpen();
                }}
                key={Number(index)}
                className={`grid grid-cols-[30%_auto] hover:bg-gray-100 py-1 px-2 rounded-md ${
                    item.value === selectedCurrency ? "bg-blue-50" : ""
                }`}
            >
                <div className="w-[20px] h-[20px] rounded-full overflow-hidden text-[#1E293B]">
                    <Image
                        src={`/images/flags/${item.iso_2}.svg`}
                        width={1000}
                        height={1000}
                        alt="country-img"
                        style={{ transform: "scale(1.5, 1.9)" }}
                    />
                </div>
                <p className="text-[12.6px]">{item.value}</p>
            </button>
        ))}
    </div>
);

export default function CurrencyDropdown({
    items,
    selectedCurrency,
    onSelectCurrency,
    buttonClass,
    label,
    labelCss,
}: CurrencyDropdownProps) {
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(!open);

    return (
        <CustomDropdown
            open={open}
            onOpenChange={setOpen}
            actionChildren={
                <DropdownButton
                    currency={selectedCurrency.value}
                    iso={selectedCurrency.iso_2}
                    isOpen={open}
                    toggleOpen={toggleDropdown}
                    buttonClass={buttonClass}
                    label={label}
                    labelCss={labelCss}
                />
            }
            renderChildren={
                <DropdownItems
                    items={items}
                    selectedCurrency={selectedCurrency.value}
                    onSelectCurrency={onSelectCurrency}
                    toggleOpen={toggleDropdown}
                />
            }
        />
    );
}
