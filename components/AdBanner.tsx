"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import styles from "./AdBanner.module.css";

export default function AdBanner() {
  const [isPremium, setIsPremium] = useState(false);
  const [ready, setReady]         = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => {
            setIsPremium(data?.is_premium ?? false);
            setReady(true);
          });
      } else {
        setReady(true);
      }
    });
  }, []);

  // Cache la pub pour les premium
  if (!ready || isPremium) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Publicité</div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4574004728084162"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <div className={styles.premium}>
        <span>Sans pub avec</span>
        <a href="/?#premium">Premium — 1,99€/mois ✨</a>
      </div>
    </div>
  );
}
