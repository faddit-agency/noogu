import Link from "next/link";
import { ArrowLeft, Camera, Sparkles, Upload } from "lucide-react";

export default function OnboardingPage() {
  return <main className="mobile-page" style={{ paddingBottom: 40 }}>
    <header className="topbar"><Link href="/auth" className="icon-button"><ArrowLeft size={19} /></Link><span className="eyebrow">Profile 1 / 2</span><span style={{ width: 42 }} /></header>
    <section style={{ marginTop: 18 }}><span className="eyebrow">Business card OCR</span><h1 className="page-title">명함 한 장이면<br />프로필 준비 끝.</h1><p className="page-copy">명함을 촬영하거나 업로드하면 정보를 자동으로 추출합니다. 모든 항목은 직접 수정할 수 있어요.</p></section>
    <section className="card section" style={{ minHeight: 210, display: "grid", placeItems: "center", border: "1px dashed #c8cbc5", background: "rgba(255,255,255,.55)" }}><div style={{ textAlign: "center" }}><div className="empty-icon"><Camera size={22} /></div><b style={{ fontSize: 14 }}>명함 앞면을 프레임에 맞춰주세요</b><p className="list-sub">JPG, PNG · 최대 10MB</p><div className="two-col" style={{ marginTop: 16 }}><button className="button light"><Camera size={16} /> 촬영</button><button className="button ghost"><Upload size={16} /> 업로드</button></div></div></section>
    <section className="card card-pad section form-grid"><div className="chip green" style={{ justifySelf: "start" }}><Sparkles size={13} /> OCR 추출 결과 예시</div><div className="two-col"><label className="field"><span>이름</span><input className="input" defaultValue="김한재" /></label><label className="field"><span>회사명</span><input className="input" defaultValue="NOOGU" /></label></div><div className="two-col"><label className="field"><span>직급</span><input className="input" defaultValue="Product Lead" /></label><label className="field"><span>전화번호</span><input className="input" defaultValue="010-2408-2027" /></label></div><label className="field"><span>이메일</span><input className="input" defaultValue="hanjae@noogu.kr" /></label><label className="field"><span>웹사이트</span><input className="input" defaultValue="https://noogu.kr" /></label></section>
    <Link href="/home" className="button green full section">프로필 만들기</Link>
  </main>;
}
