"use client";

import { useEffect, useState } from "react";
import UploadArea from "../components/UploadArea";

const isVideo = (url) => /\.(mp4|mov|webm|avi|mkv)$/i.test(url);

export default function Home() {
  const [history, setHistory] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const stored = localStorage.getItem("uploadHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const updateHistory = (newUrls) => {
    const updated = [...newUrls, ...history];
    setHistory(updated);
    localStorage.setItem("uploadHistory", JSON.stringify(updated));
  };

  const uploadFiles = async (files) => {
    const uploadedUrls = [];
    setLoading(true)
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("https://get-image-url-yb55.vercel.app/upload", { method: "POST", body: formData, });

        const data = await res.json();
        uploadedUrls.push(data.urls);
      }
      setToast("Succesfully Uploaded ");
      setTimeout(() => setToast(""), 2000);
      setUploaded(...uploadedUrls);
      updateHistory(...uploadedUrls);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToast("Copied to clipboard");

    setTimeout(() => setToast(""), 2000);
  };

  const MediaCard = ({ url }) => (
    <div
      className="flex flex-col md:flex-row  items-start md:items-center  gap-4 md:p-4  rounded-xl  bg-white/40 backdrop-blur-md  shadow-sm  hover:shadow-lg  transition">
      {/* Preview */}
      <div className="w-full md:w-20 h-30 md:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        {isVideo(url) ? (
          <video
            src={url}
            className="w-full h-full object-cover"
            controls
          />
        ) : (
          <img
            src={url}
            alt="uploaded"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* URL */}
      <div
        className="
      flex-1 min-w-0 w-60 md:w-70
      text-sm text-gray-700
      line-clamp-1 lg:truncate px-2
    "
        title={url}
      >
        {url}
      </div>

      {/* Copy Button */}
      <button
        onClick={() => copyToClipboard(url)}
        className="
       lg:self-auto
      px-3 py-1
      bg-green-600 text-white
      rounded-lg
      hover:bg-green-700
      active:scale-95
      transition
      whitespace-nowrap mx-2 mb-2
    "
      >
        Copy
      </button>
    </div>

  );

  return (
    <section className="container mx-auto py-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Get Image / Video URL 🚀
        </h1>
        <p className="text-gray-600 text-[12px] md:text-sm">
          Upload files and instantly get shareable URLs
        </p>
      </div>

      <UploadArea onUpload={uploadFiles} loading={loading} />

      <div className="flex justify-end gap-3">
        {/* Toggle History */}
        <button
          onClick={() => setShowHistory((p) => !p)}
          className="
      flex items-center gap-2
      px-4 py-2
      rounded-xl
      bg-white/70 backdrop-blur-md
      border border-white/30
      text-indigo-700 font-semibold
      shadow-md
      hover:shadow-lg hover:bg-white/90
      active:scale-95
      transition-all
    "
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>

        {/* Clear History */}
        {showHistory && (
          <button
            onClick={() => {
              setHistory([]);
              localStorage.removeItem("uploadHistory");
            }}
            className="
        flex items-center gap-2
        px-4 py-2
        rounded-xl
        bg-red-500/90 text-white
        font-semibold
        shadow-md
        hover:bg-red-600
        active:scale-95
        transition-all
      "
          >
            Clear
          </button>
        )}
      </div>


      <div className="grid gap-4 max-h-screen overflow-auto hide-scrollbar">
        {(showHistory ? history : uploaded).map((url, idx) => (
          <MediaCard key={idx} url={url} />
        ))}
      </div>

      {toast && (
        <div className="fixed top-12 right-6 z-50 
          bg-black/40 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </section>
  );
}
