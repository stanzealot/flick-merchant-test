"use client";

import { Skeleton } from "antd";

export default function ProfileSkeleton() {
    return (
        <div className="grid grid-cols-2 items-center gap-8">
            <Skeleton.Button active={true} size="large" shape="round" className="!h-[40px]" />
            <Skeleton.Button active={true} size="large" shape="round" className="!h-[40px]" />
            <Skeleton.Button active={true} size="large" shape="round" className="!h-[40px]" />
            <Skeleton.Button active={true} size="large" shape="round" className="!h-[40px]" />
            <Skeleton.Button active={true} size="large" shape="round" className="!h-[40px]" />
            <Skeleton.Button active={true} size="large" shape="round" className="!h-[40px]" />
        </div>
    );
}
