"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EventCard } from "@/components/ui";
import { events } from "@/lib/mock-data";

export function EventsClient(){const [query,setQuery]=useState("");const [filter,setFilter]=useState("전체");const filtered=useMemo(()=>events.filter(event=>(filter==="전체"||(filter==="예정"&&event.status==="예정")||(filter==="참여 완료"&&event.status==="완료"))&&`${event.name} ${event.meta}`.toLowerCase().includes(query.toLowerCase())),[query,filter]);return <><section className="section"><div className="search"><Search size={18}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="행사명 또는 장소 검색" aria-label="행사 검색"/></div><div className="filter-row" style={{marginTop:12}}>{["전체","예정","참여 완료"].map(item=><button key={item} className={`chip ${filter===item?"dark":""}`} style={{border:0}} onClick={()=>setFilter(item)}>{item}{item==="전체"?` ${events.length}`:""}</button>)}</div></section><section className="section cards-grid">{filtered.map(event=><EventCard key={event.slug} event={event}/>)}{filtered.length===0&&<div className="card empty"><h3>조건에 맞는 행사가 없습니다</h3><p>검색어나 필터를 변경해보세요.</p></div>}</section></>}
