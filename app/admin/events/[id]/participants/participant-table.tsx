"use client";
import { useState } from "react";
import { Check, Search, X } from "lucide-react";
import { participants as source } from "@/lib/mock-data";

export function ParticipantTable() {
  const [participants,setParticipants]=useState(source); const [selected,setSelected]=useState<string[]>([]);
  const update=(status:string,names=selected)=>{setParticipants((items)=>items.map(p=>names.includes(p.name)?{...p,status}:p));setSelected([])};
  return <><div style={{display:"flex",gap:10,marginBottom:14}}><div className="search" style={{flex:1}}><Search size={17}/><input placeholder="이름, 회사, 이메일 검색"/></div>{selected.length>0&&<><button className="button green" onClick={()=>update("승인")}><Check size={16}/> {selected.length}명 승인</button><button className="button danger" onClick={()=>update("반려")}><X size={16}/> 반려</button></>}</div><div className="card table-card table-wrap"><table className="table"><thead><tr><th><input type="checkbox" onChange={(e)=>setSelected(e.target.checked?participants.map(p=>p.name):[])}/></th><th>참가자</th><th>회사 / 직급</th><th>신청일</th><th>상태</th><th>처리</th></tr></thead><tbody>{participants.map(p=><tr key={p.name}><td><input type="checkbox" checked={selected.includes(p.name)} onChange={()=>setSelected(s=>s.includes(p.name)?s.filter(n=>n!==p.name):[...s,p.name])}/></td><td><b>{p.name}</b></td><td>{p.company} · {p.role}</td><td>{p.applied}</td><td><span className={`status ${p.status==="승인"||p.status==="체크인"?"approved":"pending"}`}>{p.status}</span></td><td><button className="chip green" style={{border:0}} onClick={()=>update("승인",[p.name])}>승인</button></td></tr>)}</tbody></table></div></>;
}
