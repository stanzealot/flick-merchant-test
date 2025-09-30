'use client';

import { useDropzone, FileWithPath } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { LuUploadCloud } from 'react-icons/lu';
import { Button } from 'antd';
interface ImageUploadProps {
  preview: { path: string };
  setPreview: React.Dispatch<React.SetStateAction<{ path: string }>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileList?: any;
  uploadError?: string;
  validate?: any;
  onSubmit?: any;
}

const SingleUpload = ({
  preview,
  setPreview,
  setFile,
  fileList,
  uploadError,
  validate,
  onSubmit,
}: ImageUploadProps) => {
  //   const onDrop = async (acceptedFiles: FileWithPath[]) => {
  //     if (acceptedFiles.length > 0) {
  //       const file = acceptedFiles[0];
  //       setFile(file);
  //       setPreview({ path: URL.createObjectURL(file) });

  //       //   console.log('File: ||||||||||||||||||||||||||||', file);

  //       await onSubmit(); // Automatically upload after selection
  //     }
  //   };

  const onDrop = async (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);
      setPreview({ path: URL.createObjectURL(file) });

      try {
        await onSubmit(file); // Automatically upload after selection
      } catch (error) {
        console.error('Upload failed', error);
        // Handle the error (e.g., show an error message)
      }
    }
  };
  //   const onDrop = (acceptedFiles: FileWithPath[]) => {
  //     setFile(acceptedFiles[0]);
  //     setPreview({ path: URL.createObjectURL(acceptedFiles[0]) });
  //   };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop,
    validator: validate,
  });

  const removeImage = () => {
    setFile({} as FileWithPath);
    setPreview({ path: '' });
    validate();
  };

  return (
    <div className="">
      {uploadError && uploadError?.length > 0 && (
        <p className="text-xs text-danger-500 mb-3">{uploadError}</p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-5">
        {preview.path && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="relative mx-auto w-[100px] cursor-pointer h-[100px] border border-transparent overflow-hidden rounded-full">
              <motion.img
                src={preview.path}
                alt={`Preview`}
                style={{ objectFit: 'cover', backgroundSize: 'cover' }}
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  damping: 25,
                  stiffness: 200,
                  type: 'spring',
                }}
              />
              <div
                className="absolute top-0 right-0 bg-secondary-800 text-white p-1 rounded-bl-xl"
                onClick={removeImage}
              >
                <FaTrash />
              </div>
            </div>

            {/* Delete Image */}
            <Button
              className="!border-none !w-8 !h-8 !bg-danger-500 hover:!bg-danger-700 !rounded-full cursor-pointer"
              onClick={removeImage}
              icon={<IoClose className="text-white" />}
            />
          </div>
        )}

        {!preview.path && (
          <div
            {...getRootProps()}
            className="mx-auto cursor-pointer text-center px-4
                         w-[220px] h-[150px] border-2 border-[#EAECF0]
                          focus:border-primary-500 hover:border-primary-500 rounded-xl"
          >
            <input {...getInputProps()} />

            <div className="mx-auto mt-[16px] w-[40px] h-[40px] border border-[#EAECF0] rounded-md flex items-center justify-center">
              <LuUploadCloud className="text-[#666666]" size={14} />
            </div>

            <p className="text-[11px] text-[#666666] mt-5">
              <span className="text-primary-500 font-semibold">Click to upload</span> or drag and
              drop SVG, PNG, JPG or GIF (max. 800 x 400px)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleUpload;
