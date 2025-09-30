"use client";

import { ButtonProps } from "antd";
import { MdCancel } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface IBackProps extends ButtonProps {
    css?: string;
    onClick?: () => void;
}

const CloseButton: React.FC<IBackProps> = (props) => {
    const { onClick, css } = props;

    return (
        <button
            onClick={onClick}
            style={{
                borderRadius: "5px",
                height: "30px",
                width: "30px",
            }}
            className={`${css} !bg-[#f5f4f4] hover:!bg-[#e3e1e1] border-none flex justify-center items-center transition-all duration-300 ease-linear`}
        >
            <IoClose className="text-[#95939f] hover:!text-[#6e6c77]" size={15} />
        </button>
    );
};

export default CloseButton;
