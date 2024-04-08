import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To do List",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div>
        {children}
          </div>
        </Providers>
        </body>
    </html>
  );
}
