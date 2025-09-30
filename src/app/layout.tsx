import "./globals.scss";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import localFont from "next/font/local";
import { ConfigProvider } from "antd";
import AppProgressBar from "../components/blocks/app-progress-bar";
import { NotificationProvider } from "../components/blocks/toast-notification";

const grotesk = localFont({
    src: [
        {
            path: "../../public/fonts/SchibstedGrotesk-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/SchibstedGrotesk-Medium.ttf",
            weight: "500",
            style: "medium",
        },
        {
            path: "../../public/fonts/SchibstedGrotesk-SemiBold.ttf",
            weight: "600",
            style: "semi-bold",
        },
        {
            path: "../../public/fonts/SchibstedGrotesk-Bold.ttf",
            weight: "700",
            style: "bold",
        },
        {
            path: "../../public/fonts/SchibstedGrotesk-ExtraBold.ttf",
            weight: "900",
            style: "extra-bold",
        },
    ],
});

export const metadata: Metadata = {
    title: "Flick",
    description: "Open Banking solution powering data and real-time global payment",
    icons: {
        icon: "/images/flick-logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/images/flick-logo.svg" sizes="any" />
            <body className={`${grotesk.className} antialiased`}>
                <AntdRegistry>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#2F9792",
                                ...grotesk.style,
                            },
                        }}
                    >
                        <NotificationProvider>
                            <AppProgressBar />
                            {children}
                        </NotificationProvider>
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
