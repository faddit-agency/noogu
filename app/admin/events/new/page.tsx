import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { EventForm } from "./event-form";

export default function NewEventPage(){return <AdminShell active="행사 관리"><header className="admin-top"><div style={{display:"flex",alignItems:"center",gap:14}}><Link href="/admin/events" className="icon-button"><ArrowLeft size={19}/></Link><div><span className="eyebrow">Create event</span><h1 className="page-title" style={{fontSize:34}}>새 행사 만들기</h1></div></div></header><EventForm/></AdminShell>}
