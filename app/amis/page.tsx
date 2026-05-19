"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { getLevel } from "@/lib/xp";
import styles from "./amis.module.css";

interface Profile {
  id: string;
  username: string;
  xp: number;
  is_premium: boolean;
}

interface Friendship {
  id: string;
  user_id: string;
  friend_id: string;
  status: string;
}

export default function AmisPage() {
  const supabase = createClient();
  const [myId, setMyId]                 = useState<string | null>(null);
  const [search, setSearch]             = useState("");
  const [searchResult, setSearchResult] = useState<Profile | null>(null);
  const [searching, setSearching]       = useState(false);
  const [searchError, setSearchError]   = useState("");
  const [friends, setFriends]           = useState<Profile[]>([]);
  const [pending, setPending]           = useState<{ friendship: Friendship; profile: Profile }[]>([]);
  const [sent, setSent]                 = useState<{ friendship: Friendship; profile: Profile }[]>([]);
  const [loading, setLoading]           = useState(true);

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
      .select("id, username, xp, is_premium")
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
    setSearchResult(null);

    const { data } = await supabase
      .from("profiles")
      .select("id, username, xp, is_premium")
      .eq("username", search.trim())
      .single();

    setSearching(false);
    if (!data) { setSearchError("Aucun joueur trouvé avec ce pseudo."); return; }
    if (data.id === myId) { setSearchError("C'est toi ! 😄"); return; }

    const { data: existing } = await supabase
      .from("friendships")
      .select("id, status")
      .or(`and(user_id.eq.${myId},friend_id.eq.${data.id}),and(user_id.eq.${data.id},friend_id.eq.${myId})`)
      .single();

    if (existing) {
      if (existing.status === "accepted") { setSearchError("Vous êtes déjà amis !"); return; }
      if (existing.status === "pending")  { setSearchError("Une demande est déjà en cours."); return; }
    }

    setSearchResult(data as Profile);
  }

  async function sendRequest(friendId: string) {
    if (!myId) return;
    await supabase.from("friendships").insert({ user_id: myId, friend_id: friendId, status: "pending" });
    setSearchResult(null);
    setSearch("");
    loadFriendships(myId);
  }

  async function acceptRequest(friendshipId: string) {
  await supabase.from("friendships").update({ status: "accepted" }).eq("id", friendshipId);
  window.dispatchEvent(new CustomEvent("lexistory:friend-accepted")); // ← ajoute ça
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
              placeholder="Pseudo exact..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <button className={styles.btnSearch} onClick={handleSearch} disabled={searching}>
              {searching ? "..." : "Rechercher"}
            </button>
          </div>
          {searchError && <p className={styles.error}>{searchError}</p>}
          {searchResult && (
            <div className={styles.searchResult}>
              <div className={styles.playerInfo}>
                <span className={styles.playerName}>{searchResult.username}</span>
                <span className={styles.playerLevel}>{getLevel(searchResult.xp).emoji} {getLevel(searchResult.xp).name}</span>
              </div>
              <button className={styles.btnAdd} onClick={() => sendRequest(searchResult.id)}>
                Ajouter →
              </button>
            </div>
          )}
        </div>

        {/* Demandes reçues */}
        {pending.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Demandes reçues 🔔 {pending.length}</div>
            {pending.map(({ friendship, profile }) => (
              <div key={friendship.id} className={styles.friendRow}>
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
