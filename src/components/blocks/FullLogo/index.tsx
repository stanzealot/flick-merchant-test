"use client";

import Image from "next/image";
import Link from "next/link";

const FullLogo = () => {
    return (
        <Link href="/" className="block w-[70px] overflow-hidden">
            <Image src="/images/flick-full.svg" alt="logo" width={70} height={20} className="w-full h-full" />
        </Link>
    );
};

export default FullLogo;
