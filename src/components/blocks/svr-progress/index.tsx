"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SemiCircleCVRProps {
    percentage: number;
}

const SemiCircleCVR: React.FC<SemiCircleCVRProps> = ({ percentage }) => {
    const radius = 80;
    const strokeWidth = 18; // Stroke width for the circle
    const circumference = Math.PI * radius; // Circumference of the semi-circle
    const [displayPercentage, setDisplayPercentage] = useState(0); // State for displayed percentage
    const [strokeDashoffset, setStrokeDashoffset] = useState(circumference); // Default state for stroke offset

    // Calculate the target stroke offset based on the percentage
    const targetDashoffset = circumference - (percentage / 100) * circumference;

    useEffect(() => {
        const duration = 3000; // Duration for the animation in milliseconds
        const intervalTime = 50; // Interval time for updating the display percentage
        const totalFrames = duration / intervalTime;
        const increment = Math.ceil(percentage / totalFrames); // Calculate increment per frame

        let currentPercentage = 0;
        const interval = setInterval(() => {
            if (currentPercentage < percentage) {
                currentPercentage += increment;
                setDisplayPercentage(Math.min(currentPercentage, percentage)); // Update displayed percentage
            } else {
                clearInterval(interval); // Clear interval when reaching the target percentage
            }
        }, intervalTime);

        return () => clearInterval(interval); // Clean up on component unmount
    }, [percentage]);

    // Animate the strokeDashoffset to match the percentage
    useEffect(() => {
        setStrokeDashoffset(targetDashoffset); // Update the dashoffset
    }, [targetDashoffset]);

    return (
        <div className="semi-circle-cvr relative">
            <svg
                width={radius * 2 + strokeWidth}
                height={radius + strokeWidth}
                viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius + strokeWidth}`}
            >
                {/* Background gray path representing 100% */}
                <path
                    d={`M ${strokeWidth / 2},${radius + strokeWidth / 2} A ${radius},${radius} 0 0,1 ${
                        radius * 2 + strokeWidth / 2
                    },${radius + strokeWidth / 2}`}
                    fill="none"
                    stroke="#FFFFFF40" // Gray for the background
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={0} // No offset for the background, fully visible
                />

                {/* Foreground white path representing percentage (animated) */}
                <motion.path
                    d={`M ${strokeWidth / 2},${radius + strokeWidth / 2} A ${radius},${radius} 0 0,1 ${
                        radius * 2 + strokeWidth / 2
                    },${radius + strokeWidth / 2}`}
                    fill="none"
                    stroke="white" // White for the animated part
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference} // Start from the full circumference
                    animate={{ strokeDashoffset }} // Animate strokeDashoffset to the target
                    transition={{ duration: 3, ease: "easeInOut" }} // Animation duration and ease
                />
            </svg>

            {/* Display percentage in the center */}
            <div className="text-center absolute top-1/2 left-[32%]">
                <p className="text-xs">CVR</p>
                <h2 className="text-3xl font-bold">{displayPercentage}%</h2>
            </div>
        </div>
    );
};

export default SemiCircleCVR;
