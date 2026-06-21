import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Person } from "@/lib/mock-data";

export function Avatar({ person, size = "" }: { person: Pick<Person, "initials" | "tone">; size?: "sm" | "lg" | "" }) {
  return <span className={`avatar ${person.tone} ${size}`}>{person.initials}</span>;
}

export function EventCard({ event }: { event: { slug: string; day: string; month: string; name: string; meta: string; tone: string; count: number } }) {
  return (
    <Link href={`/events/${event.slug}`} className="card event-card">
      <div className={`event-art ${event.tone}`}><span className="month">{event.month}</span><span className="date">{event.day}</span></div>
      <div style={{ alignSelf: "center", minWidth: 0 }}>
        <div className="event-name">{event.name}</div>
        <div className="event-meta">{event.meta}<br />새로운 연결 {event.count}명</div>
      </div>
    </Link>
  );
}

export function PersonRow({ person }: { person: Person }) {
  return (
    <Link href={`/network/${person.id}`} className="list-row">
      <Avatar person={person} />
      <div className="list-content"><p className="list-title">{person.name}</p><p className="list-sub">{person.company} · {person.role}</p></div>
      <div className="list-trail"><div className="list-time">{person.connectedAt}</div><ChevronRight size={16} style={{ margin: "7px 0 0 auto", color: "#aaa" }} /></div>
    </Link>
  );
}

export function TopBar({ action }: { action?: React.ReactNode }) {
  return <header className="topbar"><BrandLink />{action ?? <span className="chip green">MVP Preview</span>}</header>;
}

function BrandLink() { return <Link href="/home" className="brand">NOOGU<span className="brand-dot">.</span></Link>; }
