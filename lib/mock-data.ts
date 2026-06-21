export type Person = {
  id: string;
  name: string;
  company: string;
  role: string;
  initials: string;
  tone: "violet" | "orange" | "green" | "blue";
  event: string;
  connectedAt: string;
  tags: string[];
  note: string;
  email: string;
  phone: string;
};

export const people: Person[] = [
  { id: "minsu", name: "김민수", company: "ABC Company", role: "사업개발 리드", initials: "민수", tone: "violet", event: "Fashion Networking Day", connectedAt: "오늘 14:23", tags: ["바이어", "브랜드"], note: "ODM 생산 가능. MOQ 500, 9월 미팅 예정", email: "minsu@abc.co.kr", phone: "010-2354-1920" },
  { id: "soyeon", name: "박소연", company: "Atelier 071", role: "패션 디자이너", initials: "소연", tone: "orange", event: "Fashion Networking Day", connectedAt: "오늘 13:48", tags: ["디자이너"], note: "FW 캡슐 컬렉션 협업 논의", email: "hello@atelier071.kr", phone: "010-8852-1042" },
  { id: "junho", name: "이준호", company: "North Ventures", role: "Investment Manager", initials: "준호", tone: "green", event: "Seoul Startup Meetup", connectedAt: "5월 18일", tags: ["투자자"], note: "다음 라운드 시작 전 IR 자료 전달", email: "junho@north.vc", phone: "010-9412-0083" },
  { id: "emma", name: "Emma Choi", company: "Material Lab", role: "Founder", initials: "EC", tone: "blue", event: "Material Futures 2027", connectedAt: "4월 02일", tags: ["원단", "공장"], note: "재생 나일론 샘플 요청", email: "emma@materiallab.io", phone: "+82 10-3318-2219" },
];

export const events = [
  { slug: "fashion-networking-2027", day: "20", month: "MAR", name: "Fashion Networking Day", meta: "2027.03.20 · 성수 XYZ Seoul", tone: "", count: 12, status: "오늘" },
  { slug: "seoul-startup-meetup", day: "18", month: "MAY", name: "Seoul Startup Meetup", meta: "2027.05.18 · 드림플러스 강남", tone: "violet", count: 8, status: "예정" },
  { slug: "material-futures", day: "02", month: "APR", name: "Material Futures 2027", meta: "2027.04.02 · DDP 디자인랩", tone: "orange", count: 5, status: "완료" },
];

export const participants = [
  { name: "김민수", company: "ABC Company", role: "사업개발 리드", status: "승인", applied: "오늘 10:34" },
  { name: "박소연", company: "Atelier 071", role: "패션 디자이너", status: "대기", applied: "오늘 09:18" },
  { name: "이준호", company: "North Ventures", role: "Investment Manager", status: "체크인", applied: "어제 18:42" },
  { name: "최하나", company: "Studio H", role: "Creative Director", status: "대기", applied: "어제 17:23" },
];
