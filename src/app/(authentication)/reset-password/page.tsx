"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.back();
    }, [router]);
    return <div>Reset Password Page</div>;
};

export default ResetPasswordPage;
