"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, TabsProps } from "antd";
import { TiDelete } from "react-icons/ti";
import { PiSignatureBold } from "react-icons/pi";
import { MdDraw } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { TbXboxAFilled } from "react-icons/tb";
import Tabs from "@/src/components/blocks/Tabs";
import Modal from "@/src/components/ui-components/Modal";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import { getFirstLetterOfWords } from "@/src/utils/functions";
import Image from "next/image";
import useTopMenuStore from "@/src/utils/store/topMenuStore";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const SignatureModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const { setSignatureType, setPreview } = useTopMenuStore();
    const inputStyles = "focus:border-primary-500 border border-[#EAECF0] h-10 w-full rounded-md px-3 outline-none";

    const [activeTab, setActiveTab] = useState("1");

    const [selectedFont, setSelectedFont] = useState("");

    const { signature, setSignature } = useTopMenuStore();

    const onChange = (key: string) => {
        setPreview(null);
        setSignatureType(key);
        setActiveTab(key);
    };

    const signatures = [
        { id: 1, fontClass: "font-dancing" },
        { id: 3, fontClass: "font-greatVibes" },
        { id: 5, fontClass: "font-satisfy" },
        { id: 6, fontClass: "font-tangerine" },
        { id: 8, fontClass: "font-sacramento" },
        { id: 9, fontClass: "font-parisienne" },
        { id: 13, fontClass: "font-zeyada" },
        { id: 14, fontClass: "font-alex" },
        { id: 15, fontClass: "font-edu" },
    ];

    const items: TabsProps["items"] = [
        {
            children: (
                <SignaturesTab
                    selectedFont={selectedFont}
                    setSelectedFont={setSelectedFont}
                    inputText={signature}
                    signatures={signatures}
                />
            ),
            key: "text",
            label: (
                <p className="flex items-center gap-2">
                    <PiSignatureBold size={20} />
                    Signature
                </p>
            ),
        },

        {
            children: <UploadTab />,
            key: "upload",
            label: (
                <p className="flex items-center gap-2">
                    <BsUpload size={20} />
                    Upload
                </p>
            ),
        },

        {
            children: (
                <InitialsTab
                    selectedFont={selectedFont}
                    setSelectedFont={setSelectedFont}
                    inputText={signature}
                    signatures={signatures}
                />
            ),
            key: "initials",
            label: (
                <p className="flex items-center gap-2">
                    <TbXboxAFilled size={20} />
                    Initials
                </p>
            ),
        },

        {
            children: <DrawSignature />,
            key: "draw",
            label: (
                <p className="flex items-center gap-2">
                    <MdDraw size={20} />
                    Draw
                </p>
            ),
        },
    ];
    return (
        <Modal customWidth={500} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
            <div className="absolute right-5 top-5">
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>
            <div>
                <div className="border border-x-0 border-t-0 border-b-[#EAECF0] py-6">
                    <h1 className="text-base text-[#1A1A1A] font-medium">Set your signature details</h1>
                </div>

                <div className="grid grid-cols-[300px_auto] gap-6 py-6">
                    <div className="group">
                        <label
                            htmlFor="fullName"
                            className="focus:text-primary-500 block text-sm font-medium text-gray-700 mb-1"
                        >
                            Full Name:
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            className={inputStyles}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setSignature(e.target.value);
                            }}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="group">
                        <label
                            htmlFor="initials"
                            className="focus:text-primary-500 block text-sm font-medium text-gray-700 mb-1"
                        >
                            Initials:
                        </label>
                        <input
                            id="initials"
                            name="initials"
                            type="text"
                            value={getFirstLetterOfWords(signature)}
                            className={inputStyles}
                            placeholder="Enter your initials"
                        />
                    </div>
                </div>

                <div className="">
                    <Tabs className="w-full" defaultActiveKey={activeTab} items={items} onChange={onChange} />
                </div>
            </div>
        </Modal>
    );
};

export default SignatureModal;

const DrawSignature = () => {
    const { selectedFile, setSelectedFile, preview, setPreview, setOpenSignature } = useTopMenuStore();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.beginPath();
        const { offsetX, offsetY } = getEventPosition(event, canvas);
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { offsetX, offsetY } = getEventPosition(event, canvas);
        ctx.lineTo(offsetX, offsetY);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const getEventPosition = (event: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();

        if ("touches" in event) {
            const touch = event.touches[0];
            return {
                offsetX: touch.clientX - rect.left,
                offsetY: touch.clientY - rect.top,
            };
        } else {
            return {
                offsetX: event.nativeEvent.offsetX,
                offsetY: event.nativeEvent.offsetY,
            };
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    }, []);
    const saveSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const signatureDataURL = canvas.toDataURL("image/png");
        setPreview(signatureDataURL);
        setOpenSignature(false);
    };

    return (
        <div className="signature-container">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="signature-canvas"
                style={{
                    border: "1px solid #EAECF0",
                    width: "100%",
                    height: "200px",
                }}
            />
            <div className="flex justify-end items-center gap-5 mt-3">
                <Button
                    onClick={clearCanvas}
                    className="!border-none !outline-none !bg-danger-100 !text-danger-500 !px-5"
                >
                    Clear
                </Button>

                <Button
                    onClick={saveSignature}
                    className="!border-none !outline-none !bg-primary-500 !px-5 !text-white"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

const UploadTab = () => {
    const { selectedFile, setSelectedFile, preview, setPreview } = useTopMenuStore();
    const { setOpenSignature } = useTopMenuStore();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setPreview(reader.result.toString());
                }
            };
            reader.readAsDataURL(file);

            setOpenSignature(false);
        }
    };

    return (
        <div className="border border-[#EAECF0] py-5 px-4">
            <div className="flex flex-col justify-center items-center h-[200px]">
                {preview ? (
                    <div className="relative w-20 h-20">
                        <Image
                            width={1000}
                            height={1000}
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md mb-4"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[#A0AEC0] text-[15px]">Select image to upload</p>
                        <Button
                            className="!border-none !bg-blue-500 !text-white !px-6 py-2 rounded"
                            onClick={() => document.getElementById("fileInput")?.click()}
                        >
                            Browse
                        </Button>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                )}
                <div className="flex gap-5 items-center !mt-10">
                    {selectedFile && (
                        <Button
                            onClick={() => {
                                setSelectedFile(null);
                                setPreview(null);
                            }}
                            className="!border !border-danger-500 !outline-none !text-danger-500"
                            icon={<TiDelete size={20} />}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

type SignaturesTabProps = {
    signatures: { id: number; fontClass: string }[];
    inputText: string;
    selectedFont: string;
    setSelectedFont: (selectedFont: string) => void;
};

const SignaturesTab: React.FC<SignaturesTabProps> = ({ signatures, inputText }) => {
    const { setSignature, setOpenSignature, setPreview, setSelectedFont, selectedFont } = useTopMenuStore();
    return (
        <div>
            <div
                className={`${
                    inputText.length > 0 ? "h-[200px]" : "h-auto"
                } border border-[#EAECF0] py-5 px-4 flex flex-col space-y-3 overflow-y-scroll custom-scrollbar`}
            >
                {inputText.length > 0 &&
                    signatures.map((signature) => (
                        <button
                            onClick={() => {
                                setSignature(inputText);
                                setSelectedFont(signature.fontClass);
                                setPreview(null);
                                setOpenSignature(false);
                            }}
                            key={signature.id}
                            className={`${
                                selectedFont === signature.fontClass ? "text-primary-500" : ""
                            } py-2 text-left text-[18px] px-4 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none ${
                                signature.fontClass
                            }`}
                        >
                            {inputText}
                        </button>
                    ))}
            </div>
        </div>
    );
};

const InitialsTab: React.FC<SignaturesTabProps> = ({ signatures, inputText }) => {
    const { setSignature, setOpenSignature, setPreview, setSelectedFont, selectedFont } = useTopMenuStore();
    return (
        <div>
            <div
                className={`${
                    inputText.length > 0 ? "h-[200px]" : "h-auto"
                } border border-[#EAECF0] py-5 px-4 flex flex-col space-y-3 overflow-y-scroll custom-scrollbar`}
            >
                {inputText.length > 0 &&
                    signatures.map((signature) => (
                        <button
                            onClick={() => {
                                setSelectedFont(signature.fontClass);
                                setSignature(getFirstLetterOfWords(inputText || ""));
                                setPreview(null);
                                setOpenSignature(false);
                            }}
                            key={signature.id}
                            className={`${
                                selectedFont === signature.fontClass ? "text-primary-500" : ""
                            } py-2 text-left text-[18px] px-4 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none ${
                                signature.fontClass
                            }`}
                        >
                            {getFirstLetterOfWords(inputText)}
                        </button>
                    ))}
            </div>
        </div>
    );
};
