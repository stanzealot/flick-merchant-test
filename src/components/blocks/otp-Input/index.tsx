/* eslint-disable no-unused-vars */
"use client";

import React, { memo, useState, useCallback, CSSProperties } from "react";
import SingleInput from "./SingleInput";

interface IProps {
    length: number;
    onChangeOTP: (otp: string) => void;
    autoFocus?: boolean;
    isNumberInput?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
    className?: string;
    inputStyle?: CSSProperties;
    inputClassName?: string;
    type?: string;
}

const OTPInputComponent: React.FC<IProps> = (props: IProps) => {
    const { length, isNumberInput, autoFocus, disabled, type, onChangeOTP, inputClassName, inputStyle, ...rest } =
        props;

    const [activeInput, setActiveInput] = useState(0);
    const [otpValues, setOTPValues] = useState(Array(length).fill(""));

    const handleOtpChange = useCallback(
        (otp: any) => {
            const otpValue = otp.join("");
            onChangeOTP(otpValue);
        },
        [onChangeOTP]
    );

    const getRightValue = useCallback(
        (str: any) => {
            const changedValue = str;
            if (!isNumberInput) {
                return changedValue;
            }
            return !changedValue || /\d/.test(changedValue) ? changedValue : "";
        },
        [isNumberInput]
    );

    const changeCodeAtFocus = useCallback(
        (str: any) => {
            const updatedOTPValues = [...otpValues];
            updatedOTPValues[activeInput] = str[0] || "";
            setOTPValues(updatedOTPValues);
            handleOtpChange(updatedOTPValues);
        },
        [activeInput, handleOtpChange, otpValues]
    );

    const focusInput = useCallback(
        (inputIndex: any) => {
            const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
            setActiveInput(selectedIndex);
        },
        [length]
    );

    const focusPrevInput = useCallback(() => {
        focusInput(activeInput - 1);
    }, [activeInput, focusInput]);

    const focusNextInput = useCallback(() => {
        focusInput(activeInput + 1);
    }, [activeInput, focusInput]);

    const handleOnFocus = useCallback(
        (index: any) => () => {
            focusInput(index);
        },
        [focusInput]
    );

    const handleOnChange = useCallback(
        (e: any) => {
            const val = getRightValue(e.currentTarget.value);
            if (!val) {
                e.preventDefault();
                return;
            }
            changeCodeAtFocus(val);
            focusNextInput();
        },
        [changeCodeAtFocus, focusNextInput, getRightValue]
    );

    const onBlur = useCallback(() => {
        setActiveInput(-1);
    }, []);

    const handleOnKeyDown = useCallback(
        (e: any) => {
            switch (e.key) {
                case "Backspace":
                case "Delete": {
                    e.preventDefault();
                    if (otpValues[activeInput]) {
                        changeCodeAtFocus("");
                    } else {
                        focusPrevInput();
                    }
                    break;
                }
                case "ArrowLeft": {
                    e.preventDefault();
                    focusPrevInput();
                    break;
                }
                case "ArrowRight": {
                    e.preventDefault();
                    focusNextInput();
                    break;
                }
                case " ": {
                    e.preventDefault();
                    break;
                }
                default:
                    break;
            }
        },
        [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
    );

    const handleOnPaste = useCallback(
        (e: any) => {
            e.preventDefault();
            const pastedData = e.clipboardData
                ?.getData("text/plain")
                .trim()
                .slice(0, length - activeInput)
                .split("");
            if (pastedData) {
                let nextFocusIndex = 0;
                const updatedOTPValues = [...otpValues];
                updatedOTPValues.forEach((val, index) => {
                    if (index >= activeInput) {
                        const changedValue = getRightValue(pastedData.shift() || val);
                        if (changedValue) {
                            updatedOTPValues[index] = changedValue;
                            nextFocusIndex = index;
                        }
                    }
                });
                setOTPValues(updatedOTPValues);
                handleOtpChange(updatedOTPValues);
                setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
            }
        },
        [activeInput, getRightValue, length, otpValues, handleOtpChange]
    );

    return (
        <div {...rest}>
            {Array(length)
                .fill("")
                .map((_, index) => (
                    <SingleInput
                        key={`SingleInput-${index.toString()}`}
                        focus={activeInput === index}
                        value={otpValues && otpValues[index]}
                        autoFocus={autoFocus}
                        onFocus={handleOnFocus(index)}
                        onChange={handleOnChange}
                        onKeyDown={handleOnKeyDown}
                        type={type}
                        onBlur={onBlur}
                        onPaste={handleOnPaste}
                        style={inputStyle}
                        // className={inputClassName}
                        className={`${
                            otpValues && otpValues[index] ? "border-2 border-primary-410" : "border-2 border-gray-300"
                        } ${inputClassName}`}
                        disabled={disabled}
                        index={index}
                    />
                ))}
        </div>
    );
};

const OTPInput = memo(OTPInputComponent);

OTPInputComponent.defaultProps = {
    autoFocus: false,
    className: "",
    disabled: false,
    inputClassName: "",
    inputStyle: {},
    isNumberInput: false,
    style: {},
    type: "text",
};

export default OTPInput;
