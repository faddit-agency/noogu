import Link from "next/link";
import { ScanLine, ShieldCheck } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/ui";
import { QrActions, QrImage } from "./qr-actions";
import { ActionMenu } from "@/components/action-menu";

export default function QrPage() {
  return <MobileShell><main className="mobile-page">
    <TopBar action={<ActionMenu variant="qr"/>} />
    <section style={{ marginTop: 18, textAlign: "center" }}><span className="eyebrow">Your networking identity</span><h1 className="page-title">스캔하고, 연결하세요.</h1><p className="page-copy">이 QR은 한재님의 프로필과 연결됩니다.</p></section>
    <section className="card qr-panel section"><div className="qr-ring" /><span className="chip dark"><ShieldCheck size={13} /> 행사 전용 보안 QR</span><div className="qr-box"><QrImage /></div><div className="avatar lg green" style={{ margin: "0 auto 12px" }}>한재</div><h2 style={{ margin: 0, fontSize: 20 }}>김한재</h2><p style={{ color: "#aeb2ae", fontSize: 13, margin: "5px 0 0" }}>NOOGU · Product Lead</p></section>
    <section className="section"><QrActions /></section>
    <Link href="/connect/demo" className="card card-pad section" style={{ display: "flex", alignItems: "center", gap: 14 }}><span className="detail-icon" style={{ background: "#effbd7" }}><ScanLine size={19} /></span><div style={{ flex: 1 }}><b style={{ fontSize: 14 }}>다른 사람의 QR 스캔</b><div className="list-sub">카메라를 열어 바로 연결하세요</div></div><span>→</span></Link>
  </main></MobileShell>;
}
