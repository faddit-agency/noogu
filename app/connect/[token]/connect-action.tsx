"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, UserPlus } from "lucide-react";

export function ConnectAction() {
  const [connected, setConnected] = useState(false);
  return connected ? <div><button className="button green full" disabled><Check size={18} /> 연결되었습니다</button><Link href="/network/minsu" className="button light full" style={{ marginTop: 10 }}>메모와 태그 남기기</Link></div> : <button className="button green full" onClick={() => setConnected(true)}><UserPlus size={18} /> 연결하기</button>;
}
