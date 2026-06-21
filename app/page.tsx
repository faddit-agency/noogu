import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight, BarChart3, Building2, CalendarDays, Check, Clock3,
  FileSpreadsheet, Globe2, MapPin, QrCode, ScanLine, ShieldCheck, Sparkles,
  Tag, UserPlus, UsersRound,
} from "lucide-react";

type PageProps = { searchParams: Promise<{ lang?: string }> };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const isEnglish = (await searchParams).lang === "en";
  const title = isEnglish ? "NOOGU — Turn today's meetings into tomorrow's relationships" : "NOOGU — 오늘의 만남을 내일의 관계로";
  const description = isEnglish ? "Remember who you met, when and where. Build lasting event connections with NOOGU." : "누구를, 언제, 어디서 만났는지. QR 기반 행사 네트워킹과 관계 관리를 NOOGU에서 시작하세요.";
  return { title, description, openGraph: { title, description, type: "website" } };
}

const features = [
  { slug: "qr-connect", icon: QrCode, tone: "lime", number: "01", ko: ["QR로 바로 연결", "네임택이나 프로필 QR을 스캔하면 그 자리에서 서로의 네트워크에 연결됩니다."], en: ["Connect instantly by QR", "Scan a name tag or profile QR to connect on the spot."] },
  { slug: "meeting-context", icon: MapPin, tone: "violet", number: "02", ko: ["만남의 맥락까지 기록", "누구를, 언제, 어느 행사에서 만났는지 자동으로 남아 기억을 대신합니다."], en: ["Remember the context", "Automatically save who you met, when, where and at which event."] },
  { slug: "notes-tags", icon: Tag, tone: "orange", number: "03", ko: ["메모와 태그로 관리", "다음 미팅, 관심 분야, 협업 가능성을 나만의 메모와 태그로 정리하세요."], en: ["Organize with notes and tags", "Keep next steps, interests and opportunities clear with private notes and tags."] },
  { slug: "excel-export", icon: FileSpreadsheet, tone: "blue", number: "04", ko: ["Excel로 후속 관리", "행사별 또는 전체 네트워크를 내려받아 영업과 관계 관리에 바로 활용하세요."], en: ["Follow up with Excel", "Export event-specific or complete network data for sales and relationship management."] },
];

const steps = [
  { icon: CalendarDays, ko: ["행사 참가", "프로필을 만들고 행사에 신청하세요."], en: ["Join an event", "Create your profile and register for an event."] },
  { icon: ScanLine, ko: ["QR 스캔", "네임택 QR로 가볍게 연결하세요."], en: ["Scan a QR", "Connect effortlessly through a name tag QR."] },
  { icon: UserPlus, ko: ["자동 기록", "사람·시간·장소가 함께 저장됩니다."], en: ["Save automatically", "Person, time and place are recorded together."] },
  { icon: Sparkles, ko: ["관계로 발전", "메모를 남기고 다음 행동으로 이어가세요."], en: ["Build the relationship", "Add notes and turn a meeting into a next step."] },
];

export default async function LandingPage({ searchParams }: PageProps) {
  const isEnglish = (await searchParams).lang === "en";
  const t = (ko: string, en: string) => isEnglish ? en : ko;
  return <main className="landing" lang={isEnglish ? "en" : "ko"}>
    <header className="landing-nav">
      <div className="landing-container landing-nav-inner">
        <Link href="/" className="landing-logo">NOOGU<span>.</span></Link>
        <nav className="landing-links" aria-label={t("랜딩페이지 메뉴", "Landing page menu")}>
          <a href="#why">{t("서비스 소개", "About")}</a><a href="#features">{t("주요 기능", "Features")}</a><a href="#organizer">{t("주최자", "Organizers")}</a>
        </nav>
        <div className="landing-nav-actions"><div className="language-switch"><Globe2 size={15}/><Link href="/" className={!isEnglish?"active":""}>KO</Link><span>/</span><Link href="/?lang=en" className={isEnglish?"active":""}>EN</Link></div><Link href="/auth" className="landing-login">{t("로그인", "Log in")}</Link><Link href="/auth" className="button green">{t("무료로 시작하기", "Get started free")} <ArrowRight size={16}/></Link></div>
      </div>
    </header>

    <section className="landing-hero">
      <div className="landing-orb landing-orb-one"/><div className="landing-orb landing-orb-two"/>
      <div className="landing-container landing-hero-grid">
        <div className="landing-hero-copy">
          <span className="landing-pill"><Sparkles size={14}/> Event networking, remembered.</span>
          <h1>{t("좋은 만남은", "Great connections")}<br/><em>{t("행사 이후", "should continue")}</em>{t("에도", "")}<br/>{t("계속되어야 하니까.", "beyond the event.")}</h1>
          <p>{t("누구를, 언제, 어디서 만났는지.", "Remember who you met, when and where.")}<br/>{t("NOOGU가 모든 만남의 맥락을 기억해 드립니다.", "NOOGU keeps the context of every connection.")}</p>
          <div className="landing-hero-actions"><Link href="/auth" className="button green landing-cta">{t("무료로 시작하기", "Get started free")} <ArrowRight size={18}/></Link><Link href="/home" className="button landing-demo">{t("제품 둘러보기", "Explore the product")}</Link></div>
          <div className="landing-proof"><span><Check size={15}/> {t("신용카드 불필요", "No credit card required")}</span><span><Check size={15}/> {t("3분 안에 프로필 완성", "Profile ready in 3 minutes")}</span></div>
        </div>

        <div className="landing-product-stage" aria-label="NOOGU 모바일 앱 미리보기">
          <div className="landing-float-card float-event"><span className="mini-icon violet"><CalendarDays size={17}/></span><div><small>{t("오늘의 행사", "Today's event")}</small><b>Fashion Networking Day</b></div></div>
          <div className="landing-phone">
            <div className="phone-status"><span>9:41</span><span>● ● ▰</span></div>
            <div className="phone-header"><b>NOOGU<span>.</span></b><span className="phone-avatar">{t("한재", "HJ")}</span></div>
            <div className="phone-greeting"><small>GOOD AFTERNOON</small><h2>{t("오늘도", "Make another")}<br/>{t("좋은 만남을.", "great connection.")}</h2></div>
            <div className="phone-event"><span>TODAY · 14:00</span><h3>Fashion<br/>Networking Day</h3><p>{t("성수 XYZ Seoul", "XYZ Seoul, Seongsu")}</p><div className="phone-event-art"/></div>
            <div className="phone-stats"><div><small>{t("총 연결", "Connections")}</small><b>24</b></div><div><small>{t("이번 달", "This month")}</small><b>12</b></div><div><small>{t("참여 행사", "Events")}</small><b>3</b></div></div>
            <div className="phone-list-head"><b>{t("최근 연결", "Recent")}</b><span>{t("전체보기", "View all")}</span></div>
            <div className="phone-person"><span className="phone-avatar violet">{t("민수", "MK")}</span><div><b>{t("김민수", "Minsu Kim")}</b><small>ABC Company · {t("사업개발", "Business Development")}</small></div><time>14:23</time></div>
          </div>
          <div className="landing-float-card float-connect"><span className="mini-icon lime"><UserPlus size={17}/></span><div><small>{t("새로운 연결", "New connection")}</small><b>{t("김민수님과 연결됐어요", "Connected with Minsu Kim")}</b></div><span className="success-dot"><Check size={13}/></span></div>
        </div>
      </div>
      <div className="landing-container landing-trust"><span>{t("행사에서 만남이 사라지지 않도록", "Keep every event connection alive")}</span><div><b>QR</b><b>CONTEXT</b><b>FOLLOW-UP</b><b>RELATIONSHIP</b></div></div>
    </section>

    <section className="landing-section landing-problem" id="why">
      <div className="landing-container">
        <div className="landing-section-heading center"><span className="eyebrow">THE PROBLEM</span><h2>{t("명함은 남았는데,", "You kept the business card,")}<br/><em>{t("그 사람이 기억나지 않는다면.", "but forgot who they were.")}</em></h2><p>{t("행사에서 나눈 좋은 대화가 종이 명함 한 장으로 끝나지 않도록.", "A great conversation deserves to last beyond a paper card.")}</p></div>
        <div className="problem-flow">
          <div className="problem-card muted"><span>01</span><h3>{t("명함을 교환하고", "Exchange business cards")}</h3><p>{t("짧은 인사와 함께 명함을 주고받습니다.", "Trade cards after a quick introduction.")}</p></div><ArrowRight className="flow-arrow"/>
          <div className="problem-card muted"><span>02</span><h3>{t("행사가 끝나면", "When the event ends")}</h3><p>{t("수십 장의 명함이 서랍과 가방에 쌓입니다.", "Dozens of cards pile up in bags and drawers.")}</p></div><ArrowRight className="flow-arrow"/>
          <div className="problem-card dark"><span>03</span><h3>{t("“이 사람 누구였지?”", "“Who was this again?”")}</h3><p>{t("만난 이유와 대화의 맥락이 사라집니다.", "The reason and context of the meeting disappear.")}</p></div>
        </div>
        <div className="landing-answer"><span className="answer-mark">N</span><div><small>NOOGU IS DIFFERENT</small><h3>{t("사람만 저장하지 않습니다.", "We save more than a contact.")}<br/>{t("만남의 ", "We save the ")}<em>{t("맥락", "context")}</em>{t("을 저장합니다.", " of the meeting.")}</h3></div><div className="answer-context"><span><UsersRound size={17}/> {t("누구를", "Who")}</span><span><Clock3 size={17}/> {t("언제", "When")}</span><span><MapPin size={17}/> {t("어디서", "Where")}</span><span><Sparkles size={17}/> {t("왜", "Why")}</span></div></div>
      </div>
    </section>

    <section className="landing-section" id="features">
      <div className="landing-container">
        <div className="landing-section-heading"><span className="eyebrow">BUILT FOR REAL CONNECTIONS</span><h2>{t("스캔하는 순간부터", "From the first scan")}<br/>{t("후속 미팅까지.", "to the next meeting.")}</h2><p>{t("행사에서 시작한 만남을 관계로 발전시키는 데 필요한 모든 것.", "Everything you need to turn an event meeting into a lasting relationship.")}</p></div>
        <div className="landing-feature-grid">{features.map(({icon:Icon,tone,number,ko,en})=>{const [title,copy]=isEnglish?en:ko;return <article className="landing-feature-card" key={number}><div className={`feature-icon ${tone}`}><Icon size={25}/></div><span className="feature-number">{number}</span><h3>{title}</h3><p>{copy}</p></article>})}</div>
      </div>
    </section>

    <section className="landing-section landing-how">
      <div className="landing-container">
        <div className="landing-section-heading center"><span className="eyebrow">HOW IT WORKS</span><h2>{t("만남을 기록하는", "The most natural way")}<br/>{t("가장 자연스러운 방법.", "to remember a meeting.")}</h2></div>
        <div className="landing-steps">{steps.map(({icon:Icon,ko,en},index)=>{const [label,copy]=isEnglish?en:ko;return <div className="landing-step" key={label}><div className="step-top"><span>{String(index+1).padStart(2,"0")}</span><div><Icon size={24}/></div></div><h3>{label}</h3><p>{copy}</p>{index<steps.length-1&&<ArrowRight className="step-arrow" size={19}/>}</div>})}</div>
      </div>
    </section>

    <section className="landing-section landing-organizer" id="organizer">
      <div className="landing-container organizer-grid">
        <div className="organizer-copy"><span className="landing-pill dark"><Building2 size={14}/> FOR ORGANIZERS</span><h2>{t("행사 운영도,", "Event operations")}<br/>{t("네트워킹 성과도", "and networking results,")}<br/>{t("한곳에서.", "all in one place.")}</h2><p>{t("신청과 승인부터 체크인, 네임택 출력, 연결 리포트까지. 운영은 더 단순하게, 행사 가치는 더 선명하게.", "From registration and approval to check-in, name tags and connection reports. Simpler operations, clearer event value.")}</p><ul><li><span><Check size={14}/></span>{t("행사 랜딩페이지 자동 생성", "Automatic event landing pages")}</li><li><span><Check size={14}/></span>{t("참가 승인과 체크인 QR", "Participant approval and check-in QR")}</li><li><span><Check size={14}/></span>{t("네트워킹 QR 네임택 출력", "Networking QR name tag printing")}</li><li><span><Check size={14}/></span>{t("실시간 연결 성과 리포트", "Real-time connection reports")}</li></ul><Link href="/admin" className="button green landing-cta">{t("주최자 기능 보기", "Explore organizer tools")} <ArrowRight size={17}/></Link></div>
        <div className="organizer-dashboard">
          <div className="dash-side"><b>N<span>.</span></b><i/><i/><i className="active"/><i/></div>
          <div className="dash-main"><div className="dash-head"><div><small>ORGANIZER WORKSPACE</small><h3>{t("운영 대시보드", "Operations dashboard")}</h3></div><span>+ {t("행사 만들기", "Create event")}</span></div><div className="dash-metrics"><div><small>{t("총 참가자", "Participants")}</small><b>1,248</b><em>+12.4%</em></div><div><small>{t("총 연결", "Connections")}</small><b>3,892</b><em>+18.2%</em></div><div><small>{t("체크인", "Check-ins")}</small><b>962</b><em>77.1%</em></div></div><div className="dash-chart"><div className="dash-chart-head"><b>{t("시간대별 연결", "Connections by hour")}</b><span>{t("오늘", "Today")}</span></div><div className="dash-bars">{[34,52,46,78,92,67,48,58,38].map((height,index)=><i key={index} style={{height:`${height}%`}}/>)}</div></div></div>
          <div className="dashboard-badge"><BarChart3 size={18}/><div><small>{t("오늘 생성된 연결", "Connections today")}</small><b>426{t("건", "")}</b></div><span>+18.2%</span></div>
        </div>
      </div>
    </section>

    <section className="landing-section landing-values">
      <div className="landing-container value-grid"><div className="value-copy"><span className="eyebrow">YOUR NETWORK, YOURS</span><h2>{t("관계는 쌓일수록", "Your network becomes")}<br/>{t("더 큰 자산이 됩니다.", "more valuable over time.")}</h2><p>{t("행사가 끝나도 연결은 사라지지 않습니다. 내 네트워크는 언제든 검색하고, 분류하고, 다시 이어갈 수 있습니다.", "Connections do not disappear when the event ends. Search, organize and reconnect with your network anytime.")}</p></div><div className="value-cards"><div className="value-card"><ShieldCheck size={23}/><h3>{t("안전한 개인정보", "Privacy by design")}</h3><p>{t("연결된 사람에게만 공개하고, 내 메모와 태그는 오직 나만 볼 수 있어요.", "Share details only with connections. Your notes and tags stay private.")}</p></div><div className="value-card accent"><FileSpreadsheet size={23}/><h3>{t("내 데이터는 내 손에", "Your data stays yours")}</h3><p>{t("필요할 때 언제든 Excel로 내려받아 자유롭게 활용하세요.", "Export to Excel anytime and use your network data freely.")}</p></div></div></div>
    </section>

    <section className="landing-cta-section"><div className="landing-container landing-cta-card"><div className="cta-orbit one"/><div className="cta-orbit two"/><span className="eyebrow">READY TO CONNECT?</span><h2>{t("오늘의 만남을", "Turn today's meeting")}<br/>{t("내일의 관계로.", "into tomorrow's relationship.")}</h2><p>{t("좋은 사람을 만나는 순간, NOOGU를 열어보세요.", "When you meet someone great, open NOOGU.")}</p><div><Link href="/auth" className="button green landing-cta">{t("무료로 시작하기", "Get started free")} <ArrowRight size={18}/></Link><Link href="/event/fashion-networking-2027" className="button landing-demo">{t("행사 데모 보기", "View event demo")}</Link></div></div></section>

    <footer className="landing-footer"><div className="landing-container"><div className="footer-main"><div><Link href={isEnglish?"/?lang=en":"/"} className="landing-logo">NOOGU<span>.</span></Link><p>{t("누구를, 언제, 어디서 만났는지.", "Remember who, when and where.")}</p></div><div className="footer-links"><div><b>Product</b><a href="#features">{t("주요 기능", "Features")}</a><Link href="/home">{t("참가자 앱", "Attendee app")}</Link><Link href="/admin">{t("주최자 센터", "Organizer center")}</Link></div><div><b>Company</b><a href="#why">{t("서비스 소개", "About")}</a><a href="mailto:hello@noogu.kr">{t("문의하기", "Contact")}</a></div><div><b>Legal</b><a href="#">{t("이용약관", "Terms")}</a><a href="#">{t("개인정보처리방침", "Privacy")}</a></div></div></div><div className="footer-bottom"><span>© 2027 NOOGU. All rights reserved.</span><span>Made for better connections.</span></div></div></footer>
  </main>;
}
