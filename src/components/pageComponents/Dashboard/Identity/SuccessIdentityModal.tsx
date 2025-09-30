"use client";

import Image from "next/image";
import { Button, Divider } from "antd";
import { FaCheck } from "react-icons/fa6";
import Modal from "@/src/components/ui-components/Modal";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import useIdentityStore from "@/src/utils/store/identityStore";
import EachDetail from "@/src/components/blocks/EachDetail";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export default function SuccessIdentityModal({ isOpen, setIsOpen }: Props) {
    const { payload } = useIdentityStore();
    return (
        <Modal
            customWidth={500}
            closeIcon={null}
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
            }}
        >
            <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-[#ECFDF3] rounded-full flex flex-col items-center justify-center">
                    <div className="bg-[#DBFAE6] w-10 h-10 rounded-full flex flex-col items-center justify-center">
                        <div className="w-7 h-7 rounded-full">
                            <Image
                                src="/images/icons/check-circle.svg"
                                className="w-full"
                                width={1000}
                                height={1000}
                                alt="avatar"
                            />
                        </div>
                    </div>
                </div>

                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
                    }}
                />
            </div>

            <div className="mt-4">
                <h1 className="text-base font-medium text-[#101828]">Bank Verification Number</h1>
                <p className="text-[13px] text-[#475467] items-center flex gap-3">
                    Verification Status:{" "}
                    <Button
                        icon={<FaCheck />}
                        className="!bg-[#ECFDF3] !border !border-[#ABEFC6] !text-[#067647] !text-xs !rounded-3xl !py-[2px] px-3"
                    >
                        Success
                    </Button>
                </p>
            </div>

            <Divider className="mt-4" />

            <div className="w-full h-[150px] flex items-center justify-center">
                <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                    <Image
                        src={payload.idType === "bvn" ? payload.image ?? "" : payload.photo ?? ""}
                        className="w-full h-full rounded-full object-cover"
                        width={1000}
                        height={1000}
                        alt="avatar"
                    />
                </div>
            </div>

            <section className="bg-[#F7FCFC] p-5 rounded-md flex flex-col gap-7">
                <div className="flex items-center justify-between">
                    <EachDetail title="BVN" description={payload.bvn || "N/A"} position="left" />
                    <EachDetail title="NIN" description={payload.nin || "N/A"} position="right" />
                </div>

                <div className="flex items-center justify-between">
                    <EachDetail
                        title="Full name"
                        description={
                            `${payload.firstName ?? "N/A"} ${payload.lastName ?? "N/A"} ${
                                payload.middleName ?? "N/A"
                            }` || "N/A"
                        }
                        position="left"
                    />
                    <EachDetail title="Gender" description={payload.gender ?? "N/A"} position="right" />
                </div>

                <div className="flex items-center justify-between">
                    <EachDetail title="Date of birth" description={`${payload.dateOfBirth || "N/A"}`} position="left" />
                    <EachDetail title="Email" description={payload.email ?? "N/A"} position="right" />
                </div>

                <div className="flex items-center justify-between">
                    <EachDetail
                        title="Residential address"
                        description={`${payload.residentialAddress ?? "N/A"}`}
                        position="left"
                    />
                    <EachDetail title="Marital status" description={payload.maritalStatus ?? "N/A"} position="right" />
                </div>

                <div className="flex items-center justify-between">
                    <EachDetail title="Phone number" description={`${payload.phoneNumber1 ?? "N/A"}`} position="left" />
                    <EachDetail
                        title="Origin location"
                        description={`${payload.lgaOfOrigin}, ${payload.stateOfOrigin}`}
                        position="right"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <EachDetail
                        title="Registered on"
                        description={`${payload.registrationDate ?? "N/A"}`}
                        position="left"
                    />
                    <EachDetail
                        title="Origin location"
                        description={`${payload.firstName ?? "N/A"} ${payload.lastName ?? "N/A"} ${
                            payload.middleName ?? "N/A"
                        }`}
                        position="right"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <EachDetail
                        title="Registered on"
                        description={`${payload.registrationDate ?? "N/A"}`}
                        position="left"
                    />
                    <EachDetail
                        title="Origin location"
                        description={`${payload.lgaOfOrigin ?? "N/A"}, ${payload.stateOfOrigin ?? "N/A"}`}
                        position="right"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <EachDetail title="Nationality" description={`${payload.nationality ?? "N/A"}`} position="left" />
                    <EachDetail title="Watchlisted" description={payload.watchListed ?? "N/A"} position="right" />
                </div>
            </section>
        </Modal>
    );
}
