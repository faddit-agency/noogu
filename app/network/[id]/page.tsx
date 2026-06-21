import Link from "next/link";
import { ArrowLeft, Building2, CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { Avatar } from "@/components/ui";
import { people } from "@/lib/mock-data";
import { NoteEditor } from "./note-editor";
import { TagEditor } from "./tag-editor";
import { ActionMenu } from "@/components/action-menu";

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const person = people.find((item) => item.id === id) ?? people[0];
  return <MobileShell><main className="mobile-page"><header className="topbar"><Link href="/network" className="icon-button"><ArrowLeft size={19} /></Link><span className="eyebrow">Connection</span><ActionMenu variant="person"/></header>
    <section className="card profile-hero" style={{ marginTop: 14 }}><Avatar person={person} size="lg" /><h1 className="profile-name">{person.name}</h1><div className="profile-role">{person.company} · {person.role}</div><p className="profile-bio">좋은 제품과 새로운 비즈니스 가능성을 만드는 사람들을 만나고 있습니다.</p><div className="two-col" style={{ marginTop: 20 }}><a href={`tel:${person.phone}`} className="button light"><Phone size={16} /> 전화</a><a href={`mailto:${person.email}`} className="button green"><Mail size={16} /> 이메일</a></div></section>
    <section className="card card-pad section detail-grid"><div className="detail-row"><span className="detail-icon"><CalendarDays size={18} /></span><div><div className="detail-label">연결한 때</div><div className="detail-value">2027년 3월 20일 오후 2:23</div></div></div><div className="detail-row"><span className="detail-icon"><MapPin size={18} /></span><div><div className="detail-label">만난 행사</div><div className="detail-value">{person.event} · 성수 XYZ Seoul</div></div></div><div className="detail-row"><span className="detail-icon"><Building2 size={18} /></span><div><div className="detail-label">연락처</div><div className="detail-value">{person.email} · {person.phone}</div></div></div></section>
    <NoteEditor initial={person.note} personId={person.id}/><TagEditor personId={person.id} initial={person.tags}/>
  </main></MobileShell>;
}
