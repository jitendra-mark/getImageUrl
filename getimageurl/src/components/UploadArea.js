"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadArea({ onUpload }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*,video/*",
  });

  const handleUpload = async () => {
    if (files.length > 0) {
      await onUpload(files);
      setFiles([]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 rounded-lg p-10 cursor-pointer text-center bg-gray-50 hover:bg-gray-100"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">Drag & drop files here or click</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-1">
          {files.map((file, i) => (
            <p key={i} className="text-sm text-gray-700">
              {file.name}
            </p>
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
}
