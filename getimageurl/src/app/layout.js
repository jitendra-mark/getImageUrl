import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="
  min-h-screen
  bg-gradient-to-br
  from-indigo-200
  via-purple-200
  to-pink-200
"
      >
        <Navbar />
        <div className="px-4">
          {children}
        </div>

      </body>
    </html>
  );
}
