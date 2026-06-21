"use client";
import { useState } from "react";
import { Check, Pencil } from "lucide-react";

export function NoteEditor({ initial }: { initial: string }) {
  const [editing, setEditing] = useState(false); const [note, setNote] = useState(initial);
  return <section className="card card-pad section"><div className="section-head" style={{ marginBottom: 10 }}><h2 className="section-title">메모</h2><button className="icon-button" style={{ width: 36, height: 36 }} onClick={() => setEditing(!editing)}>{editing ? <Check size={16} /> : <Pencil size={15} />}</button></div>{editing ? <textarea className="textarea" value={note} onChange={(event) => setNote(event.target.value)} autoFocus /> : <p style={{ margin: 0, whiteSpace: "pre-line", fontSize: 14, lineHeight: 1.75, color: "#4d514e" }}>{note}</p>}</section>;
}
