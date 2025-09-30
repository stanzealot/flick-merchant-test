"use client";

import { ChangeEvent, useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    value?: string | number;
    onChange?: any;
    errors?: Record<string, any>;
    disabled?: boolean;
    labelCss?: string;
    name: string;
    inputCss?: string;
    register: any;
}

const SimpleInput: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    errors,
    disabled = false,
    onChange,
    labelCss,
    register,
    name,
    inputCss,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState<boolean | null>(null);

    const togglePassword = () => setShowPassword((prev) => !prev);
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        // Remove any minus or decimal characters if pasted or input in other ways
        if (type === "number") {
            const sanitizedValue = inputValue.replace(/[-.]/g, "");
            if (sanitizedValue !== inputValue) {
                // If there were any invalid characters, update the input value
                event.target.value = sanitizedValue;
            }

            // Manually trigger the change event to update the state with the sanitized value
            event.target.dispatchEvent(new Event("input", { bubbles: true }));
        }

        if (onChange) {
            onChange(event);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "-" || event.key === "." || event.key === "e") {
            event.preventDefault();
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        setIsInputEmpty(inputValue.length === 0);
    };

    return (
        <div className="relative">
            {type === "password" && (
                <span onClick={togglePassword} className="absolute cursor-pointer right-3 top-4">
                    {showPassword ? <VscEye /> : <VscEyeClosed />}
                </span>
            )}
            <input
                {...register(name)}
                {...(onChange && { onChange: handleInput })}
                type={inputType}
                id={id}
                name={name}
                placeholder=" "
                onBlur={handleBlur}
                disabled={disabled}
                onKeyDown={type === "number" ? handleKeyDown : undefined}
                className={`${inputCss} peer text-[13.5px] h-10 w-full px-2 rounded-md border border-1 border-gray-300 text-gray-700 placeholder-transparent focus:outline-none focus:border-primary-500`}
                {...rest}
            />
            <label
                htmlFor={id}
                className={`absolute px-1 py-[1px] left-1 text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:text-[12px]
                         peer-placeholder-shown:left-[16px] peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-gray-500
                          peer-focus:top-[-9px] peer-focus:bg-white peer-focus:text-[10px] peer-focus:text-primary-500 ${
                              isInputEmpty === null && `top-[-9px] ${labelCss} text-[10px] text-primary-500`
                          } ${isInputEmpty === false && `top-[-9px] ${labelCss} text-[10px] text-primary-500`}`}
            >
                {label}
            </label>
            {errors?.[id]?.message && (
                <p className="text-[9px] absolute bottom-[-14px] text-[#c10000]">{errors[id].message}</p>
            )}
        </div>
    );
};

export default SimpleInput;
