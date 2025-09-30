'use client';

import { ChangeEventHandler, useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import PhoneDropdown from '../../blocks/phone-dropdown';
import { ALL_CURRENCY, PHONE_CODES } from '@/src/utils/constants';
import './input.css';
import { twMerge } from 'tailwind-merge';
import { DatePicker } from 'antd';
import CurrencyDropdown, { CurrencyItemProps } from '../../blocks/currency-dropdown';

type PhoneProps = {
  iso_2: string;
  value: string;
  phone_code: string;
};

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  register?: any;
  errors?: Record<string, any>;
  value?: string | number;
  disabled?: boolean;
  required?: boolean;
  isPhone?: boolean;
  isCurrencyAmount?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isDate?: boolean;
  maxLength?: number;
  isTextArea?: boolean;
  disabledDate?: (current: any) => boolean;
  selectedPhoneCode?: PhoneProps;
  onSelectPhoneCode?: (selectedPhoneCode: PhoneProps) => void;
  selectedCurrency?: CurrencyItemProps;
  onSelectCurrency?: (selectedCurrency: CurrencyItemProps) => void;
  labelCss?: string;
  name: string;
  style?: any;
  inputCss?: string;
}

const NewInput: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  register,
  placeholder,
  errors,
  value,
  disabled = false,
  required = false,
  isPhone = false,
  onChange,
  isCurrencyAmount = false,
  selectedPhoneCode,
  onSelectPhoneCode,
  selectedCurrency,
  onSelectCurrency,
  disabledDate,
  labelCss,
  name,
  maxLength,
  isDate,
  isTextArea,
  style,
  inputCss,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIsFocused(true);
    setIsInputEmpty(inputValue?.length === 0);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIsFocused(false);
    setIsInputEmpty(inputValue?.length === 0);
  };

  return (
    <div className="w-full relative">
      {type === 'password' && (
        <span
          onClick={togglePassword}
          className="absolute cursor-pointer right-3 top-10 text-secondary-400"
        >
          {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </span>
      )}

      {label && (
        <label
          htmlFor={id}
          className={twMerge(labelCss, `text-sm text-secondary-700 mb-[6px] block`)}
        >
          {label}
          {required && <span className="text-primary-600 ml-1">*</span>}
        </label>
      )}
      {isPhone ? (
        <div
          className={`grid grid-cols-[92px_auto] border rounded-lg shadow-sm  ${
            isFocused && isInputEmpty ? 'border-primary-500' : 'border-secondary-100'
          }`}
        >
          <PhoneDropdown
            items={PHONE_CODES}
            onSelectPhoneCode={onSelectPhoneCode}
            selectedPhoneCode={selectedPhoneCode}
          />
          <input
            {...(register ? register(id) : {})}
            id={id}
            name={name}
            style={style}
            disabled={disabled}
            value={value}
            type={inputType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`custom-input border-none outline-0 w-full px-3 py-[10px] rounded-lg`}
          />
        </div>
      ) : isDate ? (
        <DatePicker
          {...(register ? register(id) : {})}
          id={id}
          name={name}
          {...(onChange && { onChange })}
          disabled={disabled}
          value={value}
          style={style}
          type={inputType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabledDate={disabledDate}
          placeholder={placeholder}
          className={`${inputCss} border outline-0 w-full px-3 py-[10px] rounded-lg shadow-sm ${
            isFocused && isInputEmpty ? 'border-primary-500' : 'border-secondary-100'
          }`}
        />
      ) : isTextArea ? (
        <textarea
          {...(register ? register(id) : {})}
          id={id}
          name={name}
          disabled={disabled}
          value={value}
          style={style}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`border outline-0 w-full px-3 py-[10px] rounded-lg shadow-sm ${
            isFocused && isInputEmpty ? 'border-primary-500' : 'border-secondary-100'
          }`}
        />
      ) : isCurrencyAmount ? (
        <div
          className={`grid grid-cols-[92px_auto] border rounded-lg shadow-sm  ${
            isFocused && isInputEmpty ? 'border-primary-500' : 'border-secondary-100'
          }`}
        >
          <CurrencyDropdown
            items={ALL_CURRENCY}
            onSelectCurrency={(item: CurrencyItemProps) =>
              onSelectCurrency && onSelectCurrency(item)
            }
            selectedCurrency={selectedCurrency || ({} as CurrencyItemProps)}
          />
          <input
            {...(register ? register(id) : {})}
            id={id}
            name={name}
            style={style}
            disabled={disabled}
            value={value}
            type={inputType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`${inputCss} custom-input border-none outline-0 w-full px-3 py-[10px] rounded-lg`}
          />
        </div>
      ) : (
        <input
          {...(register ? register(id) : {})}
          id={id}
          name={name}
          disabled={disabled}
          value={value && value}
          {...(onChange && { onChange })}
          style={style}
          type={inputType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`${inputCss} border outline-0 w-full px-3 py-[10px] rounded-lg shadow-sm ${
            isFocused && isInputEmpty ? 'border-primary-500' : 'border-secondary-100'
          }`}
        />
      )}

      {errors?.[id]?.message && (
        <p className="text-[10px] absolute bottom-[-14px] text-danger-500">{errors[id].message}</p>
      )}
    </div>
  );
};

export default NewInput;
