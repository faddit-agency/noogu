import Link from "next/link";
import { Plus } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/ui";
import { EventsClient } from "./events-client";

export default function EventsPage(){return <MobileShell><main className="mobile-page"><TopBar action={<Link className="icon-button" href="/admin/events/new" aria-label="행사 만들기"><Plus size={20}/></Link>}/><section style={{marginTop:18}}><span className="eyebrow">Event history</span><h1 className="page-title">행사</h1><p className="page-copy">참여한 행사와 새로운 네트워킹 기회를 한곳에서 관리하세요.</p></section><EventsClient/><section className="card empty section"><div className="empty-icon"><Plus size={21}/></div><h3>직접 행사를 운영하시나요?</h3><p>랜딩페이지부터 참가 승인, 체크인과 네트워킹 리포트까지 준비해 드려요.</p><Link className="button light" href="/admin/events/new">행사 만들기</Link></section></main></MobileShell>}
