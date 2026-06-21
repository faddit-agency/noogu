import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { EventsManager } from "./events-manager";

export default function AdminEventsPage(){return <AdminShell active="행사 관리"><header className="admin-top"><div><span className="eyebrow">Event operations</span><h1 className="page-title" style={{fontSize:34}}>행사 관리</h1><p className="page-copy">행사 생성부터 랜딩페이지, 신청 현황과 공개 상태를 관리합니다.</p></div><Link href="/admin/events/new" className="button green"><Plus size={17}/> 행사 만들기</Link></header><section className="metric-grid"><div className="card metric"><div className="metric-label">전체 행사</div><div className="metric-value">8</div></div><div className="card metric"><div className="metric-label">진행 중</div><div className="metric-value">1</div></div><div className="card metric"><div className="metric-label">게시 예정</div><div className="metric-value">3</div></div><div className="card metric"><div className="metric-label">누적 신청</div><div className="metric-value">1,248</div></div></section><section className="section"><EventsManager/></section></AdminShell>}
