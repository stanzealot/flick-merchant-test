"use client";

interface IProps {
    children: React.ReactNode;
}

const DashboardPageLayout: React.FC<IProps> = ({ children }: IProps) => {
    return <div>{children}</div>;
};

export default DashboardPageLayout;
