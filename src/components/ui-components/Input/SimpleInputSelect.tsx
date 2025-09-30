'use client';

import { useRef, useState } from 'react';
import { Select as AntSelect, SelectProps, Empty } from 'antd';
import CustomIcon from '../../blocks/CustomIcon';

interface InputProps extends SelectProps {
  // register?: any;
  errors?: Record<string, any>;
  name: string;
  value?: string;
  showSearch?: boolean;
  label?: string;
  id: string;
  emptyState?: string;
  emptyText?: string;
  index?: number;
  fieldName?: string;
  objectName?: string;
  required?: boolean;
  labelCss?: string;
  className?: string;
}

const SimpleInputSelect: React.FC<InputProps> = (props) => {
  const {
    // register,
    className,
    label,
    id,
    placeholder,
    onChange,
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
    showSearch = true,
    required = false,
    labelCss,
    value,
    // selectedValue,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<any>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const handleLabelClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <AntSelect
        // {...(register && register(name))}
        ref={selectRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${className} !outline-none !shadow-none !text-[12px] !h-10 !w-full !rounded-md !text-gray-700 !placeholder-transparent focus:!outline-none focus:!border-primary-500`}
        style={style}
        showSearch={showSearch}
        notFoundContent={
          emptyState ? (
            <div className="mx-auto flex flex-col justify-center items-center">
              <CustomIcon path={emptyState} className="w-6" />
              <h1 className="text-xs mt-5 mb-3">{'/images/icons/empty-flick-state.svg'}</h1>
            </div>
          ) : (
            <Empty description="No data" />
          )
        }
        value={value}
        disabled={disabled}
        placeholder=" "
        onChange={onChange}
        onSearch={onSearch}
        options={options}
        {...rest}
      />

      <label
        htmlFor={id}
        onClick={handleLabelClick}
        className={`absolute  top-2 transition-all duration-200 ease-in-out ${
          isFocused || value
            ? 'left-2 text-[11px] text-primary-500 transform -translate-y-5 scale-90 py-1 px-1 bg-[#F7FCFC]'
            : 'left-5 text-[13px] text-gray-500'
        }`}
      >
        {label}
      </label>

      {errors?.[id]?.message && (
        <p className="text-[9px] absolute bottom-[-14px] text-[#c10000]">{errors[id].message}</p>
      )}
    </div>
  );
};

export default SimpleInputSelect;
