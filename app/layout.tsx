import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Devi Blogs",
    description: "Technology, building in public, and the founder journey.",
    openGraph: {
        title: "Devi Blogs",
        description: "Building in public",
        type: "website",
      },
    keywords: ["tech blog","startup journey","programming"],
  };

export default function RootLayout({
    children,
    } : {children : React.ReactNode;}) {
        return (
          <html lang="en">
            <body className={`${inter.className} bg-[#0f172a] text-gray-200 min-h-screen`}>
                <Navbar />
                <main className="max-w-5xl mx-auto px-4 py-12">
                    {children}
                </main>
            </body>
          </html>
        );
}