import React from "react";
import { Switch as AntSwitch } from "antd";
import "./Switch.css";

export interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, ...props }) => {
    return (
        <AntSwitch
            checked={checked}
            onChange={onChange}
            {...props}
            className="bg-[#bcc2cb]"
        />
    );
};

export default Switch;
