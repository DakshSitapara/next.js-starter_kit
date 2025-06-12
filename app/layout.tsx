import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Removed duplicate import
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NEXT.js Starter Kit",
    template: "%s | NEXT.js Starter Kit",
  },
  description: "A modern Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              className:
                "text-sm font-medium rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 font-sans",
              style: {
                background: "var(--toast-bg, #ffffff)",
                color: "var(--toast-text, #1f2937)",
              },
              success: {
                className:
                  "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-200 dark:border-green-700",
                iconTheme: {
                  primary: "#10b981", // Green for success
                  secondary: "#ffffff",
                },
              },
              error: {
                className:
                  "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 border-red-200 dark:border-red-700",
                iconTheme: {
                  primary: "#ef4444", // Red for error
                  secondary: "#ffffff",
                },
              },
              loading: {
                className:
                  "bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-700",
                iconTheme: {
                  primary: "#3b82f6", // Blue for loading
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}