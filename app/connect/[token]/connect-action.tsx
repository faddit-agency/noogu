"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, UserPlus } from "lucide-react";

export function ConnectAction({ token }: { token: string }) {
  const storageKey = `noogu:connection:${token}`;
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => setConnected(localStorage.getItem(storageKey) === "connected"), [storageKey]);
  const connect = async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/connections", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, eventId: "fashion-networking-2027" }) });
      if (!response.ok) throw new Error("연결을 저장하지 못했습니다.");
      localStorage.setItem(storageKey, "connected"); setConnected(true);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "잠시 후 다시 시도해주세요."); }
    finally { setLoading(false); }
  };
  return connected ? <div><button className="button green full" disabled><Check size={18} /> 연결되었습니다</button><Link href="/network/minsu" className="button light full" style={{ marginTop: 10 }}>메모와 태그 남기기</Link></div> : <div><button className="button green full" onClick={connect} disabled={loading}><UserPlus size={18} /> {loading ? "연결 중..." : "연결하기"}</button>{error&&<p className="form-error">{error}</p>}</div>;
}
