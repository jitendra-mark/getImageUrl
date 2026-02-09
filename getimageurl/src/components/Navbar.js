"use client";
import Link from "next/link";

export default function Navbar() {


  return (
    <nav className="bg-white/20 drop-shadow-2xl shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          GetImageURL ✨</span>
        </Link>

      </div>
    </nav>
  );
}
