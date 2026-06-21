import Link from "next/link";
import { AuthForm } from "./auth-form";

export default function AuthPage() {
  return <main className="mobile-page" style={{ minHeight: "100dvh", display: "grid", alignContent: "center", paddingBottom: 40 }}><section style={{ textAlign: "center", marginBottom: 34 }}><Link href="/" className="brand" style={{ fontSize: 30 }}>NOOGU<span className="brand-dot">.</span></Link><h1 className="page-title" style={{ marginTop: 34 }}>만남을 기억하는<br />가장 쉬운 방법.</h1><p className="page-copy">누구를, 언제, 어디서 만났는지.</p></section><AuthForm/><p style={{ color: "#858985", fontSize: 11, lineHeight: 1.6, textAlign: "center", marginTop: 20 }}>계속하면 NOOGU의 <Link href="/terms"><u>이용약관</u></Link> 및 <Link href="/privacy"><u>개인정보처리방침</u></Link>에 동의하게 됩니다.</p></main>;
}
