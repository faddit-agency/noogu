import Link from "next/link";
import { QrCode } from "lucide-react";
import { PublicProfileContent } from "./public-profile-content";

export default async function PublicProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  return <main className="mobile-page" style={{ paddingBottom: 40 }}>
    <header className="topbar"><Link className="brand" href="/">NOOGU<span className="brand-dot">.</span></Link><span className="chip green"><QrCode size={13} /> @{handle}</span></header>
    <PublicProfileContent/>
  </main>;
}
