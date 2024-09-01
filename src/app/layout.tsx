import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

const geologica = Geologica({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weejet | Ultimate Notion Widget Platform",
  description: "Initiated by Johnson Chin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geologica.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
