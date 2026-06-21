"use client";
import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV === "development") {
      navigator.serviceWorker.getRegistrations().then((registrations) => registrations.forEach((registration) => registration.unregister()));
      if ("caches" in window) caches.keys().then((keys) => keys.filter((key) => key.startsWith("noogu-")).forEach((key) => caches.delete(key)));
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);
  return null;
}
