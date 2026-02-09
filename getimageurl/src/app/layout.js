import "./globals.css";
import Navbar from "@/components/Navbar";

/* ---------- SEO Metadata ---------- */
export const metadata = {
  title: {
    default: "GetImageURL – Upload Images & Videos and Get Shareable URLs",
    template: "%s | GetImageURL",
  },
  description:
    "Upload images and videos instantly and get secure, shareable URLs. Fast, free, and optimized for creators, developers, and Gen-Z users.",
  keywords: [
    "image upload",
    "video upload",
    "get image url",
    "image hosting",
    "video hosting",
    "s3 upload",
    "share image link",
    "share video link",
    "cloud upload",
  ],
  authors: [{ name: "GetImageURL Team" }],
  creator: "GetImageURL",
  publisher: "GetImageURL",

  metadataBase: new URL("https://getimageurl.vercel.app"), // change if different

  openGraph: {
    title: "GetImageURL – Upload Images & Videos Instantly",
    description:
      "Drag & drop images or videos and instantly get shareable URLs. Modern, fast, and secure.",
    url: "https://getimageurl.vercel.app",
    siteName: "GetImageURL",
    images: [
      {
        url: "/og-image.png", // add later (optional but recommended)
        width: 1200,
        height: 630,
        alt: "GetImageURL Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GetImageURL – Upload Images & Videos Instantly",
    description:
      "Upload images & videos and get instant shareable URLs. Simple. Fast. Secure.",
    images: ["/og-image.png"],
    creator: "@getimageurl", // optional
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

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
        <div className="px-4">{children}</div>
      </body>
    </html>
  );
}
