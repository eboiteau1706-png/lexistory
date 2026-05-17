"use client";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import styles from "./profile.module.css";

export default function ProfileClient({ user }: { user: User }) {
  const supabase = createClient();
  const router   = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function handlePremium() {
    const res  = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  const initial = user.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.avatar}>{initial}</div>
        <div className={styles.email}>{user.email}</div>
        <div className={styles.since}>
          Membre depuis le {new Date(user.created_at).toLocaleDateString("fr-FR", {
            day: "numeric", month: "long", year: "numeric"
          })}
        </div>

        <div className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statNum}>1</div>
            <div className={styles.statLabel}>Jour de série</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>1</div>
            <div className={styles.statLabel}>Histoire lue</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>0</div>
            <div className={styles.statLabel}>Mots appris</div>
          </div>
        </div>

        <div className={styles.plan}>
          <span className={styles.planBadge}>Plan Gratuit</span>
          <button className={styles.upgradeBtn} onClick={handlePremium}>
            Passer Premium — 1,99€/mois ✨
          </button>
        </div>

        <div className={styles.actions}>
          <a href="/" className={styles.backBtn}>← Retour aux histoires</a>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>

      </div>
    </div>
  );
}
