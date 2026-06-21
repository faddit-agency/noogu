"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Apple, Mail } from "lucide-react";

export function AuthForm() {
  const router=useRouter(); const [email,setEmail]=useState(""); const [error,setError]=useState("");
  const proceed=(provider:string)=>{localStorage.setItem("noogu:auth",JSON.stringify({email:email||`${provider}@noogu.local`,provider,signedInAt:new Date().toISOString()}));router.push(localStorage.getItem("noogu:profile")?"/home":"/onboarding")};
  const emailLogin=()=>{if(!/^\S+@\S+\.\S+$/.test(email)){setError("올바른 이메일 주소를 입력해주세요.");return}proceed("email")};
  return <section className="card card-pad form-grid"><button className="button full" onClick={()=>proceed("apple")}><Apple size={18}/> Apple로 계속하기</button><button className="button ghost full" onClick={()=>proceed("google")}>G&nbsp;&nbsp;Google로 계속하기</button><div className="form-divider"><span/>또는<span/></div><label className="field"><span>이메일</span><input className="input" type="email" value={email} onChange={event=>{setEmail(event.target.value);setError("")}} onKeyDown={event=>event.key==="Enter"&&emailLogin()} placeholder="name@company.com"/></label>{error&&<p className="form-error">{error}</p>}<button className="button green full" onClick={emailLogin}><Mail size={17}/> 이메일로 계속하기</button></section>;
}
