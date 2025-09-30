"use client";

import { motion } from "framer-motion";
import Drawer from "@/src/components/ui-components/Drawer";

import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import CustomIcon from "@/src/components/blocks/CustomIcon";

interface NotificationsProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, setIsOpen }) => {
    const notifications = [
        {
            tag: "Read",
            content:
                "Payment of $250 was successfully processed. Your balance has been updated accordingly. You can view the details in your transaction history.",
            date: "2 mins ago",
        },
        {
            tag: "New",
            content:
                "Your account has been credited with $500. This amount has been added to your available balance. Please check your account for confirmation.",
            date: "10 mins ago",
        },
        {
            tag: "New",
            content:
                "Transfer of $120 to John Doe completed. The recipient has been notified. You can view the receipt in your email or transaction history.",
            date: "30 mins ago",
        },
        {
            tag: "Read",
            content:
                "Subscription renewed for $50. Your next billing cycle will be on the 15th of next month. A detailed invoice has been sent to your email.",
            date: "1 hour ago",
        },
        {
            tag: "New",
            content:
                "Pending payment of $75 is due tomorrow. Please ensure sufficient funds in your account to avoid penalties. You can make the payment early if desired.",
            date: "3 hours ago",
        },
        {
            tag: "Read",
            content:
                "Refund of $30 has been issued. The amount should reflect in your account within 3-5 business days. Please check with your bank if the refund is delayed.",
            date: "Yesterday",
        },
    ];

    return (
        <Drawer className="!relative" closeIcon={null} open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="absolute top-4 right-4">
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>
            <div className="mt-6">
                <div className="">
                    <h1 className="text-base font-semibold text-[#475467]">Notifications</h1>
                    <p className="text-[13px] text-[#8C8F97] font-normal">Here’s a summary of your notifications.</p>
                </div>

                <div className="h-[40vh] flex flex-col items-center justify-center">
                    <CustomIcon path="/images/icons/empty-flick-state.svg" className="w-32" />
                    <p className="text-[#8C8F97] text-xs w-[60%] text-center mt-2">
                        You&apos;re all caught up! No notifications for now.
                    </p>
                </div>
            </div>
        </Drawer>
    );
};

export default Notifications;
