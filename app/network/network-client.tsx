"use client";
import { useMemo, useState } from "react";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { people } from "@/lib/mock-data";
import { PersonRow } from "@/components/ui";

export function NetworkClient() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("전체");
  const filtered = useMemo(() => people.filter((person) => {
    const haystack = `${person.name} ${person.company} ${person.role}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (tag === "전체" || person.tags.includes(tag));
  }), [query, tag]);
  return <>
    <section className="section"><div className="search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="이름, 회사, 직급 검색" /><SlidersHorizontal size={18} /></div><div className="filter-row" style={{ marginTop: 12 }}>{["전체", "바이어", "브랜드", "디자이너", "투자자", "원단"].map((item) => <button key={item} onClick={() => setTag(item)} className={`chip ${tag === item ? "dark" : ""}`} style={{ border: 0 }}>{item}{item === "전체" ? ` ${people.length}` : ""}</button>)}</div></section>
    <section className="section"><div className="section-head"><h2 className="section-title">연결한 사람</h2><span className="section-link">{filtered.length}명</span></div><div className="card card-pad list" style={{ paddingTop: 4, paddingBottom: 4 }}>{filtered.map((person) => <PersonRow key={person.id} person={person} />)}{filtered.length === 0 && <div className="empty"><h3>검색 결과가 없어요</h3><p>다른 이름이나 태그로 찾아보세요.</p></div>}</div></section>
    <a href="/api/exports/connections.xlsx" className="button ghost full section"><Download size={17} /> 전체 네트워크 Excel 다운로드</a>
  </>;
}
