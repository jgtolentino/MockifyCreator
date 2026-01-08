import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MockifyCreator - Mockup to Production",
  description: "Transform your design mockups into production-ready applications with AI-assisted development",
  keywords: ["mockup", "design", "production", "react", "nextjs", "ai", "development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
