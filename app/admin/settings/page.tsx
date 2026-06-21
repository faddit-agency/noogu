import { AdminShell } from "@/components/admin-shell";
import { SettingsClient } from "./settings-client";

export default function SettingsPage(){return <AdminShell active="설정"><header className="admin-top"><div><span className="eyebrow">Workspace settings</span><h1 className="page-title" style={{fontSize:34}}>조직 설정</h1><p className="page-copy">브랜드 정보, 운영 기본값과 팀 권한을 관리합니다.</p></div><span className="chip dark">NOOGU Events</span></header><SettingsClient/></AdminShell>}
