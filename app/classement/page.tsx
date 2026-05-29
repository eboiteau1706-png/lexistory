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
  const myRank = list.findIndex(p => p.id === myId) + 1;

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
              <div className={styles.myRank}>Tu es classé <strong>#{myRank}</strong> sur {list.length} joueurs</div>
            )}

            <div className={styles.list}>
              {list.map((player, i) => {
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
                    <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                      <img src={getAvatarUrl(player.avatar_url)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className={styles.playerInfo}>
                      <a href={player.username ? `/joueur/${player.username}` : "#"} className={styles.playerName} style={{ textDecoration: "none", color: "inherit" }}>
                        {player.username ?? <span style={{ color: "var(--text-dim)", fontStyle: "italic" }}>Sans pseudo</span>}
                        {player.is_premium && <span className={styles.premiumTag}>✨</span>}
                        {isMe && <span className={styles.meTag}>toi</span>}
                      </a>
                      <div className={styles.playerLevel}>{level.emoji} {level.name}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div className={styles.xp}>{player.xp} XP</div>
                      {myId && !isMe && (
                        addMsg[player.id] ? (
                          <span style={{ fontSize: "0.72rem", color: addMsg[player.id].startsWith("✅") ? "var(--green)" : "#e07070" }}>{addMsg[player.id]}</span>
                        ) : isFriend ? (
                          <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>✓ Ami</span>
                        ) : isPending ? (
                          <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontStyle: "italic" }}>En attente…</span>
                        ) : (
                          <button
                            onClick={() => sendFriendRequest(player.id, player.username)}
                            disabled={addingId === player.id}
                            style={{ padding: "3px 10px", borderRadius: "20px", border: "1px solid var(--accent)", background: "transparent", color: "var(--accent)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.72rem", whiteSpace: "nowrap" }}>
                            {addingId === player.id ? "..." : "+ Ami"}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              })}

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
