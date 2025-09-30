import React from "react";
import "./loader.css";

const CustomLoader = ({ type = "normal" }: { type?: string }) => {
    return (
        <div
            className={`${
                type === "business" ? "fixed inset-0 bg-white bg-opacity-95 z-50" : ""
            } flex flex-col justify-center items-center h-screen`}
        >
            <svg
                width="141"
                height="140"
                viewBox="0 0 141 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14"
            >
                <path
                    d="M59.4213 114.245C57.3991 108.592 53.3401 104.729 48.6505 104.729H22.7094C22.7094 104.729 10.8732 104.736 9.11185 91.5225L3.29883 98.4952L4.69772 115.072C4.69772 115.072 7.48826 135.272 22.7094 139.955H48.6505C48.6505 139.955 55.0289 137.983 57.2251 134.794C59.4213 131.605 60.7767 127.198 60.7767 122.334C60.7767 119.421 60.2838 116.666 59.4213 114.245Z"
                    fill="url(#paint0_linear_335_69)"
                    className="animate-fade-in-out"
                />

                <path
                    d="M139.999 10.5678C139.672 11.626 139.31 12.7278 138.911 13.844C138.904 13.8657 138.897 13.8875 138.89 13.9092C135.265 24.0711 128.474 36.0813 116.652 36.0813H41.2931C15.5115 36.0813 22.216 58.8695 22.3682 59.3769C-1.26802 0 41.2931 0 41.2931 0H134.475C137.918 0.514619 142.035 2.68907 139.999 10.5678Z"
                    fill="url(#paint1_linear_335_69)"
                    className="animate-move-up-down"
                />

                <path
                    d="M100.925 59.0364C98.1993 53.2451 92.7124 49.2876 86.3848 49.2876H48.8828H21.0499C21.0499 49.2876 -13.3136 49.2876 5.77081 108.664C5.64759 108.157 0.23322 85.3689 21.0499 85.3689H48.8828H81.8837H86.3848C90.9004 85.3689 94.9956 83.3467 97.9601 80.085C100.925 76.8161 102.751 72.3077 102.751 67.3283C102.751 64.342 102.099 61.5225 100.925 59.0364Z"
                    fill="url(#paint2_linear_335_69)"
                    className="animate-scale-in-out"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_335_69"
                        x1="56.0997"
                        y1="91.4887"
                        x2="8.3104"
                        y2="137.032"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#E21C23" />
                        <stop offset="1" stopColor="#AE1E22" />
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_335_69"
                        x1="15.2212"
                        y1="42.9734"
                        x2="76.1146"
                        y2="-38.9859"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#ED1A70" />
                        <stop offset="1" stopColor="#F15D2F" />
                    </linearGradient>
                    <linearGradient
                        id="paint2_linear_335_69"
                        x1="93.2168"
                        y1="49.1012"
                        x2="44.2499"
                        y2="120.234"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#6AC28C" />
                        <stop offset="1" stopColor="#38BDB1" />
                    </linearGradient>
                </defs>
            </svg>
            {type === "business" && (
                <div>
                    <p className="text-[#666666] text-sm mt-3">Switching Business...</p>
                </div>
            )}
        </div>
    );
};

export default CustomLoader;
