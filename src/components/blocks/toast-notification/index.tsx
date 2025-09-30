"use client";

import { notification } from "antd";
import { HiLightBulb } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import React, { createContext, useCallback, useContext } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationProps {
    type: NotificationType;
    message: string;
    description?: string | React.ReactNode;
    placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

const NotificationContext = createContext<(props: NotificationProps) => void>(() => {});

export const useNotification = () => useContext(NotificationContext);

let globalNotification: (props: NotificationProps) => void;

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = useCallback(
        ({ type, message, description, placement = "topRight" }: NotificationProps) => {
            let icon;
            switch (type) {
                case "info":
                    icon = <HiLightBulb size={18} style={{ color: "#1a73e8" }} />;
                    break;
                case "error":
                    icon = <MdCancel size={18} style={{ color: "#C10000" }} />;
                    break;
                case "success":
                    icon = <IoIosCheckmarkCircle size={18} style={{ color: "#259792" }} />;
                    break;
                default:
                    break;
            }

            api[type]({
                message: <div style={{ fontSize: "13.5px", color: "#475467", fontWeight: "500" }}>{message}</div>,
                description,
                placement,
                icon,
                style: {
                    width: 300,
                    padding: "12px",
                    height: "auto",
                },
            });
        },
        [api]
    );

    globalNotification = openNotification;

    return (
        <NotificationContext.Provider value={openNotification}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export const openGlobalNotification = (props: NotificationProps) => {
    if (globalNotification) {
        globalNotification(props);
    }
};
