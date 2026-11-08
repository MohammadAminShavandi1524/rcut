import "./globals.css";
import "../Webfonts/fontiran.css";

import type { Metadata } from "next";

import AppToaster from "@/components/AppToaster";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import MobileMenu from "@/components/Header/MobileMenu";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

import { CustomToastProvider } from "@/components/ui/custom-toast";
import {
  MobileSidebar,
  MobileSidebarContent,
} from "@/components/ui/mobile-sidebar";

export const metadata: Metadata = {
  title: {
    default: "آرکات",
    template: "%s | آرکات",
  },
  description:
    "آرکات؛ مرجع تأمین ابزارهای تخصصی تراشکاری، قالب‌سازی و CNC. عرضه ابزارهای صنعتی باکیفیت از برندهای معتبر، همراه با مشاوره تخصصی برای صنعتگران، تولیدکنندگان و کارگاه‌های ماشین‌کاری.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-IRANYekanX">
        <MobileSidebar>
          <AppToaster />

          <MobileSidebarContent width="min(88vw, 380px)">
            <MobileMenu />
          </MobileSidebarContent>

          <div className="bg-background text-foreground relative min-h-screen">
            <Header />

            <main className="headerPadding">
              <CustomToastProvider>
                <SmoothScrollProvider>{children}</SmoothScrollProvider>
              </CustomToastProvider>
            </main>

            <Footer />

            <ScrollToTop />
          </div>
        </MobileSidebar>
      </body>
    </html>
  );
}
