"use client";

import CustomIcon from "@/src/components/blocks/CustomIcon";
import { Button } from "antd";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

const NoKycComponent = () => {
    const items = [
        {
            title: "Collections",
            path: "/images/icons/merchant-payment-desktop-arrow-down-left.svg",
            link: "#!",
            description: "Accept payments via direct bank accounts, cards and bank transfers",
        },
        {
            title: "Pay-Outs",
            path: "/images/icons/merchant-payment-desktop-trend-up-02.svg",
            link: "#!",
            description: "Easy and efficient payouts and transfers to local banks",
        },
        {
            title: "Recurring Payments",
            path: "/images/icons/merchant-payment-desktop-refresh-cw-02.svg",
            link: "#!",
            description: "Accept one-time and recurring payments in multiple currencies",
        },
        {
            title: "Instant Settlement",
            path: "/images/icons/merchant-payment-desktop-clock-stopwatch.svg",
            link: "#!",
            description: "Quick and automated settlements into wallets or bank accounts",
        },
        {
            title: "Multi-Currency",
            path: "/images/icons/merchant-payment-desktop-vuesax-linear-vuesax-linear-buy-crypto.svg",
            link: "#!",
            description: "Accept payment and manage balances  across several currencies",
            isBorder: false,
        },
        {
            title: "Payment Links",
            path: "/images/icons/merchant-payment-desktop-link-03.svg",
            link: "#!",
            description: "Receive payments without a single line of code",
            isBorder: false,
        },
    ];
    return (
        <div>
            <div className="px-5 py-6 bg-white rounded-xl">
                <div className="flex items-center justify-between">
                    <button className="rounded-3xl px-[4px] font-semibold border border-[#ABEFC6] bg-[#ECFDF3] text-[#067647] py-1 text-[12px]">
                        Flick Payment
                    </button>
                    <Button
                        icon={<MdOutlineArrowOutward size={17} />}
                        iconPosition="end"
                        className="!px-5 !rounded-[10px] !text-white !text-[13px] !border-none !h-[43px] !bg-primary-500 hover:!bg-primary-600"
                    >
                        Request access
                    </Button>
                </div>

                <div className="mt-8">
                    <h1 className="text-2xl text-[#1A1A1A] font-semibold">Power the future of payments with Flick </h1>
                    <p className="text-[13px] text-[#999999] mt-4 leading-6">
                        Access all you need to carry out seamless payments activities. Build better payment flows and
                        smooth online transaction <br /> experience with Flick payment products
                    </p>
                </div>
            </div>

            <div className="px-5 py-6 bg-white rounded-xl mt-10 grid grid-cols-[40%_55%] gap-[5%]">
                <div>
                    <CustomIcon path="/images/dashboard/kycPhone.svg" className="w-[85%] mx-auto" />
                </div>
                <div>
                    <h1 className="text-[21px] text-[#1A1A1A] font-semibold">Explore our core products</h1>
                    <div className="grid grid-cols-2 mt-6 gap-10">
                        {items.map((item, index: number) => (
                            <EachLink
                                key={Number(index)}
                                title={item.title}
                                path={item.path}
                                link={item.link}
                                description={item.description}
                                isBorder={item.isBorder}
                            />
                        ))}
                    </div>

                    <div className="flex justify-end mt-10">
                        <Button
                            icon={<MdOutlineArrowOutward size={17} />}
                            iconPosition="end"
                            className="!px-5 !rounded-[10px] !text-white !text-[13px] !border-none !h-[43px] !bg-primary-500 hover:!bg-primary-600"
                        >
                            Explore API docs
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EachLink = ({
    path,
    title,
    description,
    link,
    isBorder = true,
}: {
    path: string;
    title: string;
    description: string;
    link: string;
    isBorder?: boolean;
}) => {
    return (
        <Link
            href={link}
            className={`hover:bg-gray-50 grid grid-cols-[25px_auto] gap-4 ${
                isBorder ? "border border-[#EAECF0] border-x-0 border-t-0" : ""
            }`}
        >
            <CustomIcon path={path} className="w-4" />
            <div>
                <h1 className="text-[#1A1A1A] font-medium">{title}</h1>
                <p className="text-[#8C8F97] mb-3 text-[13px] mt-2">{description}</p>
            </div>
        </Link>
    );
};

export default NoKycComponent;
