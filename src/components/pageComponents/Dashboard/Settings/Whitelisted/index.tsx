"use client";

import { Button } from "antd";
import { LuPlus } from "react-icons/lu";
import { useSettingsStore } from "@/src/utils/store/settingsStore";
import AddIPAddressModal from "./AddIPAddressModal";
import useGetProfileSettings from "@/src/app/api/hooks/authentication/useGetProfileSettings";

const Whitelisted = () => {
    const { openAddIPAddress, setOpenAddIPAddress } = useSettingsStore();
    const { data } = useGetProfileSettings();

    return (
        <div className="w-full mb-10">
            <div className="flex items-center justify-between border border-[#EAECF0] border-x-0 border-t-0 pb-5">
                <div className="flex items-center gap-6">
                    <h2 className="text-[15px] font-semibold text-[#1A1A1A]">IP address</h2>
                </div>
                <Button
                    onClick={() => {
                        setOpenAddIPAddress(true);
                    }}
                    type="primary"
                    className="!h-[41px] !px-5 !bg-primary-600 !rounded-xl"
                    icon={<LuPlus size={17} />}
                    iconPosition="end"
                >
                    Add IP address
                </Button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
                {data?.data?.whiteListedIp?.map((item: any, index: number) => (
                    <div className="py-3 text-sm font-medium" key={Number(index)}>
                        {item}
                    </div>
                ))}
            </div>

            <AddIPAddressModal isOpen={openAddIPAddress} setIsOpen={setOpenAddIPAddress} />
        </div>
    );
};

export default Whitelisted;
