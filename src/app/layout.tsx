import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/HeadNav";

import { LoadingOverlay } from "@/components/loading-overlay";
import { NavigationProvider } from "./context/navigation-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CongKong Dashboard",
  description: "A analysis dashboard for CongKong Friends.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationProvider>
            <SidebarProvider>
              <div className="flex min-w-screen min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6 pt-1 relative">
                  <SiteHeader />
                  <LoadingOverlay />
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
