"use client";

import CustomIcon from "@/src/components/blocks/CustomIcon";
import { Button } from "antd";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

const NoDataKycComponent = () => {
    const items = [
        {
            title: "Identity",
            path: "/images/icons/merchant-desktop-users-03.svg",
            link: "#!",
            description: "Verify KYCs, Liveness Check and Onboard customers on the fly",
        },
        {
            title: "Accounts",
            path: "/images/icons/merchant-desktop-pie-chart-03.svg",
            link: "#!",
            description: "Easy account authentication and real-time balance checks ",
        },
        {
            title: "Transactions",
            path: "/images/icons/merchant-desktop-arrows-triangle.svg",
            link: "#!",
            description: "Access detailed transaction history to make informed decisions.",
        },
        {
            title: "Statement",
            path: "/images/icons/merchant-desktop-file-02.svg",
            link: "#!",
            description: "Retrieve periodic bank statements in flexible formats",
        },
        {
            title: "Credit Report",
            path: "/images/icons/merchant-desktop-speedometer-04.svg",
            link: "#!",
            description: "Get customer credit reports from all three Credit Bureaus in one place ",
            isBorder: true,
        },
        {
            title: "Analytics",
            path: "/images/icons/merchant-desktop-bar-chart-square-02.svg",
            link: "#!",
            description: "Generate analytics on connected accounts for informed decisions",
            isBorder: false,
        },
    ];
    return (
        <div>
            <div className="px-5 py-6 bg-white rounded-xl">
                <div className="flex items-center justify-between">
                    <button className="rounded-3xl px-[4px] font-semibold border border-[#ABEFC6] bg-[#ECFDF3] text-[#067647] py-1 text-[12px]">
                        Flick Data
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
                    <h1 className="text-2xl text-[#1A1A1A] font-semibold">Unlock the power of data with Flick </h1>
                    <p className="text-[13px] text-[#999999] mt-4 leading-6">
                        Easily access identities and financial information for your business. Our core products are
                        designed to empower your <br /> business, enhance your customer experiences, and drive
                        data-driven decisions.
                    </p>
                </div>
            </div>
            <div className="px-5 py-6 bg-white rounded-xl mt-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-[21px] text-[#1A1A1A] font-semibold">Explore our core products</h1>
                    <Button
                        icon={<MdOutlineArrowOutward size={17} />}
                        iconPosition="end"
                        className="!px-5 !rounded-[10px] !text-white !text-[13px] !border-none !h-[43px] !bg-primary-500 hover:!bg-primary-600"
                    >
                        See all our products
                    </Button>
                </div>
                <div className="grid grid-cols-[40%_55%] gap-[5%]">
                    <div>
                        <div className="grid grid-cols-1 mt-6 gap-7">
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
                    </div>
                    <div className="mt-10">
                        <CustomIcon path="/images/dashboard/kycBasket.svg" className="w-[65%] mx-auto" />
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

export default NoDataKycComponent;
