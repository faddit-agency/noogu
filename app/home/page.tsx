import Link from "next/link";
import { CalendarCheck, ChevronRight, Sparkles, UserPlus, UsersRound } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { EventCard, PersonRow, TopBar } from "@/components/ui";
import { events, people } from "@/lib/mock-data";
import { ActionMenu } from "@/components/action-menu";

export default function MemberHomePage() {
  return (
    <MobileShell>
      <main className="mobile-page">
        <TopBar action={<ActionMenu variant="notifications"/>} />
        <section style={{ marginTop: 18 }}>
          <span className="eyebrow">Good afternoon</span>
          <h1 className="page-title">반가워요, 한재님.<br />오늘도 좋은 만남을.</h1>
        </section>

        <section className="section hero-card card">
          <div className="hero-content">
            <span className="hero-kicker">TODAY · 14:00</span>
            <h2 className="hero-title">Fashion<br />Networking Day</h2>
            <p className="hero-copy">성수 XYZ Seoul · 체크인 완료</p>
            <Link href="/qr" className="chip dark" style={{ marginTop: 14 }}>내 네트워킹 QR <ChevronRight size={13} /></Link>
          </div>
        </section>

        <section className="section stats">
          <div className="card stat"><div className="stat-label">총 연결</div><div className="stat-value">24</div></div>
          <div className="card stat"><div className="stat-label">이번 달</div><div className="stat-value">12</div></div>
          <div className="card stat"><div className="stat-label">참여 행사</div><div className="stat-value">3</div></div>
        </section>

        <div className="desktop-grid">
          <section className="section">
            <div className="section-head"><h2 className="section-title">다가오는 행사</h2><Link href="/events" className="section-link">전체보기</Link></div>
            <EventCard event={events[1]} />
          </section>
          <section className="section">
            <div className="section-head"><h2 className="section-title">최근 연결</h2><Link href="/network" className="section-link">전체보기</Link></div>
            <div className="card card-pad list" style={{ paddingTop: 4, paddingBottom: 4 }}>{people.slice(0, 3).map((person) => <PersonRow key={person.id} person={person} />)}</div>
          </section>
        </div>

        <section className="section">
          <div className="section-head"><h2 className="section-title">빠른 실행</h2></div>
          <div className="cards-grid">
            <Link href="/connect/demo" className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 14 }}><span className="detail-icon" style={{ background: "#effbd7" }}><UserPlus size={19} /></span><div><b style={{ fontSize: 14 }}>QR로 연결하기</b><div className="list-sub">새로운 사람을 네트워크에 추가</div></div></Link>
            <Link href="/events" className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 14 }}><span className="detail-icon" style={{ background: "#eeeaff" }}><CalendarCheck size={19} /></span><div><b style={{ fontSize: 14 }}>행사 이력 보기</b><div className="list-sub">만난 사람과 메모 다시 확인</div></div></Link>
          </div>
        </section>

        <aside className="card card-pad" style={{ marginTop: 30, display: "flex", gap: 14, alignItems: "center", background: "#f0f7e2" }}>
          <Sparkles size={21} color="#517711" /><div style={{ flex: 1 }}><b style={{ fontSize: 13 }}>연결 기록을 잊지 마세요</b><div className="list-sub">오늘 만난 2명에게 아직 메모가 없어요.</div></div><UsersRound size={18} />
        </aside>
      </main>
    </MobileShell>
  );
}
