"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { getLevel } from "@/lib/xp";
import styles from "./classement.module.css";

interface Player {
  id: string;
  username: string;
  xp: number;
  is_premium: boolean;
}

export default function ClassementPage() {
  const [players, setPlayers]   = useState<Player[]>([]);
  const [friends, setFriends]   = useState<Player[]>([]);
  const [myId, setMyId]         = useState<string | null>(null);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState<"global" | "amis">("global");
  const supabase = createClient();

  useEffect(() => {
    // Charge le classement global
    supabase
      .from("profiles")
      .select("id, username, xp, is_premium")
      .not("username", "is", null)
      .order("xp", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setPlayers((data as Player[]) ?? []);
        setLoading(false);
      });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setMyId(session.user.id);
        loadFriends(session.user.id);
      }
    });
  }, []);

  async function loadFriends(uid: string) {
    // Récupère toutes les friendships acceptées
    const { data: allF } = await supabase
      .from("friendships")
      .select("user_id, friend_id")
      .or(`user_id.eq.${uid},friend_id.eq.${uid}`)
      .eq("status", "accepted");

    if (!allF || allF.length === 0) {
      // Ajoute quand même soi-même
      const { data: me } = await supabase
        .from("profiles").select("id, username, xp, is_premium").eq("id", uid).single();
      if (me) setFriends([me as Player]);
      return;
    }

    // Récupère les IDs des amis
    const friendIds = allF.map(f => f.user_id === uid ? f.friend_id : f.user_id);
    friendIds.push(uid); // Ajoute soi-même

    // Charge les profils
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, xp, is_premium")
      .in("id", friendIds)
      .not("username", "is", null)
      .order("xp", { ascending: false });

    setFriends((profiles as Player[]) ?? []);
  }

  const list = tab === "global" ? players : friends;
  const myRank = list.findIndex(p => p.id === myId) + 1;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>🏆 Classement</h1>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "global" ? styles.tabActive : ""}`}
            onClick={() => setTab("global")}
          >
            🌍 Global
          </button>
          <button
            className={`${styles.tab} ${tab === "amis" ? styles.tabActive : ""}`}
            onClick={() => setTab("amis")}
          >
            👥 Amis
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : (
          <>
            {myId && myRank > 0 && (
              <div className={styles.myRank}>
                Tu es classé <strong>#{myRank}</strong> sur {list.length} joueurs
              </div>
            )}

            <div className={styles.list}>
              {list.map((player, i) => {
                const level = getLevel(player.xp);
                const isMe  = player.id === myId;
                const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;

                return (
                  <div
                    key={player.id}
                    className={`${styles.row} ${isMe ? styles.rowMe : ""} ${i < 3 ? styles.rowTop : ""}`}
                  >
                    <div className={styles.rank}>
                      {medal || <span className={styles.rankNum}>#{i + 1}</span>}
                    </div>
                    <div className={styles.playerInfo}>
                      <a href={`/joueur/${player.username}`} className={styles.playerName} style={{ textDecoration: "none", color: "inherit" }}>
  {player.username}
  {player.is_premium && <span className={styles.premiumTag}>✨</span>}
  {isMe && <span className={styles.meTag}>toi</span>}
</a>
                      <div className={styles.playerLevel}>{level.emoji} {level.name}</div>
                    </div>
                    <div className={styles.xp}>{player.xp} XP</div>
                  </div>
                );
              })}

              {list.length === 0 && (
                <div className={styles.empty}>
                  {tab === "amis"
                    ? "Ajoute des amis pour les voir ici !"
                    : "Personne n'a encore de pseudo — sois le premier ! 🚀"}
                </div>
              )}
            </div>
          </>
        )}

        <a href="/amis" className={styles.backAmis}>👥 Gérer mes amis →</a>
        <a href="/" className={styles.back}>← Retour aux histoires</a>
      </div>
    </div>
  );
}
