import * as XLSX from "xlsx";
import { people } from "@/lib/mock-data";

const safeCell = (value: string) => /^[=+\-@]/.test(value) ? `'${value}` : value;

export async function GET() {
  const rows = people.map((person) => ({
    행사명: safeCell(person.event), 연결일: "2027-03-20", 연결시간: person.connectedAt.replace("오늘 ", ""), 이름: safeCell(person.name), 회사명: safeCell(person.company), 직급: safeCell(person.role), 이메일: safeCell(person.email), 전화번호: safeCell(person.phone), 웹사이트: "", 태그: safeCell(person.tags.join(", ")), 메모: safeCell(person.note),
  }));
  const sheet = XLSX.utils.json_to_sheet(rows); sheet["!cols"] = [24, 12, 10, 12, 20, 20, 26, 18, 22, 20, 38].map((wch) => ({ wch }));
  const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, "Connections");
  const buffer = XLSX.write(book, { type: "buffer", bookType: "xlsx" });
  return new Response(buffer, { headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Content-Disposition": "attachment; filename=NOOGU-connections.xlsx", "Cache-Control": "private, no-store" } });
}
