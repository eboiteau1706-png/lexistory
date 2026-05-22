"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<{ message: string; color: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("announcements")
      .select("message, color, expires_at")
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setAnnouncement(data[0]);
      });
  }, []);

  if (!announcement) return null;

  const colors: Record<string, { bg: string; text: string; border: string }> = {
    red:    { bg: "rgba(232,80,80,0.15)",   text: "#e88080", border: "rgba(232,80,80,0.3)" },
    orange: { bg: "rgba(232,160,80,0.15)",  text: "#e8a050", border: "rgba(232,160,80,0.3)" },
    blue:   { bg: "rgba(80,120,232,0.15)",  text: "#7090e8", border: "rgba(80,120,232,0.3)" },
    green:  { bg: "rgba(109,186,138,0.15)", text: "#6dba8a", border: "rgba(109,186,138,0.3)" },
    gold:   { bg: "rgba(232,201,122,0.15)", text: "#e8c97a", border: "rgba(232,201,122,0.3)" },
  };

  const c = colors[announcement.color] || colors.gold;

  return (
    <div style={{
      position: "fixed",
      top: "60px",
      left: 0, right: 0,
      zIndex: 98,
      background: c.bg,
      borderBottom: `1px solid ${c.border}`,
      padding: "10px 24px",
      textAlign: "center",
      fontSize: "0.88rem",
      fontWeight: 600,
      color: c.text,
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    }}>
      📢 {announcement.message}
      <button
        onClick={() => setAnnouncement(null)}
        style={{ background: "none", border: "none", color: c.text, cursor: "pointer", opacity: 0.6, fontSize: "0.85rem", marginLeft: "8px" }}
      >
        ✕
      </button>
    </div>
  );
}
