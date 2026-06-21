import { MoreHorizontal } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { TopBar } from "@/components/ui";
import { NetworkClient } from "./network-client";

export default function NetworkPage() {
  return <MobileShell><main className="mobile-page"><TopBar action={<button className="icon-button"><MoreHorizontal size={20} /></button>} /><section style={{ marginTop: 18 }}><span className="eyebrow">People you met</span><h1 className="page-title">나의 네트워크</h1><p className="page-copy">만남의 맥락과 다음 행동까지, 기억에 기대지 말고 기록하세요.</p></section><NetworkClient /></main></MobileShell>;
}
