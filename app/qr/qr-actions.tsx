"use client";
import { useEffect, useState } from "react";
import { Check, Copy, Download, Share2 } from "lucide-react";
import QRCode from "qrcode";

const profileUrl = "https://noogu.kr/u/hanjae";

export function QrImage() {
  const [src, setSrc] = useState("");
  useEffect(() => { QRCode.toDataURL(profileUrl, { width: 420, margin: 2, color: { dark: "#171817", light: "#ffffff" } }).then(setSrc); }, []);
  return src ? <img src={src} width={240} height={240} alt="김한재 프로필 QR" style={{ width: "100%", height: "100%", borderRadius: 12 }} /> : <div className="qr-placeholder" />;
}

export function QrActions() {
  const [toast, setToast] = useState("");
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
    <button className="button ghost full" style={{ marginTop: 10 }} onClick={() => navigator.share ? navigator.share({ title: "김한재 | NOOGU", url: profileUrl }) : notify("이 브라우저는 시스템 공유를 지원하지 않습니다.")}><Share2 size={17} /> 프로필 공유하기</button>
    <button className="button light full" style={{ marginTop: 10 }} onClick={() => { navigator.clipboard?.writeText(profileUrl); notify("프로필 링크를 복사했습니다."); }}><Copy size={16} /> noogu.kr/u/hanjae</button>
    {toast && <div className="toast"><Check size={15} style={{ display: "inline", verticalAlign: -3, marginRight: 7 }} />{toast}</div>}
  </>;
}
