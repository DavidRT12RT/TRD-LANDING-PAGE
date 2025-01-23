"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextUIProvider>
        <Toaster/>
        <body className="dark text-white bg-[#111317]">{children}</body>
      </NextUIProvider>
    </html>
  );
}
