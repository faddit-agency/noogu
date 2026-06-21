"use client";

import { useEffect, useState } from "react";
import { Tag, X } from "lucide-react";

export function TagEditor({ personId, initial }: { personId: string; initial: string[] }) {
  const key = `noogu:tags:${personId}`;
  const [tags, setTags] = useState(initial);
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState("");
  useEffect(() => { const saved=localStorage.getItem(key); if(saved) setTags(JSON.parse(saved)); }, [key]);
  const persist = (next: string[]) => { setTags(next); localStorage.setItem(key, JSON.stringify(next)); };
  const add = () => { const clean=value.trim(); if(clean&&!tags.includes(clean)) persist([...tags,clean]); setValue(""); setAdding(false); };
  return <section className="card card-pad section"><div className="section-head"><h2 className="section-title">태그</h2><button className="chip" style={{ border: 0 }} onClick={()=>setAdding(true)}>+ 추가</button></div>{adding&&<div className="inline-editor"><input className="input" value={value} onChange={event=>setValue(event.target.value)} onKeyDown={event=>{if(event.key==="Enter")add();if(event.key==="Escape")setAdding(false)}} placeholder="새 태그" autoFocus/><button className="button green" onClick={add}>추가</button></div>}<div className="filter-row" style={{marginTop:adding?12:0}}>{tags.map((tag,index)=><span className={`chip ${index===0?"violet":"green"}`} key={tag}><Tag size={12}/>{tag}<button className="chip-remove" onClick={()=>persist(tags.filter(item=>item!==tag))} aria-label={`${tag} 삭제`}><X size={11}/></button></span>)}</div></section>;
}
