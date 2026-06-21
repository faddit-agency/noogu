"use client";
import { useEffect, useState } from "react";
import { Check, Copy, Download, Share2 } from "lucide-react";
import QRCode from "qrcode";

const profilePath = "/u/hanjae";

function useProfileUrl() {
  const [url, setUrl] = useState(profilePath);
  useEffect(() => { const saved=localStorage.getItem("noogu:profile"); const handle=saved?JSON.parse(saved).handle:"hanjae"; setUrl(`${window.location.origin}/u/${handle||"hanjae"}`); }, []);
  return url;
}

export function QrImage() {
  const [src, setSrc] = useState("");
  const profileUrl = useProfileUrl();
  useEffect(() => { QRCode.toDataURL(profileUrl, { width: 420, margin: 2, color: { dark: "#171817", light: "#ffffff" } }).then(setSrc); }, [profileUrl]);
  return src ? <img src={src} width={240} height={240} alt="김한재 프로필 QR" style={{ width: "100%", height: "100%", borderRadius: 12 }} /> : <div className="qr-placeholder" />;
}

export function QrActions() {
  const [toast, setToast] = useState("");
  const profileUrl = useProfileUrl();
  const notify = (message: string) => setToast(message);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(""), 1800); return () => clearTimeout(timer); }, [toast]);
  const download = async (format: "png" | "svg") => {
    const content = format === "png" ? await QRCode.toDataURL(profileUrl, { width: 1024, margin: 4 }) : await QRCode.toString(profileUrl, { type: "svg", margin: 4 });
    const anchor = document.createElement("a");
    anchor.href = format === "png" ? content : URL.createObjectURL(new Blob([content], { type: "image/svg+xml" }));
    anchor.download = `NOOGU-hanjae.${format}`; anchor.click(); if (format === "svg") URL.revokeObjectURL(anchor.href);
    notify(`${format.toUpperCase()} QR을 저장했습니다.`);
  };
  return <>
    <div className="filter-row" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}><button className="button green" onClick={() => download("png")}><Download size={16} /> PNG</button><button className="button ghost" onClick={() => download("svg")}><Download size={16} /> SVG</button><button className="button ghost" onClick={() => { window.print(); notify("인쇄 창에서 PDF 저장을 선택하세요."); }}><Download size={16} /> PDF</button></div>
    <button className="button ghost full" style={{ marginTop: 10 }} onClick={async () => { if (navigator.share) { try { await navigator.share({ title: "김한재 | NOOGU", url: profileUrl }); } catch { /* user cancelled */ } } else { await navigator.clipboard?.writeText(profileUrl); notify("공유 링크를 복사했습니다."); } }}><Share2 size={17} /> 프로필 공유하기</button>
    <button className="button light full" style={{ marginTop: 10 }} onClick={() => { navigator.clipboard?.writeText(profileUrl); notify("프로필 링크를 복사했습니다."); }}><Copy size={16} /> {profileUrl.replace(/^https?:\/\//,"")}</button>
    {toast && <div className="toast"><Check size={15} style={{ display: "inline", verticalAlign: -3, marginRight: 7 }} />{toast}</div>}
  </>;
}
