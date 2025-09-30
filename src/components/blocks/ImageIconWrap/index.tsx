"use client";

import Image from "next/image";

const ImageIconWrap = ({ path, className }: { path: string; className?: string }) => {
    return (
        <div className={`${className} overflow-hidden rounded-full`}>
            <Image src={`${path}`} alt="image" width={1000} height={1000} style={{ transform: "scale(1.5, 1.9)" }} />
        </div>
    );
};

export default ImageIconWrap;
