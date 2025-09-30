"use client";

import { Button } from "antd";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import Image from "next/image";
import Modal from "@/src/components/ui-components/Modal";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";
import useOverviewStore from "@/src/utils/store/overviewStore";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useGetPaymentCards from "@/src/app/api/hooks/overview/useGetPaymentCards";
import overview from "@/src/app/api/services/overview";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    type: string;
};

export default function CardListModal({ isOpen, setIsOpen, type }: Readonly<Props>) {
    const {
        setOpenBalance,
        setOpenFundPayout,
        setOpenAddCardModal,
        setFundPayload,
        fundPayload,
        setOpenPaymentOtp,
        setOpenPaymentPinModal,
        setOpenFundApiWallet,
    } = useOverviewStore();

    const { data, isLoading } = useGetPaymentCards();
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [selectedCard, setSelectedCard] = useState<{
        cardId: string;
        cardDetails: string;
        cardType: string;
        cardLastFour: string;
    }>({
        cardId: "",
        cardDetails: "",
        cardType: "",
        cardLastFour: "",
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);

        try {
            const response = await overview.charge({
                cardDetails: selectedCard.cardDetails,
                transactionId: fundPayload.transactionId,
                ...(type === "api" ? { dest: "apiWallet" } : {}),
            });

            if (response.statusCode !== 200) {
                setLoading(false);
                return openGlobalNotification({
                    description: "",
                    message: "Failure",
                    type: "error",
                });
            }

            if (response.authorizationMode === "pin") {
                setIsOpen(false);
                setLoading(false);
                setOpenPaymentPinModal(true);
            } else if (response.authorizationMode === "otp") {
                setIsOpen(false);
                setOpenPaymentOtp(true);
                setLoading(false);
            } else if (response.authorizationMode === "avs_noauth") {
                setLoading(false);
                return openGlobalNotification({
                    description: "Invalid debit card details",
                    message: "Transaction Failed",
                    type: "error",
                });
            }
        } catch (err) {
            setLoading(false);
            // console.log(err);
        }
    };

    return (
        <Modal
            customWidth={470}
            closeIcon={null}
            open={isOpen}
            onCancel={() => {
                setSelectedCard({
                    cardId: "",
                    cardDetails: "",
                    cardType: "",
                    cardLastFour: "",
                });
                setPaymentMethod("");
                setIsOpen(false);
                setOpenBalance(true);
            }}
        >
            <BackButton
                onClick={() => {
                    setSelectedCard({
                        cardId: "",
                        cardDetails: "",
                        cardType: "",
                        cardLastFour: "",
                    });
                    setIsOpen(false);
                    if (type === "pay-in") {
                        setOpenFundPayout(true);
                    } else {
                        setOpenFundApiWallet(true);
                    }
                }}
            />

            <div className="mt-4">
                <h1 className="text-sm font-medium text-[#101828]">Select Payment Method</h1>
                <p className="text-[13px] text-[#475467]">
                    Please choose the desired payment card for your transaction
                </p>
            </div>

            <div className="mt-7 flex flex-col gap-7 mb-2">
                {!isLoading && data?.data?.length < 1 ? (
                    <section className="bg-[#F7FCFC] rounded-xl p-5 h-[350px] flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="w-40">
                                <Image
                                    src="/images/icons/empty-flick-state.svg"
                                    className="w-full"
                                    alt="image"
                                    width={1000}
                                    height={1000}
                                />
                            </div>

                            <div className="text-center mx-auto w-[80%]">
                                <h1 className="text-base font-semibold  text-[#1A1A1A]">No Saved Card Yet</h1>
                                <p className="text-[13px] text-[#9E9E9E]">
                                    It is necessary to perform transactions on your Flick account beforehand.
                                </p>
                            </div>
                        </div>
                    </section>
                ) : (
                    data?.data?.map((card: any) => (
                        <div key={Number(card.cardId)} className="overflow-y">
                            <button
                                onClick={() => {
                                    setSelectedCard(card);
                                    setFundPayload({ ...fundPayload });
                                    // setPayoutMethod("card");
                                }}
                                className={`${
                                    selectedCard?.cardId === card?.cardId && "!border-primary-500"
                                } focus:!border-primary-500 focus:!bg-[#F7FCFC] hover:!border-primary-500 hover:!bg-[#F7FCFC] !h-[72px] group grid grid-cols-[50px_auto_16px] items-center !px-3 !text-left !border-[2px] group gap-2 !w-full py-2 rounded-lg transition-all duration-200 ease-in`}
                            >
                                <div className="w-[46px] h-[32px] border border-[#EAECF0] rounded-md">
                                    <Image
                                        src={`/images/icons/${card?.cardType?.toLowerCase()}-icon.svg`}
                                        className="w-full"
                                        alt="image"
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                                <div
                                    className={`${
                                        selectedCard?.cardId === card?.cardId && "text-primary-500"
                                    } group-focus:text-primary-500 group-hover:text-primary-500`}
                                >
                                    <h1 className="font-semibold text-sm">Visa ending in {card?.cardLastFour}</h1>
                                    {/* <p className="text-[13px] font-light text-[#666666]">Expiry 06/2024</p> */}
                                </div>
                            </button>
                        </div>
                    ))
                )}

                <Button
                    onClick={() => {
                        setIsOpen(false);
                        setOpenAddCardModal(true);
                    }}
                    icon={<GoPlus />}
                    className="!border-none !outline-none !w-[220px] !mx-auto"
                >
                    Add new payment card
                </Button>
            </div>

            <div className="mt-8 flex items-center justify-between">
                <Button
                    onClick={() => {
                        setSelectedCard({
                            cardId: "",
                            cardDetails: "",
                            cardType: "",
                            cardLastFour: "",
                        });
                        setPaymentMethod("");
                        setIsOpen(false);
                        setOpenBalance(true);
                        setLoading(false);
                    }}
                    className="!border !font-semibold !border-[#EAECF0] !h-[50px] !rounded-[12px] !w-[200px]"
                >
                    Cancel
                </Button>
                <Button
                    loading={loading}
                    onClick={() => {
                        console.log(selectedCard);
                        onSubmit();
                    }}
                    disabled={selectedCard?.cardId === ""}
                    className={`${
                        selectedCard?.cardId === "" ? "!bg-primary-300 " : "!bg-primary-500 hover:!bg-primary-700 "
                    } !border-none !font-semibold !h-[50px] !rounded-[12px]!text-sm !text-white !w-[200px]`}
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
}
