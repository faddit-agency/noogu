"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, QrCode, UserRound, UsersRound } from "lucide-react";

const nav = [
  { href: "/home", label: "홈", icon: Home },
  { href: "/events", label: "행사", icon: CalendarDays },
  { href: "/qr", label: "QR", icon: QrCode, qr: true },
  { href: "/network", label: "네트워크", icon: UsersRound },
  { href: "/profile", label: "프로필", icon: UserRound },
];

export function MobileShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="app-shell">
      {children}
      <nav className="bottom-nav" aria-label="주요 메뉴">
        {nav.map(({ href, label, icon: Icon, qr }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`nav-item ${active ? "active" : ""} ${qr ? "qr" : ""}`}>
              <Icon size={qr ? 24 : 20} strokeWidth={active ? 2.3 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function Brand() {
  return <Link href="/home" className="brand">NOOGU<span className="brand-dot">.</span></Link>;
}
