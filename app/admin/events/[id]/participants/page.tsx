import Link from "next/link";
import { ArrowLeft, Download, Mail } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { ParticipantTable } from "./participant-table";

export default function ParticipantsPage() { return <AdminShell active="참가자 관리"><header className="admin-top"><div style={{display:"flex",alignItems:"center",gap:14}}><Link href="/admin" className="icon-button"><ArrowLeft size={19}/></Link><div><span className="eyebrow">Fashion Networking Day</span><h1 className="page-title" style={{fontSize:34}}>참가자 관리</h1></div></div><div style={{display:"flex",gap:8}}><button className="button ghost"><Download size={16}/> 내려받기</button><button className="button"><Mail size={16}/> 안내 메일</button></div></header><section className="section"><div className="filter-row" style={{marginBottom:18}}><span className="chip dark">전체 186</span><span className="chip">대기 44</span><span className="chip green">승인 142</span><span className="chip">반려 0</span><span className="chip violet">체크인 98</span></div><ParticipantTable/></section></AdminShell>; }
