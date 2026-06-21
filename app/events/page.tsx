import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { EventCard, TopBar } from "@/components/ui";
import { events } from "@/lib/mock-data";

export default function EventsPage() {
  return (
    <MobileShell><main className="mobile-page">
      <TopBar action={<Link className="icon-button" href="/admin/events/new" aria-label="행사 만들기"><Plus size={20} /></Link>} />
      <section style={{ marginTop: 18 }}><span className="eyebrow">Event history</span><h1 className="page-title">행사</h1><p className="page-copy">참여한 행사와 새로운 네트워킹 기회를 한곳에서 관리하세요.</p></section>
      <section className="section"><div className="search"><Search size={18} /><input placeholder="행사명 또는 장소 검색" aria-label="행사 검색" /></div><div className="filter-row" style={{ marginTop: 12 }}><span className="chip dark">전체 3</span><span className="chip">예정</span><span className="chip">참여 완료</span><span className="chip">내가 만든 행사</span></div></section>
      <section className="section cards-grid">{events.map((event) => <EventCard key={event.slug} event={event} />)}</section>
      <section className="card empty section"><div className="empty-icon"><Plus size={21} /></div><h3>직접 행사를 운영하시나요?</h3><p>랜딩페이지부터 참가 승인, 체크인과 네트워킹 리포트까지 준비해 드려요.</p><Link className="button light" href="/admin/events/new">행사 만들기</Link></section>
    </main></MobileShell>
  );
}
