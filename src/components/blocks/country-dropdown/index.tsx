"use client";

import Image from "next/image";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import CustomDropdown from "../../ui-components/CustomDropdown";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type ItemProps = {
    value: string;
    iso_2: string;
    label: string;
};

type DropdownButtonProps = {
    id: string;
    errors?: Record<string, any>;
    required?: boolean;
    inputLabel?: string;
    label: string;
    labelCss?: string;
    iso: string;
    isOpen: boolean;
    toggleOpen: () => void;
};

type DropdownItemsProps = {
    items: ItemProps[];
    selected: string;
    onSelectCountry?: (item: ItemProps) => void;
    toggleOpen: () => void;
};

type CountryDropdownProps = {
    id: string;
    errors?: Record<string, any>;
    required?: boolean;
    inputLabel?: string;
    labelCss?: string;
    items: ItemProps[];
    selectedCountry?: ItemProps;
    onSelectCountry?: (item: ItemProps) => void;
};

const DropdownButton = ({
    labelCss,
    inputLabel,
    id,
    errors,
    required,
    label,
    iso,
    isOpen,
    toggleOpen,
}: DropdownButtonProps) => (
    <div className="w-full">
        <label htmlFor={id} className={twMerge(labelCss, `text-sm text-secondary-700 mb-[6px] block`)}>
            {inputLabel}
            {required && <span className="text-primary-600 ml-1">*</span>}
        </label>
        <button
            className="border border-secondary-100 w-full gap-1 grid grid-cols-[30px_auto] items-start h-full !rounded-lg px-2 py-3"
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
            <div className="flex items-center justify-between">
                <p className="text-sm">{label}</p>
                <p className="text-xs text-secondary-400">{isOpen ? <SlArrowUp /> : <SlArrowDown />}</p>
            </div>
        </button>
        {errors?.[id]?.message && (
            <p className="text-[10px] absolute bottom-[-14px] text-danger-500">{errors[id].message}</p>
        )}
    </div>
);

// Reusable dropdown items
const DropdownItems = ({ items, selected, onSelectCountry, toggleOpen }: DropdownItemsProps) => (
    <div className="w-full px-1 py-2 custom-shadow bg-white !rounded-md flex flex-col gap-2">
        {items.map((item, index) => (
            <button
                onClick={() => {
                    onSelectCountry && onSelectCountry(item);
                    toggleOpen();
                }}
                key={Number(index)}
                className={`grid grid-cols-[30px_auto] text-left hover:bg-gray-100 py-3 px-2 rounded-md ${
                    item.label === selected ? "bg-secondary-100" : ""
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
                <p className="text-sm">{item.label}</p>
            </button>
        ))}
    </div>
);

export default function CountryDropdown({
    items,
    id,
    required,
    errors,
    inputLabel,
    labelCss,
    selectedCountry,
    onSelectCountry,
}: CountryDropdownProps) {
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(!open);

    return (
        <CustomDropdown
            open={open}
            onOpenChange={setOpen}
            actionChildren={
                <DropdownButton
                    id={id}
                    errors={errors}
                    required={required}
                    inputLabel={inputLabel}
                    labelCss={labelCss}
                    label={selectedCountry?.label as string}
                    iso={selectedCountry?.iso_2 as string}
                    isOpen={open}
                    toggleOpen={toggleDropdown}
                />
            }
            renderChildren={
                <DropdownItems
                    items={items}
                    selected={selectedCountry?.label as string}
                    onSelectCountry={onSelectCountry}
                    toggleOpen={toggleDropdown}
                />
            }
        />
    );
}
