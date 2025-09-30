"use client";

import Image from "next/image";
import CustomDropdown from "../../ui-components/CustomDropdown";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

type ItemProps = {
    value: string;
    iso_2: string;
    phone_code: string;
};

type DropdownButtonProps = {
    phoneCode: string;
    iso: string;
    isOpen: boolean;
    toggleOpen: () => void;
};

type DropdownItemsProps = {
    items: ItemProps[];
    selected: string;
    onSelectPhoneCode?: (item: ItemProps) => void;
    toggleOpen: () => void;
};

type PhoneDropdownProps = {
    items: ItemProps[];
    selectedPhoneCode?: ItemProps;
    onSelectPhoneCode?: (item: ItemProps) => void;
};

const DropdownButton = ({ phoneCode, iso, isOpen, toggleOpen }: DropdownButtonProps) => (
    <button
        className="w-[90px] gap-1 grid grid-cols-[30%_auto] items-center h-full !rounded-md px-2 py-2"
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
            <p className="text-sm">{phoneCode}</p>
            <p className="text-xs">{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
        </div>
    </button>
);

// Reusable dropdown items
const DropdownItems = ({ items, selected, onSelectPhoneCode, toggleOpen }: DropdownItemsProps) => (
    <div className="w-[90px] px-1 py-2 custom-shadow bg-white !rounded-md flex flex-col gap-2">
        {items.map((item, index) => (
            <button
                onClick={() => {
                    onSelectPhoneCode && onSelectPhoneCode(item);
                    toggleOpen();
                }}
                key={Number(index)}
                className={`grid grid-cols-[30%_auto] hover:bg-gray-100 py-1 px-2 rounded-md ${
                    item.value === selected ? "bg-blue-50" : ""
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

export default function PhoneDropdown({ items, selectedPhoneCode, onSelectPhoneCode }: PhoneDropdownProps) {
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(!open);

    return (
        <CustomDropdown
            open={open}
            onOpenChange={setOpen}
            actionChildren={
                <DropdownButton
                    phoneCode={selectedPhoneCode?.value as string}
                    iso={selectedPhoneCode?.iso_2 as string}
                    isOpen={open}
                    toggleOpen={toggleDropdown}
                />
            }
            renderChildren={
                <DropdownItems
                    items={items}
                    selected={selectedPhoneCode?.value as string}
                    onSelectPhoneCode={onSelectPhoneCode}
                    toggleOpen={toggleDropdown}
                />
            }
        />
    );
}
