import React from "react";
import { Dropdown } from "antd";

interface DropdownProps {
    open: boolean;
    renderChildren: React.ReactNode;
    actionChildren: React.ReactNode;
    onOpenChange: (open: boolean) => void;
    action?: any;
}

const CustomDropdown: React.FC<DropdownProps> = ({
    open,
    renderChildren,
    onOpenChange,
    actionChildren,
    action = "click",
}) => {
    return (
        <Dropdown
            open={open}
            onOpenChange={onOpenChange}
            trigger={[action]}
            placement="bottom"
            dropdownRender={() => renderChildren}
        >
            {actionChildren}
        </Dropdown>
    );
};

export default CustomDropdown;
