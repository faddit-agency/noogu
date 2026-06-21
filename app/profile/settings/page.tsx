import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { ProfileSettings } from "./settings-client";

export default function ProfileSettingsPage(){return <MobileShell><main className="mobile-page"><header className="topbar"><Link href="/profile" className="icon-button"><ArrowLeft size={19}/></Link><span className="eyebrow">Settings</span><span style={{width:42}}/></header><section style={{marginTop:18,marginBottom:26}}><h1 className="page-title">설정</h1><p className="page-copy">프로필 공개 범위와 알림을 관리하세요.</p></section><ProfileSettings/></main></MobileShell>}
