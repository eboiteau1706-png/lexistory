"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem("cookie-consent", "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
      background: "var(--surface)", borderTop: "1px solid var(--border)",
      padding: "14px 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: "16px", flexWrap: "wrap",
      fontSize: "0.82rem", color: "var(--text-muted)",
      boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
    }}>
      <span style={{ flex: 1, minWidth: "200px" }}>
        🍪 Ce site utilise des cookies techniques nécessaires (Supabase, Stripe) et publicitaires (Google AdSense, en attente d&apos;approbation).{" "}
        <a href="/confidentialite#cookies" style={{ color: "var(--accent)", textDecoration: "underline" }}>En savoir plus</a>
      </span>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button onClick={refuse} style={{ padding: "7px 16px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem" }}>
          Refuser
        </button>
        <button onClick={accept} style={{ padding: "7px 16px", borderRadius: "8px", background: "var(--accent)", border: "none", color: "var(--bg)", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem" }}>
          Accepter
        </button>
      </div>
    </div>
  );
}
