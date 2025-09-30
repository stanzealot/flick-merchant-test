"use client";

import Image from "next/image";
import clsx from "clsx";
import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import useOverviewStore from "@/src/utils/store/overviewStore";
import { formatNumber } from "@/src/utils/functions";

const BalanceCard = ({
    iso,
    balance,
    label,
    bgColor,
    currencySymbol,
    onSelect,
}: {
    iso: string;
    balance: number | string;
    label: string;
    bgColor: string;
    currencySymbol: string;
    onSelect?: () => void;
}) => {
    const { setOpenBalance, setOpenFundWallet, setFundWalletPayload, setFundWalletArea } = useOverviewStore();
    return (
        <div className={clsx(bgColor, `w-[355px] max-w-[355px] h-[170px] px-5 py-3 rounded-xl flex flex-col`)}>
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 overflow-hidden rounded-full p-0">
                    <Image
                        src={`/images/flags/${iso}.svg`}
                        width={500}
                        height={500}
                        alt={"image"}
                        className="object-cover w-full h-full rounded-full transform scale-105"
                    />
                </div>
                <h1 className="text-sm font-semibold">{label}</h1>
            </div>

            <div className="mt-auto mb-0">
                <p className="text-[#7F91B4] text-[11px]">AVAILABLE BALANCE</p>
                <div className="flex items-center justify-between">
                    <h1 className="text-secondary-900 font-bold text-3xl">
                        {currencySymbol}
                        {formatNumber(Number(balance) / 100)}
                    </h1>

                    {["₦", "$", "£", "€"].includes(currencySymbol) && (
                        <Button
                            onClick={() => {
                                onSelect && onSelect();

                                setFundWalletArea("overview");
                                if (currencySymbol === "₦") {
                                    setFundWalletPayload({ currency: "NGN" });
                                    setOpenBalance(true);
                                } else if (currencySymbol === "$") {
                                    setFundWalletPayload({ currency: "USD" });
                                    setOpenFundWallet(true);
                                } else if (currencySymbol === "£") {
                                    setFundWalletPayload({ currency: "GBP" });
                                    setOpenFundWallet(true);
                                } else if (currencySymbol === "€") {
                                    setFundWalletPayload({ currency: "EUR" });
                                    setOpenFundWallet(true);
                                }
                            }}
                            className="!border-none !bg-transparent !outline-none !p-0 !w-[28px] !h-[28px] custom-shadow"
                        >
                            <FaArrowRight className="text-lg" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BalanceCard;
