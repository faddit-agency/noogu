import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let form: FormData;
  try { form = await request.formData(); }
  catch { return NextResponse.json({ data: null, error: { code: "INVALID_FORM", message: "multipart/form-data 형식으로 이미지를 전송해주세요." }, meta: null }, { status: 400 }); }
  if (!(form.get("image") instanceof File)) return NextResponse.json({ data: null, error: { code: "IMAGE_REQUIRED", message: "명함 이미지가 필요합니다." }, meta: null }, { status: 400 });
  // Integration boundary: strip EXIF, store privately, then call the selected OCR provider.
  return NextResponse.json({
    data: { fields: { name: { value: "김한재", confidence: .98 }, company: { value: "NOOGU", confidence: .96 }, jobTitle: { value: "Product Lead", confidence: .91 }, phone: { value: "010-2408-2027", confidence: .97 }, email: { value: "hanjae@noogu.kr", confidence: .99 }, website: { value: "https://noogu.kr", confidence: .95 }, address: { value: "서울특별시 성동구", confidence: .74 } }, requiresReview: ["address"] },
    error: null,
    meta: { provider: "mock", requestId: crypto.randomUUID() },
  });
}
