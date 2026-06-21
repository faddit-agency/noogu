# NOOGU MVP

행사 참가자의 오프라인 만남을 사람·시간·장소·이유의 맥락으로 기록하는 모바일 우선 Event Networking SaaS 프로토타입입니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다. 데모 UI는 Supabase 환경 변수 없이 동작하며, 실제 데이터 연결 시 `.env.example`을 `.env.local`로 복사하고 Supabase 값을 입력합니다.

## 주요 경로

- 서비스 랜딩: `/`
- 참가자 앱: `/home`, `/events`, `/qr`, `/network`, `/profile`
- 공개 행사: `/event/fashion-networking-2027`
- 공개 프로필: `/u/hanjae`
- QR 연결: `/connect/demo`
- 주최자: `/admin`
- 체크인: `/checkin/demo`
- 제품/기술 설계: [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md)
- Supabase schema/RLS: [`supabase/migrations/0001_noogu_mvp.sql`](supabase/migrations/0001_noogu_mvp.sql)

## 구현 상태

반응형 UI, PWA shell, SSR 라우트, SEO metadata, OCR/연결/Excel API boundary, Supabase schema와 RLS를 포함합니다. OCR·메일·PDF·실제 Supabase 프로젝트는 provider/API key가 필요한 integration boundary입니다.
