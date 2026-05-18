"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Nav.module.css";

export default function Nav() {
  const [loading, setLoading]     = useState(false);
  const [user, setUser]           = useState<any>(null);
  const [ready, setReady]         = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [streak, setStreak]       = useState(0);
  const [menuOpen, setMenuOpen]   = useState(false);
  const supabase = createClient();
  const router   = useRouter();
  const pathname = usePathname();

  async function loadStreak(userId: string) {
    const { data } = await supabase
      .from("stories_read")
      .select("read_at")
      .eq("user_id", userId)
      .order("read_at", { ascending: false });

    if (!data || data.length === 0) { setStreak(0); return; }

    const dates = [...new Set(data.map((d: any) => new Date(d.read_at).toDateString()))];
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    // Si pas joué aujourd'hui ni hier → streak cassé
    if (dates[0] !== today && dates[0] !== yesterday) {
      setStreak(0); return;
    }

    let s = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diff = (prev.getTime() - curr.getTime()) / 86400000;
      if (diff === 1) s++; else break;
    }
    setStreak(s);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setReady(true);
      if (session?.user) {
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); });
        loadStreak(session.user.id);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); else setIsPremium(false); });
        loadStreak(session.user.id);
      } else {
        setIsPremium(false);
        setStreak(0);
      }
    });

    // Rafraîchit le streak quand une histoire est lue
    const onStoryRead = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) loadStreak(session.user.id);
      });
    };
    window.addEventListener("lexistory:story-read", onStoryRead);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("lexistory:story-read", onStoryRead);
    };
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

  const streakLabel = streak > 0 ? `🔥 ${streak} jour${streak > 1 ? "s" : ""}` : "🔥 0 jour";

  return (
    <>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Lexi<span>Story</span></a>

        <div className={styles.desktopRight}>
          {ready && user && (
            <div className={styles.streak}>{streakLabel}</div>
          )}
          {ready && (
            <button className={styles.btnGhost} onClick={handleProfile}>
              {user ? "Mon profil" : "Connexion"}
            </button>
          )}
          {ready && !isPremium && (
            <button className={styles.btnPrimary} onClick={handlePremium} disabled={loading}>
              {loading ? "..." : "Premium — 1,99€/mois"}
            </button>
          )}
          {ready && isPremium && (
            <div className={styles.premiumBadge}>✨ Premium</div>
          )}
        </div>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {ready && user && (
            <div className={styles.mobileStreak}>{streakLabel}</div>
          )}
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
