import type { Metadata } from "next";
import "./globals.css";
import ThemeContextProvider from "@/Components/contexts/ThemeContextProvider";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: {
    default: "Unified Inventory Management System | UIMS",
    template: "%s | UIMS",
  },
  description:
    "Streamline your inventory operations with real-time tracking, analytics, and comprehensive management tools.",
  keywords: [
    "Inventory Management System",
    "UIMS",
    "Stock Tracking",
    "Analytics",
    "Warehouse Management",
    "Supply Chain",
  ],
  authors: [{ name: "Vasvi Saini" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Unified Inventory Management System (UIMS)",
    description:
      "Streamline your inventory operations with real-time tracking, analytics, and comprehensive management tools.",
    siteName: "UIMS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Unified Inventory Management System Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unified Inventory Management System (UIMS)",
    description:
      "Streamline your inventory operations with real-time tracking, analytics, and comprehensive management tools.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased`}
      >
      <ThemeContextProvider>
        {children}
           <Toaster />
      </ThemeContextProvider>
      </body>
    </html>
  );
}
