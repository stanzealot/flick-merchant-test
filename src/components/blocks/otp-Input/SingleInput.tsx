"use client";

import usePrevious from "@/src/utils/clientHooks/usePrevious";
import React, { memo, useRef, useLayoutEffect, InputHTMLAttributes, useEffect } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    focus: boolean;
    index: number;
}

const SingleOTPInputComponent: React.FC<IProps> = (props: IProps) => {
    const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

    const { focus, autoFocus, index, ...rest } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const prevFocus = usePrevious(!!focus);

    useIsomorphicLayoutEffect(() => {
        if (inputRef.current) {
            if (focus && autoFocus) {
                inputRef.current.focus();
            }
            if (focus && autoFocus && focus !== prevFocus) {
                inputRef.current.focus();
                inputRef.current.select();
            }
        }
    }, [autoFocus, focus, prevFocus]);

    return <input inputMode="numeric" data-testid={`otp-input-${index}`} ref={inputRef} {...rest} />;
};

const SingleOTPInput = memo(SingleOTPInputComponent);

export default SingleOTPInput;
