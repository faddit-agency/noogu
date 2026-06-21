import Link from "next/link";
import { BarChart3, CalendarDays, ClipboardCheck, LayoutDashboard, Printer, Settings, UsersRound } from "lucide-react";

export function AdminShell({ children, active = "대시보드" }: { children: React.ReactNode; active?: string }) {
  const items = [[LayoutDashboard,"대시보드","/admin"],[CalendarDays,"행사 관리","/admin/events"],[UsersRound,"참가자 관리","/admin/events/fashion/participants"],[ClipboardCheck,"체크인 관리","/admin/checkins"],[Printer,"네임택 출력","/admin/nametags"],[BarChart3,"리포트","/admin/reports"],[Settings,"설정","/admin/settings"]] as const;
  return <div className="admin-shell"><aside className="admin-side"><div className="admin-brand-row"><Link href="/" className="brand">NOOGU<span className="brand-dot">.</span></Link><span className="admin-badge">ADMIN</span></div><nav className="admin-menu">{items.map(([Icon,label,href])=><Link key={label} href={href} className={active===label?"active":""}><Icon size={17}/>{label}</Link>)}</nav></aside><main className="admin-main">{children}</main><nav className="admin-mobile-nav" aria-label="관리자 메뉴">{items.slice(0,6).map(([Icon,label,href])=><Link key={label} href={href} className={active===label?"active":""}><Icon size={18}/><span>{label.replace(" 관리","")}</span></Link>)}</nav></div>;
}
