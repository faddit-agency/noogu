"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Printer } from "lucide-react";

export function CheckinAction(){const [done,setDone]=useState(false);useEffect(()=>setDone(localStorage.getItem("noogu:demo-checkin")==="done"),[]);const complete=()=>{localStorage.setItem("noogu:demo-checkin","done");setDone(true)};return <>{done?<div className="card card-pad" style={{background:"#effbd7",textAlign:"center"}}><CheckCircle2 size={35} color="#4d7310"/><h3 style={{margin:"10px 0 5px"}}>체크인 완료</h3><p className="list-sub">{new Date().toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})} · 운영자 김한재</p></div>:<button className="button green full" onClick={complete}><CheckCircle2 size={18}/> 체크인 완료 처리</button>}<Link href="/admin/nametags" className="button ghost full" style={{marginTop:10}}><Printer size={17}/> 네임택 바로 출력</Link></>}
