"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { getLevel, getXpProgress } from "@/lib/xp";
import styles from "./Nav.module.css";

export default function Nav() {
  const [loading, setLoading]           = useState(false);
  const [user, setUser]                 = useState<any>(null);
  const [ready, setReady]               = useState(false);
  const [isPremium, setIsPremium]       = useState(false);
  const [isLifetime, setIsLifetime]     = useState(false);
  const [daysLeft, setDaysLeft]         = useState<number | null>(null);
  const [renewalDate, setRenewalDate]   = useState<string | null>(null);
  const [streak, setStreak]             = useState(0);
  const [xp, setXp]                     = useState(0);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [isAdmin, setIsAdmin]           = useState(false);
  const supabase = createClient();
  const router   = useRouter();
  const pathname = usePathname();

  async function loadUserData(userId: string) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_premium, xp, stripe_customer_id")
      .eq("id", userId)
      .single();
    if (profile?.is_premium) {
      setIsPremium(true);
      if (!profile.stripe_customer_id) {
        setIsLifetime(true);
      } else {
        fetch("/api/subscription").then(r => r.json()).then(data => {
          if (data.daysLeft) setDaysLeft(data.daysLeft);
          if (data.renewalDate) setRenewalDate(data.renewalDate);
        });
      }
    }
    setXp(profile?.xp ?? 0);
    if (userId === "0450c58e-35b2-47e6-9600-13db5626e96d") setIsAdmin(true);

    // ✅ FIX last_active_at : on utilise now() côté Supabase pour éviter les décalages de fuseau horaire
    await supabase.from("profiles").update({ last_active_at: new Date().toISOString() }).eq("id", userId);

    const { data: reads } = await supabase
      .from("stories_read").select("read_at")
      .eq("user_id", userId).order("read_at", { ascending: false });
    if (!reads || reads.length === 0) { setStreak(0); }
    else {
      // ✅ FIX streak : on compare les dates en heure de Paris
      const toParisDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" });
      };
      const dates = [...new Set(reads.map((d: any) => toParisDate(d.read_at)))];
      const today = new Date().toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" });
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" });
      if (dates[0] !== today && dates[0] !== yesterday) { setStreak(0); }
      else {
        let s = 1;
        for (let i = 1; i < dates.length; i++) {
          const a = new Date(reads[i-1].read_at);
          const b = new Date(reads[i].read_at);
          const diffDays = Math.round((a.getTime() - b.getTime()) / 86400000);
          if (diffDays === 1) s++; else break;
        }
        setStreak(s);
      }
    }

    const { count } = await supabase.from("friendships")
      .select("id", { count: "exact" })
      .eq("friend_id", userId).eq("status", "pending");
    setPendingCount(count ?? 0);
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
      else { setIsPremium(false); setStreak(0); setXp(0); setPendingCount(0); setDaysLeft(null); setIsAdmin(false); }
    });
    const onStoryRead = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) loadUserData(session.user.id);
      });
    };
    const onFriendAccepted = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) loadUserData(session.user.id);
      });
    };
    window.addEventListener("lexistory:story-read", onStoryRead);
    window.addEventListener("lexistory:friend-accepted", onFriendAccepted);
    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("lexistory:story-read", onStoryRead);
      window.removeEventListener("lexistory:friend-accepted", onFriendAccepted);
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

  function nav(path: string) {
    setMenuOpen(false);
    router.push(path);
  }

  const level = getLevel(xp);
  const { pct, current, needed } = getXpProgress(xp);

  const premiumBadge = isPremium ? (
    <div className={styles.premiumBadge}>
      {isLifetime ? "✨ Premium à vie" : renewalDate ? `✨ fin le ${renewalDate}` : "✨ Premium"}
    </div>
  ) : null;

  const navLinks = ready && !user ? (
    <div className={styles.lockedNav}>
      <span className={styles.lockedNavText}>Connecte-toi pour accéder à toutes les fonctionnalités</span>
      <button className={styles.btnPrimary} onClick={() => router.push("/login")}>Se connecter</button>
    </div>
  ) : (
    <>
      <a href="/jeux" className={styles.btnGhost}>🎮 Jeux</a>
      <a href="/classement" className={styles.btnGhost}>🏆 Classement</a>
      <a href="/amis" className={styles.btnGhost} style={{ position: "relative" }}>
        👥 Amis
        {pendingCount > 0 && (
          <span style={{
            position: "absolute", top: "-6px", right: "-6px",
            background: "#e88080", color: "white", borderRadius: "50%",
            width: "18px", height: "18px", fontSize: "0.65rem", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{pendingCount}</span>
        )}
      </a>
      {ready && <button className={styles.btnGhost} onClick={() => router.push("/profile")}>Mon profil</button>}
      {ready && !isPremium && (
        <button className={styles.btnPrimary} onClick={handlePremium} disabled={loading}>
          {loading ? "..." : "Premium — 1,99€/mois"}
        </button>
      )}
      {isAdmin && (
        <a href="/admin" className={styles.btnGhost} style={{ fontSize: "0.75rem", opacity: 0.5 }}>⚙️</a>
      )}
      {ready && premiumBadge}
    </>
  );

  return (
    <>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>
          <img src="/favicon.png" alt="LexiStory" className={styles.logoImg} />
          Lexi<span>Story</span>
        </a>
        <div className={styles.desktopRight}>
          {ready && user && (
            <div className={styles.userStats}>
              <div className={styles.levelPill} onClick={() => router.push("/rangs")} style={{ cursor: "pointer" }}>
                <span className={styles.levelText}>{level.emoji} {level.name}</span>
                <div className={styles.xpBarRow}>
                  <div className={styles.xpBar}>
                    <div className={styles.xpFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={styles.xpText}>{current}/{needed}</span>
                </div>
              </div>
            </div>
          )}
          {navLinks}
        </div>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {ready && user ? (
            <>
              <div className={styles.mobileUserInfo}>
                <div className={styles.mobileUserLeft}>
                  <div className={styles.mobileUserName}>{level.emoji} {level.name}</div>
                  <div className={styles.mobileUserXp}>{xp} XP · {current}/{needed}</div>
                  <div className={styles.mobileXpBar}>
                    <div className={styles.mobileXpFill} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className={styles.mobileStreak}>🔥 {streak}j</div>
              </div>

              <div className={styles.mobileNavLinks}>
                <button className={styles.mobileNavLink} onClick={() => nav("/")}>
                  <span className={styles.mobileNavIcon}>📖</span>
                  Histoires
                </button>
                <button className={styles.mobileNavLink} onClick={() => nav("/jeux")}>
                  <span className={styles.mobileNavIcon}>🎮</span>
                  Jeux du jour
                </button>
                <button className={styles.mobileNavLink} onClick={() => nav("/classement")}>
                  <span className={styles.mobileNavIcon}>🏆</span>
                  Classement
                </button>
                <button className={styles.mobileNavLink} onClick={() => nav("/amis")}>
                  <span className={styles.mobileNavIcon}>👥</span>
                  Amis
                  {pendingCount > 0 && <span className={styles.mobileNavBadge}>{pendingCount}</span>}
                </button>
                <button className={styles.mobileNavLink} onClick={() => nav("/rangs")}>
                  <span className={styles.mobileNavIcon}>⭐</span>
                  Rangs & XP
                </button>

                <div className={styles.mobileDivider} />

                <button className={styles.mobileNavLink} onClick={() => nav("/profile")}>
                  <span className={styles.mobileNavIcon}>👤</span>
                  Mon profil
                </button>

                {isAdmin && (
                  <button className={styles.mobileNavLink} onClick={() => nav("/admin")}>
                    <span className={styles.mobileNavIcon}>⚙️</span>
                    Admin
                  </button>
                )}
              </div>

              <div className={styles.mobilePremiumSection}>
                {!isPremium ? (
                  <button className={styles.mobilePremiumBtn} onClick={() => { setMenuOpen(false); handlePremium(); }} disabled={loading}>
                    {loading ? "Chargement..." : "✨ Passer Premium — 1,99€/mois"}
                  </button>
                ) : (
                  <div className={styles.mobilePremiumBadge}>
                    {isLifetime ? "✨ Premium à vie" : renewalDate ? `✨ Premium · fin le ${renewalDate}` : "✨ Premium"}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.mobileLockedSection}>
              <p className={styles.mobileLockedText}>Connecte-toi pour accéder à toutes les fonctionnalités !</p>
              <button className={styles.mobilePremiumBtn} onClick={() => { setMenuOpen(false); router.push("/login"); }}>
                🔑 Se connecter
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
