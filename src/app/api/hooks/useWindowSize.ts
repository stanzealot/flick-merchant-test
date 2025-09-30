import { useEffect, useState, useCallback } from "react";

export const useWindowSize = () => {
    const isClient = typeof window === "object";

    const getSize = useCallback(
        () => ({
            height: isClient ? window.innerHeight : 0,
            width: isClient ? window.innerWidth : 0,
        }),
        [isClient]
    );

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        function handleResize() {
            setWindowSize(getSize());
        }
        if (isClient) {
            window.addEventListener("resize", handleResize);
        }

        return () => window.removeEventListener("resize", handleResize);
    }, [getSize, isClient]);

    return windowSize;
};
