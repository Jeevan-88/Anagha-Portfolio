import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anagha Mhaiskar · Creative Direction & Social Media Portfolio",
  description: "High-end cinematic digital portfolio of Anagha Mhaiskar. Social Media Manager, Graphic Designer, and Visual Storyteller based in Pune & Nagpur, Maharashtra, India.",
  keywords: [
    "Anagha Mhaiskar",
    "Social Media Manager",
    "Graphic Designer",
    "Content Strategy",
    "Neil and Momo",
    "Dnnovate",
    "Packaging Design",
    "Figma",
    "Creative Direction",
    "Pune",
    "Nagpur"
  ],
  authors: [{ name: "Anagha Mhaiskar" }],
  openGraph: {
    title: "Anagha Mhaiskar · Creative Direction & Social Media",
    description: "Bridging brand aesthetics, deliberate visual systems, and agile social media execution.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#FBF9F5] text-[#141312] selection:bg-[#D06B29] selection:text-white">
      <body className="relative min-h-screen bg-[#FBF9F5] text-[#141312] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
