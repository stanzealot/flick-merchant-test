"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Skeleton } from "antd";
import { motion } from "framer-motion";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import CustomIcon from "@/src/components/blocks/CustomIcon";
import Drawer from "@/src/components/ui-components/Drawer";
import useOutflowStore from "@/src/utils/store/outflowStore";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";
import { getFirstLetterOfWords } from "@/src/utils/functions";
import EaseWrapper from "@/src/components/blocks/Wrappers/EaseWrapper";
import useGetBeneficiaries from "@/src/app/api/hooks/topMenuHooks/useGetBeneficiaries";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

type BeneficiaryData = {
    beneficiary_name: string;
    account_no: string;
    bank_name: string;
    beneficiary_country: string;
};

const BeneficiaryDrawer: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const { data, isLoading } = useGetBeneficiaries();
    const { setOpenPayout, setOpenBeneficiary, setBeneficiaryPayload } = useOutflowStore();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBeneficiaries = useMemo(() => {
        return (
            data?.data?.filter(
                (item: BeneficiaryData) =>
                    item.beneficiary_country === "Nigeria" &&
                    (item.beneficiary_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.account_no.includes(searchQuery) ||
                        item.bank_name.toLowerCase().includes(searchQuery.toLowerCase()))
            ) || []
        );
    }, [data, searchQuery]);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
        []
    );

    return (
        <Drawer open={isOpen} closeIcon={null} onClose={() => setIsOpen(false)}>
            <div className="absolute top-5 left-5">
                <BackButton
                    onClick={() => {
                        setOpenBeneficiary(false);
                        setOpenPayout(true);
                    }}
                />
            </div>

            {isLoading ? (
                <Skeleton active />
            ) : data?.data?.filter((item: BeneficiaryData) => item.beneficiary_country === "Nigeria")?.length === 0 ? (
                <div className="flex flex-col justify-center items-center bg-[#F7FCFC] h-72 w-full mt-10 p-5">
                    <CustomIcon path="/images/icons/empty-flick-state.svg" className="w-[150px]" />
                    <h1 className="font-semibold text-[13px] text-center">No Beneficiaries yet</h1>
                    <p className="text-[11px] mt-2 text-[#9E9E9E] text-center">
                        It is necessary to perform transactions on your Flick account beforehand
                    </p>
                </div>
            ) : (
                <div className="mt-12">
                    <div className="mb-5">
                        <h1 className="text-[#101828] text-base font-semibold">Select Beneficiaries</h1>
                        <p className="text-[#475467] text-xs mt-1">
                            Here is an overview of the accounts you’ve already added as beneficiaries
                        </p>
                    </div>
                    <div className="relative my-4">
                        <CiSearch size={16} className="text-[#8C8F97] absolute top-[12px] left-2" />
                        <input
                            onChange={handleSearchChange}
                            className="text-[11px] w-full outline-none border border-[#EAECF0] rounded-md pl-7 px-3 py-3 focus:border-primary-500 hover:border-primary-500"
                            type="search"
                            placeholder="Filter by name or account number"
                        />
                    </div>

                    <EaseWrapper className="flex flex-col gap-4 bg-[#F7FCFC] rounded-xl px-3 py-5">
                        {filteredBeneficiaries.length === 0 ? (
                            <div className="text-center">
                                <h1 className="font-medium text-[13px]">No results found</h1>
                            </div>
                        ) : (
                            filteredBeneficiaries.map((item: any, index: number) => (
                                <motion.button
                                    key={index}
                                    onClick={() => {
                                        console.log(item);

                                        setBeneficiaryPayload({
                                            beneficiary_name: item.beneficiary_name,
                                            account_no: item.account_no,
                                            bank_name: item.bank_name,
                                        });
                                        setOpenBeneficiary(false);
                                        setOpenPayout(true);
                                    }}
                                    className="bg-white group !h-[60px] grid grid-cols-[50px_auto] items-center !px-3 !text-left !border-none hover:!bg-primary-500 hover:!text-white gap-2 !w-full py-2 rounded-md custom-shadow transition-all duration-200 ease-in"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    <div className="w-[40px] h-[40px] rounded-full group-hover:bg-white bg-primary-500 group-hover:text-primary-500 text-white font-semibold flex items-center justify-center">
                                        {getFirstLetterOfWords(item.beneficiary_name)}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h1 className="font-semibold text-[13px]">{item.beneficiary_name}</h1>
                                            <p className="text-[11.7px] font-normal group-hover:text-white text-[#666666]">
                                                {item.bank_name} | {item.account_no}
                                            </p>
                                        </div>
                                        <MdOutlineArrowForwardIos
                                            className="font-normal group-hover:text-white text-[#666666]"
                                            size={12}
                                        />
                                    </div>
                                </motion.button>
                            ))
                        )}
                    </EaseWrapper>
                </div>
            )}
        </Drawer>
    );
};

export default BeneficiaryDrawer;
