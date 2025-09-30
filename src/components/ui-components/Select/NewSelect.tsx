"use client";

import React, { useState } from "react";
import { Select as AntSelect, SelectProps, Empty } from "antd";
import CustomIcon from "../../blocks/CustomIcon";
import "./select.css";
import clsx from "clsx";

interface IProps extends SelectProps {
    errors?: Record<string, any>;
    name: string;
    showSearch?: boolean;
    label?: string;
    id: string;
    register?: any;
    emptyState?: string;
    emptyText?: string;
    index?: number;
    fieldName?: string;
    objectName?: string;
    required?: boolean;
    labelClass?: string;
}

const NewSelect: React.FC<IProps> = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState<boolean | null>(null);
    const {
        className,
        label,
        id,
        placeholder,
        // onChange,
        onSearch,
        options,
        style,
        errors,
        name,
        emptyState,
        emptyText,
        disabled,
        fieldName,
        objectName,
        index,
        register,
        labelClass,
        showSearch = true,
        required = false,
        ...rest
    } = props;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setIsFocused(true);
        setIsInputEmpty(inputValue.length === 0);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setIsFocused(false);
        setIsInputEmpty(inputValue.length === 0);
    };

    return (
        <div className="w-full flex flex-col relative">
            <label htmlFor={id} className={clsx(labelClass, `text-sm text-secondary-700 mb-[6px] block`)}>
                {label}
                {required && <span className="text-primary-600 ml-1">*</span>}
            </label>
            <AntSelect
                {...(register && register(id))}
                className={`${className}`}
                style={style}
                showSearch={showSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
                notFoundContent={
                    emptyState ? (
                        <div className="mx-auto flex flex-col justify-center items-center">
                            <CustomIcon path={emptyState} className="w-10" />
                            <h1 className="text-xs mt-5 mb-3">{"/images/icons/empty-flick-state.svg"}</h1>
                        </div>
                    ) : (
                        <Empty description="No data" />
                    )
                }
                disabled={disabled}
                placeholder={placeholder}
                // onChange={onChange}
                onSearch={onSearch}
                options={options}
                {...rest}
            />

            {errors?.[id]?.message && (
                <p className="text-[10px] absolute bottom-[-14px] text-danger-500">{errors[id].message}</p>
            )}
        </div>
    );
};

export default NewSelect;
