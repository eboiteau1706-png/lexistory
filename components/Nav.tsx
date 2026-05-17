"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const STREAK = 1;

export default function Nav() {
  const [loading, setLoading] = useState(false);
  const [user, setUser]       = useState<any>(null);
  const [ready, setReady]     = useState(false);
  const supabase = createClient();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Vérifie la session au chargement
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setReady(true);
    });

    // Écoute les changements d'auth
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setReady(true);
    });

    return () => listener.subscription.unsubscribe();
  }, [pathname]); // re-vérifie à chaque changement de page

  async function handlePremium() {
    setLoading(true);
    try {
      const res  = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { alert("Erreur, réessaie."); }
    finally { setLoading(false); }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Lexi<span>Story</span></div>
      <div className={styles.right}>
        <div className={styles.streak}>🔥 {STREAK} jour</div>

        {ready && (
          user ? (
            <button className={styles.btnGhost} onClick={() => router.push("/profile")}>
              Mon profil
            </button>
          ) : (
            <button className={styles.btnGhost} onClick={() => router.push("/login")}>
              Connexion
            </button>
          )
        )}

        <button className={styles.btnPrimary} onClick={handlePremium} disabled={loading}>
          {loading ? "..." : "Premium — 1,99€/mois"}
        </button>
      </div>
    </nav>
  );
}
