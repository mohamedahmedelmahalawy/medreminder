import type { Metadata } from "next";

import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import "./globals.css";
import ClientProvider from "./components/ClientProvider";
import { ToastProvider } from "./components/ToasterProvider";

export const metadata: Metadata = {
  title: "MedReminder",
  description: "One Powerful App for Every Step of Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 overflow-x-hidden">
        <ClientProvider>
          <Navbar />
          <div className="pt-22.5">{children}</div>
          <Footer />
        </ClientProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
