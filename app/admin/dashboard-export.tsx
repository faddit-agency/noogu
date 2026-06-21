"use client";
import { Download } from "lucide-react";
import { participants } from "@/lib/mock-data";
export function DashboardExport(){const download=()=>{const csv="\uFEFF이름,회사,직급,상태,신청일\n"+participants.map(p=>[p.name,p.company,p.role,p.status,p.applied].map(v=>`"${v}"`).join(",")).join("\n");const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="NOOGU-recent-participants.csv";a.click();URL.revokeObjectURL(url)};return <button className="button ghost" onClick={download}><Download size={16}/> CSV</button>}
