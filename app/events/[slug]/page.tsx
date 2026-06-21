import Link from "next/link";
import { ArrowLeft, CalendarDays, Download, MapPin, UsersRound } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { PersonRow } from "@/components/ui";
import { events, people } from "@/lib/mock-data";
import { ActionMenu } from "@/components/action-menu";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug) ?? events[0];
  return <MobileShell><main className="mobile-page">
    <header className="topbar"><Link href="/events" className="icon-button"><ArrowLeft size={19} /></Link><span className="eyebrow">Event detail</span><ActionMenu variant="event"/></header>
    <section className="hero-card card" style={{ marginTop: 14, minHeight: 240 }}><div className="hero-content"><span className="hero-kicker">{event.status} · {event.day} {event.month}</span><h1 className="hero-title" style={{ fontSize: 31 }}>{event.name}</h1><p className="hero-copy">좋은 사람과 좋은 가능성이 만나는 하루.</p></div></section>
    <section className="card card-pad section detail-grid"><div className="detail-row"><span className="detail-icon"><CalendarDays size={18} /></span><div><div className="detail-label">일시</div><div className="detail-value">2027년 3월 20일, 오후 2:00–7:00</div></div></div><div className="detail-row"><span className="detail-icon"><MapPin size={18} /></span><div><div className="detail-label">장소</div><div className="detail-value">XYZ Seoul, 서울 성동구 연무장길 21</div></div></div><div className="detail-row"><span className="detail-icon"><UsersRound size={18} /></span><div><div className="detail-label">나의 기록</div><div className="detail-value">체크인 완료 · 새로운 연결 {event.count}명</div></div></div></section>
    <section className="section"><div className="section-head"><h2 className="section-title">이 행사에서 만난 사람</h2><span className="chip green">{people.length}명</span></div><div className="card card-pad list" style={{ paddingTop: 4, paddingBottom: 4 }}>{people.map((person) => <PersonRow key={person.id} person={person} />)}</div></section>
    <section className="section two-col"><a href="/api/exports/connections.xlsx" className="button ghost full"><Download size={17} /> Excel 다운로드</a><Link href="/qr" className="button full">내 QR 보기</Link></section>
  </main></MobileShell>;
}
