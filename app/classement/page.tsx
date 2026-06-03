"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { getLevel } from "@/lib/xp";
import styles from "./classement.module.css";
import { getAvatarUrl } from "@/lib/avatar";

interface Player {
  id: string;
  username: string;
  xp: number;
  is_premium: boolean;
  avatar_url?: string | null;
}

const AVATAR_COLORS = ["#d4a843", "#6ba3be", "#7ac97a", "#e07070", "#9b7fdb"];
function avatarBg(u: string) {
  let h = 0; for (const c of u) h = c.charCodeAt(0) + h * 31;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}


export default function ClassementPage() {
  const [players, setPlayers]         = useState<Player[]>([]);
  const [friends, setFriends]         = useState<Player[]>([]);
  const [myId, setMyId]               = useState<string | null>(null);
  const [loading, setLoading]         = useState(true);
  const [tab, setTab]                 = useState<"global" | "amis">("global");
  const [friendIds, setFriendIds]     = useState<string[]>([]);
  const [pendingIds, setPendingIds]   = useState<string[]>([]);
  const [addingId, setAddingId]       = useState<string | null>(null);
  const [addMsg, setAddMsg]           = useState<Record<string, string>>({});
  const supabase = createClient();

  useEffect(() => {
    // Fetch via admin route to bypass RLS and always see all players
    fetch("/api/leaderboard")
      .then(r => r.json())
      .then(({ players }) => {
        setPlayers((players as Player[]) ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) { setLoading(false); return; }
      const uid = session.user.id;
      setMyId(uid);
      loadFriends(uid);
      loadFriendStatus(uid);

      // Always ensure current user appears even if outside top 200
      supabase.from("profiles")
        .select("id, username, xp, is_premium, avatar_url")
        .eq("id", uid)
        .single()
        .then(({ data }) => {
          if (!data?.username) return;
          setPlayers(prev => {
            if (prev.some(p => p.id === uid)) return prev;
            return [...prev, data as Player].sort((a, b) => b.xp - a.xp);
          });
        });
    });
  }, []);

  async function loadFriendStatus(uid: string) {
    const { data } = await supabase.from("friendships")
      .select("user_id, friend_id, status")
      .or(`user_id.eq.${uid},friend_id.eq.${uid}`);
    if (!data) return;
    const accepted: string[] = [];
    const pending: string[] = [];
    data.forEach((f: any) => {
      const otherId = f.user_id === uid ? f.friend_id : f.user_id;
      if (f.status === "accepted") accepted.push(otherId);
      else pending.push(otherId);
    });
    setFriendIds(accepted);
    setPendingIds(pending);
  }

  async function loadFriends(uid: string) {
    const { data: allF } = await supabase.from("friendships")
      .select("user_id, friend_id").or(`user_id.eq.${uid},friend_id.eq.${uid}`).eq("status", "accepted");
    if (!allF || allF.length === 0) {
      const { data: me } = await supabase.from("profiles").select("id, username, xp, is_premium, avatar_url").eq("id", uid).single();
      if (me) setFriends([me as Player]);
      return;
    }
    const ids = allF.map((f: any) => f.user_id === uid ? f.friend_id : f.user_id);
    ids.push(uid);
    const { data: profiles } = await supabase.from("profiles").select("id, username, xp, is_premium, avatar_url")
      .in("id", ids).not("username", "is", null).order("xp", { ascending: false });
    setFriends((profiles as Player[]) ?? []);
  }

  async function sendFriendRequest(targetId: string, targetUsername: string) {
    if (!myId) return;
    setAddingId(targetId);
    const { error } = await supabase.from("friendships").insert({ user_id: myId, friend_id: targetId, status: "pending" });
    if (error) {
      setAddMsg(prev => ({ ...prev, [targetId]: "❌ Erreur" }));
    } else {
      setPendingIds(prev => [...prev, targetId]);
      setAddMsg(prev => ({ ...prev, [targetId]: "✅ Demande envoyée !" }));
    }
    setAddingId(null);
    setTimeout(() => setAddMsg(prev => { const n = { ...prev }; delete n[targetId]; return n; }), 3000);
  }

  const list = tab === "global" ? players : friends;
  const myRankIndex = list.findIndex(p => p.id === myId);
  const myRank = myRankIndex + 1;
  const isInTop10 = myRankIndex >= 0 && myRankIndex < 10;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>🏆 Classement</h1>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === "global" ? styles.tabActive : ""}`} onClick={() => setTab("global")}>🌍 Global</button>
          <button className={`${styles.tab} ${tab === "amis" ? styles.tabActive : ""}`} onClick={() => setTab("amis")}>👥 Amis</button>
        </div>

        {loading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : (
          <>
            {myId && myRank > 0 && (
              <div className={styles.myRank}>
                <strong>{list[myRankIndex]?.username ?? "Toi"}</strong>
                {" · "}
                <strong>#{myRank}</strong>
                {!isInTop10 && <span style={{ color: "var(--text-dim)", fontWeight: 400 }}> sur {list.length} joueurs</span>}
              </div>
            )}

            <div className={styles.list}>
              {list.slice(0, 10).map((player, i) => {
                const level = getLevel(player.xp);
                const isMe  = player.id === myId;
                const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
                const isFriend  = friendIds.includes(player.id);
                const isPending = pendingIds.includes(player.id);

                return (
                  <div key={player.id} className={`${styles.row} ${isMe ? styles.rowMe : ""} ${i < 3 ? styles.rowTop : ""}`}>
                    <div className={styles.rank}>
                      {medal || <span className={styles.rankNum}>#{i + 1}</span>}
                    </div>
                    <div style={{ width: 40, height: 40, minWidth: 40, minHeight: 40, borderRadius: "50%", flexShrink: 0, overflow: "hidden", background: avatarBg(player.username ?? "?"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700, color: "#fff", alignSelf: "center" }}>
                      {getAvatarUrl(player.avatar_url ?? null)
                        ? <img src={getAvatarUrl(player.avatar_url ?? null)!} alt="" style={{ width: 40, height: 40, objectFit: "cover", display: "block" }} />
                        : (player.username?.[0] ?? "?").toUpperCase()}
                    </div>
                    <div className={styles.playerInfo}>
                      <a href={player.username ? `/joueur/${player.username}` : "#"} className={styles.playerName} style={{ textDecoration: "none", color: "inherit" }}>
                        {player.username ?? <span style={{ color: "var(--text-dim)", fontStyle: "italic" }}>Sans pseudo</span>}
                        {player.is_premium && <span className={styles.premiumTag}>✨</span>}
                        {isMe && <span className={styles.meTag}>toi</span>}
                      </a>
                      <div className={styles.playerLevel}>{level.emoji} {level.name}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, minWidth: "120px", justifyContent: "flex-end" }}>
                      <div className={styles.xp}>{player.xp} XP</div>
                      {/* Zone ami — toujours présente pour que le XP s'aligne */}
                      {isMe ? (
                        <div style={{ width: "52px", visibility: "hidden" }} />
                      ) : myId ? (
                        addMsg[player.id] ? (
                          <span style={{ fontSize: "0.72rem", color: addMsg[player.id].startsWith("✅") ? "var(--green)" : "#e07070", width: "52px", textAlign: "center" }}>{addMsg[player.id]}</span>
                        ) : isFriend ? (
                          <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", width: "52px", textAlign: "center" }}>✓ Ami</span>
                        ) : isPending ? (
                          <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontStyle: "italic", width: "52px", textAlign: "center" }}>…</span>
                        ) : (
                          <button
                            onClick={() => sendFriendRequest(player.id, player.username)}
                            disabled={addingId === player.id}
                            style={{ width: "52px", padding: "3px 0", borderRadius: "20px", border: "1px solid var(--accent)", background: "transparent", color: "var(--accent)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.72rem", textAlign: "center" }}>
                            {addingId === player.id ? "..." : "+ Ami"}
                          </button>
                        )
                      ) : (
                        <div style={{ width: "52px" }} />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Séparateur + voisins si hors top 10 */}
              {myId && !isInTop10 && myRankIndex >= 0 && (
                <>
                  <div className={styles.rankSeparator}>· · ·</div>
                  {[myRankIndex - 1, myRankIndex, myRankIndex + 1]
                    .filter((idx): idx is number => idx >= 0 && idx < list.length)
                    .map(idx => {
                      const player = list[idx];
                      const level   = getLevel(player.xp);
                      const isMe    = player.id === myId;
                      const isFriend  = friendIds.includes(player.id);
                      const isPending = pendingIds.includes(player.id);
                      return (
                        <div key={`nbr-${player.id}`} className={`${styles.row} ${isMe ? styles.rowMe : ""}`}>
                          <div className={styles.rank}><span className={styles.rankNum}>#{idx + 1}</span></div>
                          <div style={{ width: 40, height: 40, minWidth: 40, minHeight: 40, borderRadius: "50%", flexShrink: 0, overflow: "hidden", background: avatarBg(player.username ?? "?"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700, color: "#fff", alignSelf: "center" }}>
                            {getAvatarUrl(player.avatar_url ?? null)
                              ? <img src={getAvatarUrl(player.avatar_url ?? null)!} alt="" style={{ width: 40, height: 40, objectFit: "cover", display: "block" }} />
                              : (player.username?.[0] ?? "?").toUpperCase()}
                          </div>
                          <div className={styles.playerInfo}>
                            <a href={player.username ? `/joueur/${player.username}` : "#"} className={styles.playerName} style={{ textDecoration: "none", color: "inherit" }}>
                              {player.username ?? <span style={{ color: "var(--text-dim)", fontStyle: "italic" }}>Sans pseudo</span>}
                              {player.is_premium && <span className={styles.premiumTag}>✨</span>}
                              {isMe && <span className={styles.meTag}>toi</span>}
                            </a>
                            <div className={styles.playerLevel}>{level.emoji} {level.name}</div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, minWidth: "120px", justifyContent: "flex-end" }}>
                            <div className={styles.xp}>{player.xp} XP</div>
                            {isMe ? (
                              <div style={{ width: "52px", visibility: "hidden" }} />
                            ) : myId ? (
                              isFriend ? (
                                <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", width: "52px", textAlign: "center" }}>✓ Ami</span>
                              ) : isPending ? (
                                <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontStyle: "italic", width: "52px", textAlign: "center" }}>…</span>
                              ) : (
                                <button onClick={() => sendFriendRequest(player.id, player.username)} disabled={addingId === player.id}
                                  style={{ width: "52px", padding: "3px 0", borderRadius: "20px", border: "1px solid var(--accent)", background: "transparent", color: "var(--accent)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.72rem", textAlign: "center" }}>
                                  {addingId === player.id ? "..." : "+ Ami"}
                                </button>
                              )
                            ) : <div style={{ width: "52px" }} />}
                          </div>
                        </div>
                      );
                    })}
                </>
              )}

              {list.length === 0 && (
                <div className={styles.empty}>
                  {tab === "amis" ? "Ajoute des amis pour les voir ici !" : "Aucun joueur trouvé."}
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
