"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadArea({ onUpload ,loading }) {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prev) => [...prev, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*,video/*", });

    const handleUpload = async () => {
        if (files.length > 0) {
            await onUpload(files);
            setFiles([]);
        }
    };

    return (
        <div className="space-y-2">
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 rounded-lg p-10 cursor-pointer text-center bg-white/20 drop-shadow-2xl hover:bg-white/30 hover:drop-shadow-2xl md:h-60 items-center flex justify-center"
            >
                <input {...getInputProps()} />
                <p className="text-gray-600">Drag & drop files here or click</p>
            </div>

            {files.length > 0 && (
                <div className="">
                <span className="text-gray-600 text-xs">Total Selected Images : </span> <strong>{files?.length}</strong>
                </div>
            )}

            <button
                onClick={handleUpload}
                className="px-8 py-3 rounded-xl w-full md:w-auto
          bg-gradient-to-r from-indigo-600 to-purple-600
          text-white font-semibold
          hover:opacity-90
          active:scale-95
          transition"
          disabled={loading}
            >
             {loading ? "Uploading" :" Upload"}  
            </button>
        </div>
    );
}
