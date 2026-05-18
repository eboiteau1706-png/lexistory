"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { getLevel, getXpProgress } from "@/lib/xp";
import styles from "./Nav.module.css";

export default function Nav() {
  const [loading, setLoading]     = useState(false);
  const [user, setUser]           = useState<any>(null);
  const [ready, setReady]         = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [streak, setStreak]       = useState(0);
  const [xp, setXp]               = useState(0);
  const [menuOpen, setMenuOpen]   = useState(false);
  const supabase = createClient();
  const router   = useRouter();
  const pathname = usePathname();

  async function loadUserData(userId: string) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_premium, xp")
      .eq("id", userId)
      .single();
    if (profile?.is_premium) setIsPremium(true);
    setXp(profile?.xp ?? 0);

    const { data: reads } = await supabase
      .from("stories_read")
      .select("read_at")
      .eq("user_id", userId)
      .order("read_at", { ascending: false });

    if (!reads || reads.length === 0) { setStreak(0); return; }
    const dates = [...new Set(reads.map((d: any) => new Date(d.read_at).toDateString()))];
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (dates[0] !== today && dates[0] !== yesterday) { setStreak(0); return; }
    let s = 1;
    for (let i = 1; i < dates.length; i++) {
      const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
      if (diff === 1) s++; else break;
    }
    setStreak(s);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setReady(true);
      if (session?.user) loadUserData(session.user.id);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadUserData(session.user.id);
      else { setIsPremium(false); setStreak(0); setXp(0); }
    });

    const onStoryRead = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) loadUserData(session.user.id);
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

  const level = getLevel(xp);
  const { pct } = getXpProgress(xp);

  return (
    <>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Lexi<span>Story</span></a>

        <div className={styles.desktopRight}>
          <a href="/rangs" className={styles.btnGhost}>🏆 Rangs</a>
          {ready && user && (
            <>
              <div className={styles.streak}>🔥 {streak} jour{streak > 1 ? "s" : ""}</div>
              <div className={styles.levelBadge} title={`${xp} XP`}>
                <span>{level.emoji} {level.name}</span>
                <div className={styles.xpBar}>
                  <div className={styles.xpFill} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </>
          )}
          {ready && (
            <button className={styles.btnGhost} onClick={() => router.push(user ? "/profile" : "/login")}>
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
            <button className={styles.mobileBtn} onClick={() => { setMenuOpen(false); router.push("/rangs"); }}>
              🏆 Rangs
            </button>
          {ready && user && (
            <>
              <div className={styles.mobileStreak}>🔥 {streak} jour{streak > 1 ? "s" : ""} · {level.emoji} {level.name}</div>
            </>
          )}
          {ready && (
            <button className={styles.mobileBtn} onClick={() => { setMenuOpen(false); router.push(user ? "/profile" : "/login"); }}>
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
