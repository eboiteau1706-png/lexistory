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
  const [players, setPlayers]     = useState<Player[]>([]);
  const [friends, setFriends]     = useState<Player[]>([]);
  const [myId, setMyId]           = useState<string | null>(null);
  const [loading, setLoading]     = useState(true);
  const [tab, setTab]             = useState<"global" | "amis">("global");
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setMyId(session.user.id);
        loadFriends(session.user.id);
      }
    });

    supabase
      .from("profiles")
      .select("id, username, xp, is_premium")
      .not("username", "is", null)
      .order("xp", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setPlayers(data ?? []);
        setLoading(false);
      });
  }, []);

  async function loadFriends(uid: string) {
    const { data: f1 } = await supabase
      .from("friendships")
      .select("profiles!friendships_friend_id_fkey(id, username, xp, is_premium)")
      .eq("user_id", uid).eq("status", "accepted");

    const { data: f2 } = await supabase
      .from("friendships")
      .select("profiles!friendships_user_id_fkey(id, username, xp, is_premium)")
      .eq("friend_id", uid).eq("status", "accepted");

    const allFriends = [
      ...((f1 as any) ?? []).map((f: any) => f.profiles),
      ...((f2 as any) ?? []).map((f: any) => f.profiles),
    ].filter(Boolean).sort((a: any, b: any) => b.xp - a.xp);

    // Ajoute soi-même
    const { data: me } = await supabase
      .from("profiles").select("id, username, xp, is_premium").eq("id", uid).single();
    if (me) allFriends.push(me);
    allFriends.sort((a: any, b: any) => b.xp - a.xp);

    setFriends(allFriends as Player[]);
  }

  const list = tab === "global" ? players : friends;
  const myRank = list.findIndex(p => p.id === myId) + 1;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>🏆 Classement</h1>

        {/* Tabs */}
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
                      <div className={styles.playerName}>
                        {player.username}
                        {player.is_premium && <span className={styles.premiumTag}>✨</span>}
                        {isMe && <span className={styles.meTag}>toi</span>}
                      </div>
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
