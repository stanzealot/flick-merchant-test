"use client";

import { ButtonProps } from "antd";
import { MdArrowBack } from "react-icons/md";

interface IBackProps extends ButtonProps {
    css?: string;
    onClick?: () => void;
}

const BackButton: React.FC<IBackProps> = (props) => {
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
            <MdArrowBack className="text-[#95939f] hover:!text-[#6e6c77] " size={15} />
        </button>
    );
};

export default BackButton;
