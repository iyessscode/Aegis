import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { UploadThingSSR } from "@/features/uploadthing/components/uploadthing-ssr";
import { AegisProvider } from "@/providers/aegis-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Aegis",
  description: "Protected. Verified. Aegis.",
  icons: {
    icon: "./logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AegisProvider>
          <UploadThingSSR />
          <Toaster position="top-center" expand />
          {children}
        </AegisProvider>
      </body>
    </html>
  );
}
