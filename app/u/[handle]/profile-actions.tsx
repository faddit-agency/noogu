"use client";

import { Download, Instagram, Linkedin } from "lucide-react";

export function ContactSaveButton({name="김한재",company="NOOGU",jobTitle="Product Lead",email="hanjae@noogu.kr",phone="010-2408-2027",website="https://noogu.kr"}:{name?:string;company?:string;jobTitle?:string;email?:string;phone?:string;website?:string}) {
  const saveContact = () => {
    const vcard = [
      "BEGIN:VCARD", "VERSION:3.0", `FN:${name}`,
      `ORG:${company}`, `TITLE:${jobTitle}`, `EMAIL:${email}`,
      `TEL;TYPE=CELL:${phone}`, `URL:${website}`, "END:VCARD",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([vcard], { type: "text/vcard;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${name}-${company}.vcf`; anchor.click(); URL.revokeObjectURL(url);
  };
  return <button className="button green" onClick={saveContact}><Download size={16} /> 연락처 저장</button>;
}

export function SocialActions() {
  return <>
    <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="button ghost"><Linkedin size={17} /> LinkedIn</a>
    <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="button ghost"><Instagram size={17} /> Instagram</a>
  </>;
}
