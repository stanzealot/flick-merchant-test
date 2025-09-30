"use client";

import Image from "next/image";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import CustomDropdown from "../../ui-components/CustomDropdown";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

type ItemProps = {
    value: string;
    path: string;
    label: string;
};

type DropdownButtonProps = {
    id: string;
    setSearchedItems: (setSearchedItems: ItemProps[]) => void;
    errors?: Record<string, any>;
    required?: boolean;
    inputLabel?: string;
    label: string;
    path: string;
    isOpen: boolean;
    toggleOpen: () => void;
    items: ItemProps[];
};

type DropdownItemsProps = {
    searchedItems: ItemProps[];
    setSearchedItems: (setSearchedItems: ItemProps[]) => void;
    items: ItemProps[];
    selected: string;
    onSelectBank?: (item: ItemProps) => void;
    toggleOpen: () => void;
};

type CountryDropdownProps = {
    id: string;
    errors?: Record<string, any>;
    required?: boolean;
    inputLabel?: string;
    items: ItemProps[];
    selectedBank?: ItemProps;
    onSelectBank?: (item: ItemProps) => void;
};

const DropdownButton = ({
    inputLabel,
    id,
    errors,
    required,
    label,
    path,
    isOpen,
    toggleOpen,
    setSearchedItems,
    items,
}: DropdownButtonProps) => (
    <div className="h-[41px]">
        <label htmlFor={id} className="text-sm text-secondary-700 mb-[6px] block">
            {inputLabel}
            {required && <span className="text-primary-600 ml-1">*</span>}
        </label>
        <button
            className={`${
                path ? "grid grid-cols-[25px_auto]" : "flex items-center justify-between"
            } border bg-white hover:border-primary-500 hover:text-primary-500 border-secondary-100 focus:border-primary-500 focus:text-primary-500 w-full items-center gap-2 h-full !rounded-lg px-2 py-[6px]`}
            onClick={(e) => {
                e.preventDefault();
                toggleOpen();
                setSearchedItems(items);
            }}
        >
            {path ? (
                <div className="w-[25px] h-[25px] rounded-full overflow-hidden text-[#1E293B]">
                    <Image
                        src={`${path || "/images/icons/emojione-i.png"}`}
                        width={1000}
                        height={1000}
                        alt="country-img"
                        className="w-full h-full object-cover"
                        // style={{ transform: "scale(1.5, 1.9)" }}
                    />
                </div>
            ) : (
                <p className="text-xs text-[#6B7280]">Bank name</p>
            )}
            <div className="flex items-center justify-between">
                <p className="text-[12.5px]">{label}</p>
                <p className="text-xs text-secondary-400">{isOpen ? <SlArrowUp /> : <SlArrowDown />}</p>
            </div>
        </button>
        {errors?.[id]?.message && (
            <p className="text-[10px] absolute bottom-[-14px] text-danger-500">{errors[id].message}</p>
        )}
    </div>
);

// Reusable dropdown items
const DropdownItems = ({
    items,
    selected,
    onSelectBank,
    toggleOpen,
    setSearchedItems,
    searchedItems,
}: DropdownItemsProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filterItems = items.filter((item) => item.label.toLowerCase().includes(e.target.value));

        setSearchedItems(filterItems);
    };

    return (
        <div className="max-h-[360px] w-full px-1 py-2 custom-shadow bg-white !rounded-md flex flex-col gap-2 mt-2">
            <div className="relative px-2">
                <input
                    type="search"
                    placeholder="Search bank"
                    onChange={handleChange}
                    className="w-full outline-none border border-secondary-100 rounded-md px-2 py-2 text-xs"
                />
            </div>
            <div className="custom-scrollbar w-full px-2 flex flex-col gap-2">
                {searchedItems?.length > 0 &&
                    searchedItems.map((item, index) => (
                        <button
                            onClick={() => {
                                onSelectBank && onSelectBank(item);
                                toggleOpen();
                            }}
                            key={Number(index)}
                            className={`grid grid-cols-[20px_auto] w-full text-left hover:bg-gray-100 py-2 px-2 rounded-md gap-2 items-center ${
                                item.label === selected ? "bg-secondary-100" : ""
                            }`}
                        >
                            <div className="w-[20px] h-[20px] rounded-full overflow-hidden text-[#1E293B]">
                                <Image
                                    src={`${item.path}`}
                                    width={1000}
                                    height={1000}
                                    alt="country-img"
                                    // style={{ transform: "scale(1.5, 1.9)" }}
                                />
                            </div>
                            <p className="text-[12.5px]">{item.label}</p>
                        </button>
                    ))}

                {searchedItems?.length === 0 && (
                    <div className="flex items-center flex-col justify-center h-[70px] w-full">
                        <p className="text-xs">No Banks available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function BankDropdown({
    items,
    id,
    required,
    errors,
    inputLabel,
    selectedBank,
    onSelectBank,
}: CountryDropdownProps) {
    const [searchedItems, setSearchedItems] = useState<ItemProps[]>([]);
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(!open);

    return (
        <CustomDropdown
            open={open}
            onOpenChange={setOpen}
            actionChildren={
                <DropdownButton
                    id={id}
                    items={items}
                    setSearchedItems={setSearchedItems}
                    errors={errors}
                    required={required}
                    inputLabel={inputLabel}
                    label={selectedBank?.label as string}
                    path={selectedBank?.path as string}
                    isOpen={open}
                    toggleOpen={toggleDropdown}
                />
            }
            renderChildren={
                <DropdownItems
                    items={items}
                    searchedItems={searchedItems}
                    setSearchedItems={setSearchedItems}
                    selected={selectedBank?.label as string}
                    onSelectBank={onSelectBank}
                    toggleOpen={toggleDropdown}
                />
            }
        />
    );
}
