import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "@/components/reduxProvider";
import "../styles/globals.css";

const interSans = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kocmouch's Awesome Quiz",
  description: ";)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans} antialiased select-none`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
