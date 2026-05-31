"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { getLevel } from "@/lib/xp";
import { getAvatarUrl } from "@/lib/avatar";
import styles from "./amis.module.css";

const AVATAR_COLORS = ["#d4a843","#6ba3be","#7ac97a","#e07070","#9b7fdb","#e09070"];
function avatarBg(u: string) { let h=0; for(const c of u) h=c.charCodeAt(0)+h*31; return AVATAR_COLORS[Math.abs(h)%AVATAR_COLORS.length]; }

interface Profile {
  id: string;
  username: string;
  xp: number;
  is_premium: boolean;
  avatar_url?: string | null;
}

interface Friendship {
  id: string;
  user_id: string;
  friend_id: string;
  status: string;
}

function AvatarCircle({ profile, size }: { profile: Profile; size: number }) {
  const url = getAvatarUrl(profile.avatar_url ?? null);
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, overflow: "hidden", background: url ? "var(--surface2)" : avatarBg(profile.username ?? "?"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>
      {url ? <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : (profile.username?.[0] ?? "?").toUpperCase()}
    </div>
  );
}

export default function AmisPage() {
  const supabase = createClient();
  const [myId, setMyId]                   = useState<string | null>(null);
  const [search, setSearch]               = useState("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [searching, setSearching]         = useState(false);
  const [searchError, setSearchError]     = useState("");
  const [friends, setFriends]             = useState<Profile[]>([]);
  const [pending, setPending]             = useState<{ friendship: Friendship; profile: Profile }[]>([]);
  const [sent, setSent]                   = useState<{ friendship: Friendship; profile: Profile }[]>([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) return;
      setMyId(session.user.id);
      loadFriendships(session.user.id);
    });
  }, []);

  async function getProfile(id: string): Promise<Profile | null> {
    const { data } = await supabase
      .from("profiles")
      .select("id, username, xp, is_premium, avatar_url")
      .eq("id", id)
      .single();
    return data as Profile | null;
  }

  async function loadFriendships(uid: string) {
    setLoading(true);
    setPending([]);
    setSent([]);
    setFriends([]);

    const { data: allF } = await supabase
      .from("friendships")
      .select("*")
      .or(`user_id.eq.${uid},friend_id.eq.${uid}`);

    if (!allF) { setLoading(false); return; }

    const pendingList: { friendship: Friendship; profile: Profile }[] = [];
    const sentList:    { friendship: Friendship; profile: Profile }[] = [];
    const friendList:  Profile[] = [];

    for (const f of allF) {
      const otherId = f.user_id === uid ? f.friend_id : f.user_id;
      const profile = await getProfile(otherId);
      if (!profile) continue;

      if (f.status === "accepted") {
        friendList.push(profile);
      } else if (f.status === "pending") {
        if (f.friend_id === uid) {
          pendingList.push({ friendship: f, profile });
        } else {
          sentList.push({ friendship: f, profile });
        }
      }
    }

    setFriends(friendList.sort((a, b) => b.xp - a.xp));
    setPending(pendingList);
    setSent(sentList);
    setLoading(false);
  }

  async function handleSearch() {
    if (!search.trim() || !myId) return;
    setSearching(true);
    setSearchError("");
    setSearchResults([]);

    // Recherche insensible à la casse + correspondance partielle
    const { data } = await supabase
      .from("profiles")
      .select("id, username, xp, is_premium, avatar_url")
      .ilike("username", `%${search.trim()}%`)
      .neq("id", myId)
      .not("username", "is", null)
      .limit(8);

    setSearching(false);

    if (!data || data.length === 0) {
      setSearchError("Aucun joueur trouvé avec ce pseudo.");
      return;
    }

    // Charge les friendships existantes pour filtrer
    const { data: existingF } = await supabase
      .from("friendships")
      .select("id, status, user_id, friend_id")
      .or(`user_id.eq.${myId},friend_id.eq.${myId}`);

    const results = (data as Profile[]).filter(p => {
      const existing = existingF?.find(f =>
        (f.user_id === myId && f.friend_id === p.id) ||
        (f.user_id === p.id && f.friend_id === myId)
      );
      return !existing; // cache les gens déjà amis ou en attente
    });

    if (results.length === 0) {
      setSearchError("Tous les joueurs trouvés sont déjà dans tes amis ou en attente.");
      return;
    }

    setSearchResults(results);
  }

  async function sendRequest(friendId: string) {
    if (!myId) return;
    await supabase.from("friendships").insert({ user_id: myId, friend_id: friendId, status: "pending" });
    setSearchResults(prev => prev.filter(p => p.id !== friendId));
    setSearch("");
    loadFriendships(myId);
  }

  async function acceptRequest(friendshipId: string) {
    await supabase.from("friendships").update({ status: "accepted" }).eq("id", friendshipId);
    window.dispatchEvent(new CustomEvent("lexistory:friend-accepted"));
    if (myId) loadFriendships(myId);
  }

  async function rejectRequest(friendshipId: string) {
    await supabase.from("friendships").delete().eq("id", friendshipId);
    if (myId) loadFriendships(myId);
  }

  async function removeFriend(friendId: string) {
    if (!myId) return;
    await supabase.from("friendships").delete()
      .or(`and(user_id.eq.${myId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${myId})`);
    loadFriendships(myId);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>👥 Amis</h1>

        {/* Recherche */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Ajouter un ami</div>
          <div className={styles.searchRow}>
            <input
              className={styles.input}
              placeholder="Recherche un pseudo..."
              value={search}
              onChange={e => { setSearch(e.target.value); setSearchResults([]); setSearchError(""); }}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <button className={styles.btnSearch} onClick={handleSearch} disabled={searching}>
              {searching ? "..." : "Rechercher"}
            </button>
          </div>
          {searchError && <p className={styles.error}>{searchError}</p>}
          {searchResults.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              {searchResults.map(result => (
                <div key={result.id} className={styles.searchResult}>
                  <div className={styles.playerInfo}>
                    <span className={styles.playerName}>{result.username}</span>
                    <span className={styles.playerLevel}>{getLevel(result.xp).emoji} {getLevel(result.xp).name}</span>
                  </div>
                  <button className={styles.btnAdd} onClick={() => sendRequest(result.id)}>
                    Ajouter →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Demandes reçues */}
        {pending.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Demandes reçues 🔔 {pending.length}</div>
            {pending.map(({ friendship, profile }) => (
              <div key={friendship.id} className={styles.friendRow}>
                <AvatarCircle profile={profile} size={40} />
                <div className={styles.playerInfo}>
                  <span className={styles.playerName}>{profile.username}</span>
                  <span className={styles.playerLevel}>{getLevel(profile.xp).emoji} {getLevel(profile.xp).name}</span>
                </div>
                <div className={styles.actions}>
                  <button className={styles.btnAccept} onClick={() => acceptRequest(friendship.id)}>✅ Accepter</button>
                  <button className={styles.btnReject} onClick={() => rejectRequest(friendship.id)}>❌</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Demandes envoyées */}
        {sent.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Demandes envoyées ⏳</div>
            {sent.map(({ friendship, profile }) => (
              <div key={friendship.id} className={styles.friendRow}>
                <AvatarCircle profile={profile} size={40} />
                <div className={styles.playerInfo}>
                  <span className={styles.playerName}>{profile.username}</span>
                  <span className={styles.playerLevel}>{getLevel(profile.xp).emoji} {getLevel(profile.xp).name}</span>
                </div>
                <button className={styles.btnReject} onClick={() => rejectRequest(friendship.id)}>Annuler</button>
              </div>
            ))}
          </div>
        )}

        {/* Liste amis */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Mes amis {friends.length > 0 ? `(${friends.length})` : ""}</div>
          {loading ? (
            <div className={styles.empty}>Chargement...</div>
          ) : friends.length === 0 ? (
            <div className={styles.empty}>Tu n&apos;as pas encore d&apos;amis. Recherche un pseudo pour commencer !</div>
          ) : (
            friends.map((f, i) => {
              const level = getLevel(f.xp);
              return (
                <div key={f.id} className={styles.friendRow}>
                  <div className={styles.rank}>#{i + 1}</div>
                  <AvatarCircle profile={f} size={40} />
                  <div className={styles.playerInfo}>
                    <a href={`/joueur/${f.username}`} className={styles.playerName} style={{ textDecoration: "none", color: "inherit" }}>
                      {f.username}
                      {f.is_premium && <span className={styles.premiumTag}>✨</span>}
                    </a>
                    <div className={styles.playerLevel}>{level.emoji} {level.name} · {f.xp} XP</div>
                  </div>
                  <button className={styles.btnRemove} onClick={() => removeFriend(f.id)}>Retirer</button>
                </div>
              );
            })
          )}
        </div>

        <a href="/" className={styles.back}>← Retour aux histoires</a>
      </div>
    </div>
  );
}
