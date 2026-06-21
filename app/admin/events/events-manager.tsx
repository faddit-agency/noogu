"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, MoreHorizontal, Search, UsersRound } from "lucide-react";

const initialEvents = [
  { id: "fashion", name: "Fashion Networking Day", date: "2027.03.20", venue: "성수 XYZ Seoul", applicants: 186, checkins: 98, status: "진행 중", slug: "fashion-networking-2027" },
  { id: "startup", name: "Seoul Startup Meetup", date: "2027.05.18", venue: "드림플러스 강남", applicants: 84, checkins: 0, status: "게시", slug: "seoul-startup-meetup" },
  { id: "material", name: "Material Futures 2027", date: "2027.04.02", venue: "DDP 디자인랩", applicants: 128, checkins: 112, status: "종료", slug: "material-futures" },
  { id: "buyer", name: "Global Buyer Night", date: "2027.06.12", venue: "서울 패션허브", applicants: 0, checkins: 0, status: "임시 저장", slug: "global-buyer-night" },
];

export function EventsManager() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("전체");
  const [events, setEvents] = useState(initialEvents);
  const [toast, setToast] = useState("");
  const filtered = useMemo(() => events.filter((event) => (filter === "전체" || event.status === filter) && `${event.name} ${event.venue}`.toLowerCase().includes(query.toLowerCase())), [events, filter, query]);
  const cycleStatus = (id: string) => setEvents((items) => items.map((event) => event.id === id ? { ...event, status: event.status === "임시 저장" ? "게시" : event.status === "게시" ? "종료" : event.status } : event));
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 1800); };

  return <>
    <div className="action-row" style={{ marginBottom: 14 }}><div className="search" style={{ flex: "1 1 280px" }}><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="행사명 또는 장소 검색"/></div><div className="filter-row">{["전체","진행 중","게시","임시 저장","종료"].map((item)=><button key={item} className={`chip ${filter===item?"dark":""}`} style={{border:0}} onClick={()=>setFilter(item)}>{item}</button>)}</div></div>
    <div className="card table-card table-wrap"><table className="table"><thead><tr><th>행사</th><th>일시 / 장소</th><th>신청</th><th>체크인</th><th>상태</th><th>관리</th></tr></thead><tbody>{filtered.map((event)=><tr key={event.id}><td><b>{event.name}</b></td><td>{event.date}<br/><span className="list-sub">{event.venue}</span></td><td>{event.applicants}명</td><td>{event.checkins}명</td><td><button className={`status ${event.status==="진행 중"?"live":event.status==="게시"?"approved":""}`} style={{border:0,cursor:"pointer"}} onClick={()=>cycleStatus(event.id)}>{event.status}</button></td><td><div className="action-row"><Link href={`/admin/events/${event.id}/participants`} className="icon-button" style={{width:34,height:34}} title="참가자"><UsersRound size={15}/></Link><Link href={`/event/${event.slug}`} className="icon-button" style={{width:34,height:34}} title="랜딩페이지"><ExternalLink size={15}/></Link><button className="icon-button" style={{width:34,height:34}} title="링크 복사" onClick={()=>{navigator.clipboard?.writeText(`${location.origin}/event/${event.slug}`);notify("행사 링크를 복사했습니다.")}}><Copy size={15}/></button><button className="icon-button" style={{width:34,height:34}}><MoreHorizontal size={16}/></button></div></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty"><h3>조건에 맞는 행사가 없습니다</h3><p>검색어나 상태 필터를 변경해보세요.</p></div>}</div>
    {toast&&<div className="toast">{toast}</div>}
  </>;
}
