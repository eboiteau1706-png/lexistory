"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const STREAK = 1;

export default function Nav() {
  const [loading, setLoading]   = useState(false);
  const [user, setUser]         = useState<any>(null);
  const [ready, setReady]       = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setReady(true);
      if (session?.user) {
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); });
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); });
      } else {
        setIsPremium(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [pathname]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  async function handlePremium() {
    if (!user) { router.push("/login"); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { alert("Erreur, réessaie."); }
    finally { setLoading(false); }
  }

  function handleProfile() {
    setMenuOpen(false);
    router.push(user ? "/profile" : "/login");
  }

  return (
    <>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Lexi<span>Story</span></a>

        {/* Desktop */}
        <div className={styles.desktopRight}>
          <div className={styles.streak}>🔥 {STREAK} jour</div>
          {ready && (
            <button className={styles.btnGhost} onClick={handleProfile}>
              {user ? "Mon profil" : "Connexion"}
            </button>
          )}
          {/* Cache le bouton Premium si déjà abonné */}
          {ready && !isPremium && (
            <button className={styles.btnPrimary} onClick={handlePremium} disabled={loading}>
              {loading ? "..." : "Premium — 1,99€/mois"}
            </button>
          )}
          {ready && isPremium && (
            <div className={styles.premiumBadge}>✨ Premium</div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileStreak}>🔥 {STREAK} jour de série</div>
          {ready && (
            <button className={styles.mobileBtn} onClick={handleProfile}>
              {user ? "👤 Mon profil" : "🔑 Connexion"}
            </button>
          )}
          {ready && !isPremium && (
            <button className={styles.mobilePremiumBtn} onClick={() => { setMenuOpen(false); handlePremium(); }} disabled={loading}>
              {loading ? "..." : "✨ Premium — 1,99€/mois"}
            </button>
          )}
          {ready && isPremium && (
            <div className={styles.mobilePremiumBadge}>✨ Abonné Premium</div>
          )}
        </div>
      )}
    </>
  );
}
