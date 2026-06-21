import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import "./landing-refinements.css";
import { PwaRegister } from "@/components/pwa-register";

export const metadata: Metadata = {
  title: { default: "NOOGU — 만남을 관계로", template: "%s | NOOGU" },
  description: "누구를, 언제, 어디서 만났는지. 행사 네트워킹을 기록하고 관리하세요.",
  applicationName: "NOOGU",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "NOOGU", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#111827",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body><PwaRegister />{children}</body>
    </html>
  );
}
