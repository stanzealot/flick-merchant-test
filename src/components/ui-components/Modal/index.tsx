"use client";

import { Modal as AntModal, ModalProps } from "antd";
import "./Modal.css";

interface IProps extends ModalProps {
    icon?: React.ReactNode;
    customWidth?: number;
    zeroPadding?: boolean;
}

const Modal: React.FC<IProps> = (props) => {
    const { children, className, style, customWidth } = props;
    return (
        <AntModal
            {...props}
            className={`trade-modal ${className} z-[1000] hidden md:block`}
            centered
            footer={null}
            style={{
                ...style,
            }}
            width={customWidth}
        >
            {children}
        </AntModal>
    );
};

export default Modal;
