"use client";

interface IContainerProps {
    children: React.ReactNode;
}

const CustomContainer: React.FC<IContainerProps> = ({ children }) => {
    return <div className="max-w-[1440px] mx-auto">{children}</div>;
};

export default CustomContainer;
