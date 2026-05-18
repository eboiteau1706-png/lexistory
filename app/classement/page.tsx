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
  const [players, setPlayers] = useState<Player[]>([]);
  const [myId, setMyId]       = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setMyId(session.user.id);
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

  const myRank = players.findIndex(p => p.id === myId) + 1;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>🏆 Classement</h1>
        <p className={styles.subtitle}>Les 50 meilleurs lecteurs de LexiStory</p>

        {loading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : (
          <>
            {myId && myRank > 0 && (
              <div className={styles.myRank}>
                Tu es classé <strong>#{myRank}</strong> sur {players.length} joueurs
              </div>
            )}

            <div className={styles.list}>
              {players.map((player, i) => {
                const level = getLevel(player.xp);
                const isMe = player.id === myId;
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

              {players.length === 0 && (
                <div className={styles.empty}>
                  Personne n&apos;a encore de pseudo — sois le premier ! 🚀
                </div>
              )}
            </div>
          </>
        )}

        <a href="/" className={styles.back}>← Retour aux histoires</a>
      </div>
    </div>
  );
}
