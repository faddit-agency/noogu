import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { ProfileEditor } from "./profile-editor";

export default function ProfileEditPage(){return <MobileShell><main className="mobile-page"><header className="topbar"><Link href="/profile" className="icon-button"><ArrowLeft size={19}/></Link><span className="eyebrow">Edit profile</span><span style={{width:42}}/></header><section style={{marginTop:18,marginBottom:26}}><h1 className="page-title">프로필 편집</h1><p className="page-copy">공유 프로필에 표시할 정보와 연락처를 관리하세요.</p></section><ProfileEditor/></main></MobileShell>}
