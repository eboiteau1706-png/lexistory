"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";
import ApiDefStats from "@/components/ApiDefStats";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

interface Profile {
  id: string;
  username: string | null;
  xp: number;
  is_premium: boolean;
  stripe_customer_id: string | null;
  created_at?: string;
  last_active_at?: string;
}

interface Announcement {
  id: string;
  message: string;
  color: string;
  expires_at: string;
  created_at: string;
}

interface Stats {
  totalPlayers: number;
  activeToday: number;
  onlineNow: number;
  premiumCount: number;
  totalWordsClicked: number;
  totalStoriesRead: number;
  newPlayersToday: number;
}

type Tab = "dashboard" | "players" | "announcements" | "actions" | "groupes";

export default function AdminPage() {
  const supabase = createClient();
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Profile | null>(null);
  const [editXp, setEditXp] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPremium, setEditPremium] = useState(false);
  const [xpDelta, setXpDelta] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [playerStories, setPlayerStories] = useState<any[]>([]);
  const [wordGroups, setWordGroups]       = useState<any[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [playerWords, setPlayerWords] = useState<any[]>([]);
  const [playerGames, setPlayerGames] = useState<any[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [topStories, setTopStories] = useState<any[]>([]);
  const [topWords, setTopWords] = useState<any[]>([]);
  const [topWordsToday, setTopWordsToday] = useState<any[]>([]);
  const [gamesStats, setGamesStats] = useState<{ played: number; total: number } | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [newColor, setNewColor] = useState("red");
  const [newDuration, setNewDuration] = useState("1h");
  const [newCustomDate, setNewCustomDate] = useState("");
  const [postingAnn, setPostingAnn] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showPremiumAll, setShowPremiumAll] = useState(false);
  const [showResetStats, setShowResetStats] = useState(false);
  const [showRemovePremiumAll, setShowRemovePremiumAll] = useState(false);
  const [showResetPlayer, setShowResetPlayer] = useState(false);
  const [globalAction, setGlobalAction] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id !== ADMIN_ID) { router.push("/"); return; }
      setAuthorized(true);
      loadProfiles();
      loadStats();
      loadAnnouncements();
    });
    const refreshInterval = setInterval(() => {
      loadProfiles();
      loadStats();
    }, 8000);
    return () => clearInterval(refreshInterval);
  }, []);

  async function adminFetch(userId: string, updates: Record<string, any>) {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/admin-update-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, requesterId: session?.user?.id, updates }),
    });
    return res.json();
  }

  async function loadProfiles() {
    const { data } = await supabase
      .from("profiles")
      .select("id, username, xp, is_premium, stripe_customer_id, created_at, last_active_at")
      .order("xp", { ascending: false });
    if (data) setProfiles(data);
  }

  async function loadWordGroupsAdmin() {
    setLoadingGroups(true);
    const { data } = await supabase.from("word_groups").select("*").order("created_at", { ascending: false });
    setWordGroups(data ?? []);
    setLoadingGroups(false);
  }

  async function deleteWordGroup(id: string) {
    await supabase.from("word_groups").delete().eq("id", id);
    setWordGroups(prev => prev.filter(g => g.id !== id));
  }

  async function loadStats() {
    const parisNow   = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
    const parisToday = parisNow.toISOString().slice(0, 10);
    const tenSecAgo  = new Date(Date.now() - 10 * 1000).toISOString();

    const { count: total } = await supabase.from("profiles").select("id", { count: "exact" });
    const { count: premium } = await supabase.from("profiles").select("id", { count: "exact" }).eq("is_premium", true);
    const { count: activeToday } = await supabase.from("profiles").select("id", { count: "exact" }).gte("last_active_at", parisToday + "T00:00:00+02:00");
    const { count: onlineNow } = await supabase.from("profiles").select("id", { count: "exact" }).gte("last_active_at", tenSecAgo);
    const { count: newToday } = await supabase.from("profiles").select("id", { count: "exact" }).gte("created_at", parisToday + "T00:00:00+02:00");
    const { count: wordsTotal } = await supabase.from("words_seen").select("id", { count: "exact" });
    const { count: storiesTotal } = await supabase.from("stories_read").select("id", { count: "exact" });

    setStats({
      totalPlayers: total ?? 0,
      premiumCount: premium ?? 0,
      activeToday: activeToday ?? 0,
      onlineNow: onlineNow ?? 0,
      newPlayersToday: newToday ?? 0,
      totalWordsClicked: wordsTotal ?? 0,
      totalStoriesRead: storiesTotal ?? 0,
    });

    // Top histoires
    const { data: storiesData } = await supabase.from("stories_read").select("story_slug").limit(500);
    if (storiesData) {
      const counts: Record<string, number> = {};
      storiesData.forEach((s: any) => { counts[s.story_slug] = (counts[s.story_slug] || 0) + 1; });
      setTopStories(Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5));
    }

    // Top mots tous temps
    const { data: wordsData } = await supabase.from("words_seen").select("word").limit(1000);
    if (wordsData) {
      const counts: Record<string, number> = {};
      wordsData.forEach((w: any) => { counts[w.word] = (counts[w.word] || 0) + 1; });
      setTopWords(Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10));
    }

    // Top mots du jour
    const { data: wordsTodayData } = await supabase
      .from("words_seen")
      .select("word")
      .gte("seen_at", parisToday)
      .limit(500);
    if (wordsTodayData) {
      const counts: Record<string, number> = {};
      wordsTodayData.forEach((w: any) => { counts[w.word] = (counts[w.word] || 0) + 1; });
      setTopWordsToday(Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10));
    }

    // Jeux aujourd'hui
    const { count: gamesPlayed } = await supabase.from("game_completions").select("id", { count: "exact" }).eq("game_date", parisToday);
    setGamesStats({ played: gamesPlayed ?? 0, total: total ?? 0 });
  }

  async function loadAnnouncements() {
    const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(10);
    if (data) setAnnouncements(data);
  }

  async function selectProfile(p: Profile) {
    setSelected(p);
    setEditXp(String(p.xp));
    setEditUsername(p.username ?? "");
    setEditPremium(p.is_premium);
    setXpDelta("");
    setMsg("");
    setLoadingDetail(true);
    const [stories, words, games] = await Promise.all([
      supabase.from("stories_read").select("story_slug, story_level, read_at").eq("user_id", p.id).order("read_at", { ascending: false }).limit(10),
      supabase.from("words_seen").select("word, seen_at").eq("user_id", p.id).order("seen_at", { ascending: false }).limit(10),
      supabase.from("game_completions").select("game_date, def_answer, anag_done, cit_answer").eq("user_id", p.id).order("game_date", { ascending: false }).limit(7),
    ]);
    setPlayerStories(stories.data ?? []);
    setPlayerWords(words.data ?? []);
    setPlayerGames(games.data ?? []);
    setLoadingDetail(false);
  }

  async function handleSave() {
    if (!selected) return;
    setSaving(true); setMsg("");
    const updates = {
      xp: parseInt(editXp) || 0,
      username: editUsername.trim() || null,
      is_premium: editPremium,
    };
    const data = await adminFetch(selected.id, updates);
    if (data.error) setMsg("❌ " + data.error);
    else {
      setMsg("✅ Sauvegardé !");
      setProfiles(prev => prev.map(p => p.id === selected.id ? { ...p, ...updates } : p));
      setSelected(prev => prev ? { ...prev, ...updates } : null);
    }
    setSaving(false);
  }

  async function handleAddXp() {
    if (!selected) return;
    const delta = parseInt(xpDelta);
    if (isNaN(delta)) return;
    setSaving(true); setMsg("");
    const newXp = Math.max(0, (selected.xp || 0) + delta);
    const data = await adminFetch(selected.id, { xp: newXp });
    if (data.error) setMsg("❌ " + data.error);
    else {
      setMsg(`✅ XP ${delta >= 0 ? "+" : ""}${delta} → ${newXp} XP`);
      setEditXp(String(newXp));
      setProfiles(prev => prev.map(p => p.id === selected.id ? { ...p, xp: newXp } : p));
      setSelected(prev => prev ? { ...prev, xp: newXp } : null);
      setXpDelta("");
    }
    setSaving(false);
  }

  async function handleResetStreak() {
    if (!selected) return;
    setSaving(true);
    await supabase.from("stories_read").delete().eq("user_id", selected.id);
    setMsg("✅ Série et historique réinitialisés !");
    setSaving(false);
  }

  async function handleGivePremiumLifetime() {
    if (!selected) return;
    setSaving(true);
    const data = await adminFetch(selected.id, { is_premium: true, stripe_customer_id: null });
    if (data.error) setMsg("❌ " + data.error);
    else {
      setEditPremium(true);
      setProfiles(prev => prev.map(p => p.id === selected.id ? { ...p, is_premium: true, stripe_customer_id: null } : p));
      setSelected(prev => prev ? { ...prev, is_premium: true, stripe_customer_id: null } : null);
      setMsg("✅ Premium à vie accordé !");
    }
    setSaving(false);
  }

  async function handleBan() {
    if (!selected) return;
    if (!confirm(`Supprimer définitivement ${selected.username || selected.id} ?`)) return;
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/admin-delete-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selected.id, requesterId: session?.user?.id }),
    });
    const data = await res.json();
    if (data.success) { setProfiles(prev => prev.filter(p => p.id !== selected.id)); setSelected(null); setMsg(""); }
    else setMsg("❌ " + data.error);
    setSaving(false);
  }

  async function handleExportCSV() {
    const rows = ["ID,Pseudo,XP,Premium,Inscription,Dernière activité"];
    profiles.forEach(p => { rows.push(`${p.id},${p.username ?? ""},${p.xp},${p.is_premium},${p.created_at ?? ""},${p.last_active_at ?? ""}`); });
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `lexistory_users_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }

  async function handleResetAllXp() {
    setSaving(true);
    await supabase.from("profiles").update({ xp: 0 }).neq("id", "00000000-0000-0000-0000-000000000000");
    setProfiles(prev => prev.map(p => ({ ...p, xp: 0 })));
    setShowResetConfirm(false);
    setGlobalAction("✅ Tous les XP remis à zéro !");
    setSaving(false);
  }

  async function handlePremiumAll() {
    setSaving(true);
    await supabase.from("profiles").update({ is_premium: true }).neq("id", "00000000-0000-0000-0000-000000000000");
    setProfiles(prev => prev.map(p => ({ ...p, is_premium: true })));
    setShowPremiumAll(false);
    setGlobalAction("✅ Premium accordé à tous !");
    setSaving(false);
  }

  async function handleResetAllStats() {
    setSaving(true);
    const tables = ["stories_read","words_seen","word_favorites","definition_usage","game_completions","story_ratings"];
    for (const t of tables) await supabase.from(t).delete().neq("user_id", ADMIN_ID);
    await supabase.from("profiles").update({ xp: 0 }).neq("id", ADMIN_ID);
    setProfiles(prev => prev.map(p => p.id !== ADMIN_ID ? { ...p, xp: 0 } : p));
    setShowResetStats(false);
    setGlobalAction("✅ Toutes les stats remises à zéro !");
    setSaving(false);
  }

  async function handleRemovePremiumAll() {
    setSaving(true);
    await supabase.from("profiles").update({ is_premium: false }).neq("id", ADMIN_ID);
    setProfiles(prev => prev.map(p => p.id !== ADMIN_ID ? { ...p, is_premium: false } : p));
    setShowRemovePremiumAll(false);
    setGlobalAction("✅ Premium retiré à tous les joueurs !");
    setSaving(false);
  }

  async function handleResetPlayer() {
    if (!selected) return;
    setSaving(true);
    const tables = ["stories_read","words_seen","word_favorites","definition_usage","game_completions","story_ratings"];
    for (const t of tables) await supabase.from(t).delete().eq("user_id", selected.id);
    await adminFetch(selected.id, { xp: 0, username: null, avatar_url: null, is_premium: false });
    setProfiles(prev => prev.map(p => p.id === selected.id ? { ...p, xp: 0, username: null, is_premium: false } : p));
    setSelected(prev => prev ? { ...prev, xp: 0, username: null, is_premium: false } : null);
    setEditXp("0"); setEditUsername(""); setEditPremium(false);
    setPlayerStories([]); setPlayerWords([]); setPlayerGames([]);
    setShowResetPlayer(false);
    setMsg("✅ Joueur réinitialisé — devra rechoisir pseudo et avatar !");
    setSaving(false);
  }

  async function handlePostAnnouncement() {
    if (!newMessage.trim()) return;
    setPostingAnn(true);
    let expiresAt: Date;
    if (newDuration === "custom" && newCustomDate) {
      expiresAt = new Date(newCustomDate);
    } else {
      expiresAt = new Date();
      const hours = newDuration === "1h" ? 1 : newDuration === "6h" ? 6 : newDuration === "24h" ? 24 : newDuration === "72h" ? 72 : 1;
      expiresAt.setHours(expiresAt.getHours() + hours);
    }
    await supabase.from("announcements").insert({ message: newMessage.trim(), color: newColor, expires_at: expiresAt.toISOString() });
    setNewMessage("");
    loadAnnouncements();
    setPostingAnn(false);
  }

  async function handleDeleteAnnouncement(id: string) {
    await supabase.from("announcements").delete().eq("id", id);
    loadAnnouncements();
  }

  const parisFmt = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
    timeZone: "Europe/Paris",
  });

  function parseUTC(d: string): Date {
    const s = d.replace(" ", "T");
    if (!s.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(s)) return new Date(s + "Z");
    return new Date(s);
  }

  function formatDate(d?: string) {
    if (!d) return "—";
    return parisFmt.format(parseUTC(d));
  }

  function formatRelative(d?: string) {
    if (!d) return "";
    const diff = Date.now() - parseUTC(d).getTime();
    if (diff < 60_000)  return "il y a moins d'une minute";
    if (diff < 3600_000) return `il y a ${Math.floor(diff / 60_000)} min`;
    if (diff < 86400_000) return `il y a ${Math.floor(diff / 3600_000)}h`;
    return `il y a ${Math.floor(diff / 86400_000)}j`;
  }

  function activityDot(last_active_at?: string) {
    if (!last_active_at) return <span title="Jamais actif" style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#555", marginRight: 6 }} />;
    const diff = Date.now() - parseUTC(last_active_at).getTime();
    const color = diff < 5 * 60 * 1000 ? "#22c55e" : diff < 60 * 60 * 1000 ? "#eab308" : diff < 12 * 60 * 60 * 1000 ? "#f97316" : "#ef4444";
    const label = diff < 5 * 60 * 1000 ? "En ligne" : diff < 60 * 60 * 1000 ? "Actif < 1h" : diff < 12 * 60 * 60 * 1000 ? "Actif < 12h" : "Inactif";
    return <span title={label} style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: color, marginRight: 6, flexShrink: 0 }} />;
  }

  function isExpired(d: string) { return new Date(d) < new Date(); }

  const filtered = profiles.filter(p =>
    (p.username ?? "").toLowerCase().includes(search.toLowerCase()) || p.id.includes(search)
  );

  if (!authorized) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>⚙️ Admin LexiStory</h1>
        <div className={styles.headerActions}>
          <span className={styles.count}>{profiles.length} joueurs</span>
          <button className={styles.exportBtn} onClick={handleExportCSV}>📥 Export CSV</button>
          <a href="/" className={styles.backBtn}>← Accueil</a>
        </div>
      </div>

      <div className={styles.tabs}>
  {([["dashboard", "📊 Dashboard"], ["players", "👥 Joueurs"], ["announcements", "📢 Annonces"], ["actions", "⚙️ Actions"]] as [Tab, string][]).map(([tab, label]) => (
    <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`} onClick={() => setActiveTab(tab as Tab)}>{label}</button>
  ))}
  <button className={`${styles.tab} ${activeTab === "groupes" ? styles.tabActive : ""}`} onClick={() => { setActiveTab("groupes"); loadWordGroupsAdmin(); }}>📝 Groupes</button>
  <a href="/admin-content" className={styles.tab} style={{ textDecoration: "none", opacity: 0.8 }}>📖 Contenu</a>
</div>

      {/* ── DASHBOARD ── */}
      {activeTab === "dashboard" && (
        <>
        <div className={styles.dashGrid}>
          {stats && (<>
            <div className={styles.statCard}><div className={styles.statBig}>{stats.totalPlayers}</div><div className={styles.statLbl}>👥 Joueurs total</div></div>
            <div className={styles.statCard}><div className={styles.statBig}>{stats.onlineNow}</div><div className={styles.statLbl}>🟢 En ligne maintenant</div></div>
            <div className={styles.statCard}><div className={styles.statBig}>{stats.activeToday}</div><div className={styles.statLbl}>📅 Actifs aujourd'hui</div></div>
            <div className={styles.statCard}><div className={styles.statBig}>{stats.newPlayersToday}</div><div className={styles.statLbl}>🆕 Nouveaux aujourd'hui</div></div>
            <div className={styles.statCard}><div className={styles.statBig}>{stats.premiumCount}</div><div className={styles.statLbl}>✨ Premium</div></div>
            <div className={styles.statCard}><div className={styles.statBig}>{stats.totalStoriesRead}</div><div className={styles.statLbl}>📖 Histoires lues</div></div>
            <div className={styles.statCard}><div className={styles.statBig}>{stats.totalWordsClicked}</div><div className={styles.statLbl}>✨ Mots consultés</div></div>
          </>)}
          {gamesStats && <div className={styles.statCard}><div className={styles.statBig}>{gamesStats.played}</div><div className={styles.statLbl}>🎮 Jeux joués aujourd'hui</div></div>}
          {stats && <div className={styles.statCard}><div className={styles.statBig}>{stats.totalPlayers > 0 ? Math.round((stats.premiumCount / stats.totalPlayers) * 100) : 0}%</div><div className={styles.statLbl}>💰 Taux Premium</div></div>}

          <div className={styles.statCardWide}>
            <div className={styles.statLabel}>📖 Histoires les plus lues</div>
            {topStories.map(([slug, count]) => (
              <div key={slug} className={styles.topRow}><span className={styles.topName}>{slug}</span><span className={styles.topVal}>{count as number} lectures</span></div>
            ))}
          </div>

          <div className={styles.statCardWide}>
            <div className={styles.statLabel}>✨ Mots les plus consultés (tous temps)</div>
            {topWords.map(([word, count]) => (
              <div key={word} className={styles.topRow}><span className={styles.topName}>{word}</span><span className={styles.topVal}>{count as number}×</span></div>
            ))}
          </div>

          <div className={styles.statCardWide}>
            <div className={styles.statLabel}>🔥 Mots les plus consultés aujourd'hui</div>
            {topWordsToday.length === 0
              ? <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", fontStyle: "italic" }}>Aucun mot consulté aujourd'hui</div>
              : topWordsToday.map(([word, count]) => (
                <div key={word} className={styles.topRow}><span className={styles.topName}>{word}</span><span className={styles.topVal}>{count as number}×</span></div>
              ))}
          </div>
        </div>
        <ApiDefStats />
        </>
      )}

      {/* ── JOUEURS ── */}
      {activeTab === "players" && (
        <div className={styles.layout}>
          <div className={styles.panel}>
            <input className={styles.search} placeholder="🔍 Rechercher..." value={search} onChange={e => setSearch(e.target.value)} />
            <div className={styles.list}>
              {filtered.map(p => (
                <div key={p.id} className={`${styles.item} ${selected?.id === p.id ? styles.itemActive : ""}`} onClick={() => selectProfile(p)}>
                  <div className={styles.itemLeft}>
                    <div className={styles.itemName} style={{ display: "flex", alignItems: "center" }}>{activityDot(p.last_active_at)}{p.username || <span className={styles.noName}>sans pseudo</span>}</div>
                    <div className={styles.itemId}>{p.id.slice(0, 8)}...</div>
                  </div>
                  <div className={styles.itemRight}>
                    <span className={styles.itemXp}>{p.xp} XP</span>
                    {p.is_premium && <span className={styles.itemPremium}>✨</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.detail}>
            {selected ? (
              <>
                <div className={styles.detailHeader}>
                  <h2 className={styles.detailName}>{selected.username || "Sans pseudo"}</h2>
                  <div className={styles.detailMeta}>
                    <span>🗓 Inscription : {formatDate(selected.created_at)}</span>
                    <span>🕐 Dernière activité : {formatDate(selected.last_active_at)} ({formatRelative(selected.last_active_at)})</span>
                    <span className={styles.detailId}>{selected.id}</span>
                  </div>
                </div>
                {msg && <div className={styles.msg}>{msg}</div>}
                <div className={styles.detailSections}>
                  <div className={styles.detailSection}>
                    <div className={styles.detailSectionTitle}>✏️ Modifier</div>
                    <div className={styles.fields}>
                      <label className={styles.label}>Pseudo</label>
                      <input className={styles.input} value={editUsername} onChange={e => setEditUsername(e.target.value)} placeholder="Pseudo..." />
                      <label className={styles.label}>XP total</label>
                      <input className={styles.input} type="number" value={editXp} onChange={e => setEditXp(e.target.value)} />
                      <label className={styles.label}>Modifier l'XP (delta)</label>
                      <div className={styles.xpRow}>
                        <input className={styles.input} type="number" value={xpDelta} onChange={e => setXpDelta(e.target.value)} placeholder="+100 ou -50" />
                        <button className={styles.xpBtn} onClick={handleAddXp} disabled={saving || !xpDelta}>Appliquer</button>
                      </div>
                      <label className={styles.label}>Premium</label>
                      <button className={`${styles.toggleBtn} ${editPremium ? styles.toggleOn : styles.toggleOff}`} onClick={() => setEditPremium(!editPremium)}>
                        {editPremium ? "✨ Premium actif" : "Plan gratuit"}
                      </button>
                      <label className={styles.label}>Stripe ID</label>
                      <div className={styles.readOnly}>{selected.stripe_customer_id || "—"}</div>
                    </div>
                    <div className={styles.actions}>
                      <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>{saving ? "..." : "💾 Sauvegarder"}</button>
                    </div>
                  </div>

                  <div className={styles.detailSection}>
                    <div className={styles.detailSectionTitle}>⚡ Actions rapides</div>
                    <div className={styles.quickActions}>
                      <button className={styles.quickBtn} onClick={handleGivePremiumLifetime} disabled={saving}>🎁 Premium à vie</button>
                      <button className={styles.quickBtn} onClick={handleResetStreak} disabled={saving}>🔄 Reset streak</button>
                      <button className={`${styles.quickBtn} ${styles.quickBtnDanger}`} onClick={() => setShowResetPlayer(true)} disabled={saving}>♻️ Reset complet</button>
                      <button className={`${styles.quickBtn} ${styles.quickBtnDanger}`} onClick={handleBan} disabled={saving}>🗑️ Supprimer</button>
                    </div>
                  </div>

                  {loadingDetail ? (
                    <div className={styles.loading}>Chargement activité...</div>
                  ) : (
                    <>
                      <div className={styles.detailSection}>
                        <div className={styles.detailSectionTitle}>📖 Dernières histoires lues</div>
                        {playerStories.length === 0 ? <div className={styles.empty2}>Aucune histoire lue</div> : playerStories.map((s, i) => (
                          <div key={i} className={styles.activityRow}><span>{s.story_slug}</span><span className={styles.activityDate}>{formatDate(s.read_at)}</span></div>
                        ))}
                      </div>
                      <div className={styles.detailSection}>
                        <div className={styles.detailSectionTitle}>✨ Derniers mots consultés</div>
                        <div className={styles.wordChips}>
                          {playerWords.length === 0 ? <span className={styles.empty2}>Aucun mot</span> : playerWords.map((w, i) => (
                            <span key={i} className={styles.wordChip}>{w.word}</span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.detailSection}>
                        <div className={styles.detailSectionTitle}>🎮 Jeux récents</div>
                        {playerGames.length === 0 ? <div className={styles.empty2}>Aucun jeu joué</div> : playerGames.map((g, i) => (
                          <div key={i} className={styles.activityRow}>
                            <span>{g.game_date}</span>
                            <span className={styles.activityDate}>{[g.def_answer && "Déf✅", g.anag_done && "Anag✅", g.cit_answer && "Cit✅"].filter(Boolean).join(" · ") || "En cours"}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.empty}><div className={styles.emptyIcon}>👆</div><p>Sélectionne un joueur</p></div>
            )}
          </div>
        </div>
      )}

      {/* ── ANNONCES ── */}
      {activeTab === "announcements" && (
        <div className={styles.annSection}>
          <div className={styles.annForm}>
            <div className={styles.detailSectionTitle}>📢 Nouvelle annonce</div>
            <textarea className={styles.annTextarea} placeholder="Message à afficher à tous les utilisateurs..." value={newMessage} onChange={e => setNewMessage(e.target.value)} rows={3} />
            <div className={styles.annOptions}>
              <div>
                <label className={styles.label}>Couleur</label>
                <select className={styles.input} value={newColor} onChange={e => setNewColor(e.target.value)}>
                  <option value="red">🔴 Rouge (urgent)</option>
                  <option value="orange">🟠 Orange (avertissement)</option>
                  <option value="blue">🔵 Bleu (info)</option>
                  <option value="green">🟢 Vert (succès)</option>
                  <option value="gold">🟡 Or (annonce)</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Durée</label>
                <select className={styles.input} value={newDuration} onChange={e => setNewDuration(e.target.value)}>
                  <option value="1h">1 heure</option>
                  <option value="6h">6 heures</option>
                  <option value="24h">24 heures</option>
                  <option value="72h">3 jours</option>
                  <option value="custom">Date précise</option>
                </select>
              </div>
            </div>
            {newDuration === "custom" && <input className={styles.input} type="datetime-local" value={newCustomDate} onChange={e => setNewCustomDate(e.target.value)} />}
            <button className={styles.saveBtn} onClick={handlePostAnnouncement} disabled={postingAnn || !newMessage.trim()}>{postingAnn ? "Publication..." : "📢 Publier l'annonce"}</button>
          </div>
          <div className={styles.annList}>
            <div className={styles.detailSectionTitle}>Annonces actives & passées</div>
            {announcements.length === 0 ? <div className={styles.empty2}>Aucune annonce</div> : announcements.map(a => (
              <div key={a.id} className={`${styles.annItem} ${isExpired(a.expires_at) ? styles.annExpired : ""}`}>
                <div className={styles.annDot} style={{ background: a.color === "red" ? "#e07070" : a.color === "orange" ? "#e09070" : a.color === "blue" ? "#7090e0" : a.color === "green" ? "#70b070" : "#e8c97a" }} />
                <div className={styles.annContent}>
                  <div className={styles.annMessage}>{a.message}</div>
                  <div className={styles.annMeta}>Expire : {formatDate(a.expires_at)} {isExpired(a.expires_at) && "· ⏰ Expirée"}</div>
                </div>
                <button className={styles.annDelete} onClick={() => handleDeleteAnnouncement(a.id)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── GROUPES DE MOTS ── */}
      {activeTab === "groupes" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>{wordGroups.length} groupe{wordGroups.length !== 1 ? "s" : ""}</div>
            <button className={styles.exportBtn} onClick={loadWordGroupsAdmin}>↺ Actualiser</button>
          </div>
          {loadingGroups ? (
            <div className={styles.empty2}>Chargement…</div>
          ) : wordGroups.length === 0 ? (
            <div className={styles.empty2}>Aucun groupe défini.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-dim)", textAlign: "left" }}>
                    {["Histoire", "Groupe", "Mots", "Créé le", ""].map(h => (
                      <th key={h} style={{ padding: "8px 10px", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.6px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wordGroups.map((g: any) => (
                    <tr key={g.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "8px 10px", color: "var(--text-dim)", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.story_id}</td>
                      <td style={{ padding: "8px 10px", fontWeight: 600, color: "var(--accent)" }}>{g.group_text}</td>
                      <td style={{ padding: "8px 10px", color: "var(--text-muted)" }}>{Array.isArray(g.words) ? g.words.join(", ") : g.words}</td>
                      <td style={{ padding: "8px 10px", color: "var(--text-dim)", whiteSpace: "nowrap" }}>{new Date(g.created_at).toLocaleDateString("fr-FR")}</td>
                      <td style={{ padding: "8px 10px" }}>
                        <button onClick={() => deleteWordGroup(g.id)} style={{ padding: "3px 10px", borderRadius: "6px", background: "rgba(224,112,112,0.1)", border: "1px solid rgba(224,112,112,0.4)", color: "#e07070", cursor: "pointer", fontFamily: "inherit", fontSize: "0.75rem" }}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── ACTIONS GLOBALES ── */}
      {activeTab === "actions" && (
        <div className={styles.actionsGrid}>
          {globalAction && <div className={styles.globalMsg}>{globalAction}</div>}
          <div className={styles.actionCard}><div className={styles.actionIcon}>🔄</div><div className={styles.actionTitle}>Reset tous les XP</div><div className={styles.actionDesc}>Remet l'XP de tous les joueurs à 0. Irréversible.</div><button className={styles.actionBtnDanger} onClick={() => setShowResetConfirm(true)}>Exécuter</button></div>
          <div className={styles.actionCard}><div className={styles.actionIcon}>🧹</div><div className={styles.actionTitle}>Reset toutes les stats</div><div className={styles.actionDesc}>Supprime histoires lues, mots vus, favoris, jeux, XP pour tous. Irréversible.</div><button className={styles.actionBtnDanger} onClick={() => setShowResetStats(true)}>Exécuter</button></div>
          <div className={styles.actionCard}><div className={styles.actionIcon}>✨</div><div className={styles.actionTitle}>Premium à tous</div><div className={styles.actionDesc}>Donne le statut Premium à tous les joueurs actuels.</div><button className={styles.actionBtn} onClick={() => setShowPremiumAll(true)}>Exécuter</button></div>
          <div className={styles.actionCard}><div className={styles.actionIcon}>🚫</div><div className={styles.actionTitle}>Enlever Premium à tous</div><div className={styles.actionDesc}>Retire le statut Premium de tous les joueurs. Irréversible.</div><button className={styles.actionBtnDanger} onClick={() => setShowRemovePremiumAll(true)}>Exécuter</button></div>
          <div className={styles.actionCard}><div className={styles.actionIcon}>📥</div><div className={styles.actionTitle}>Exporter les joueurs</div><div className={styles.actionDesc}>Télécharge un fichier CSV avec tous les comptes.</div><button className={styles.actionBtn} onClick={handleExportCSV}>Télécharger CSV</button></div>
          <div className={styles.actionCard}><div className={styles.actionIcon}>🔃</div><div className={styles.actionTitle}>Actualiser les stats</div><div className={styles.actionDesc}>Recharge toutes les statistiques du dashboard.</div><button className={styles.actionBtn} onClick={() => { loadStats(); loadProfiles(); setGlobalAction("✅ Stats actualisées !"); }}>Actualiser</button></div>
        </div>
      )}

      {showResetConfirm && (
        <div className={styles.overlay} onClick={() => setShowResetConfirm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "2rem" }}>⚠️</div>
            <h3>Reset tous les XP ?</h3>
            <p>XP de TOUS les joueurs remis à 0. Irréversible.</p>
            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} onClick={() => setShowResetConfirm(false)}>Annuler</button>
              <button className={styles.confirmBtn} onClick={handleResetAllXp} disabled={saving}>{saving ? "..." : "Confirmer"}</button>
            </div>
          </div>
        </div>
      )}
      {showPremiumAll && (
        <div className={styles.overlay} onClick={() => setShowPremiumAll(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "2rem" }}>✨</div>
            <h3>Premium à tout le monde ?</h3>
            <p>Tous les joueurs actuels passeront Premium gratuitement.</p>
            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} onClick={() => setShowPremiumAll(false)}>Annuler</button>
              <button className={styles.confirmBtn} onClick={handlePremiumAll} disabled={saving}>{saving ? "..." : "Confirmer"}</button>
            </div>
          </div>
        </div>
      )}
      {showResetStats && (
        <div className={styles.overlay} onClick={() => setShowResetStats(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "2rem" }}>🧹</div>
            <h3>Reset toutes les stats ?</h3>
            <p>Histoires lues, mots vus, favoris, jeux joués et XP remis à zéro pour TOUS les joueurs. Irréversible.</p>
            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} onClick={() => setShowResetStats(false)}>Annuler</button>
              <button className={styles.confirmBtn} onClick={handleResetAllStats} disabled={saving}>{saving ? "..." : "Confirmer"}</button>
            </div>
          </div>
        </div>
      )}
      {showRemovePremiumAll && (
        <div className={styles.overlay} onClick={() => setShowRemovePremiumAll(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "2rem" }}>🚫</div>
            <h3>Enlever Premium à tous ?</h3>
            <p>Tous les joueurs reviendront au plan gratuit. Irréversible.</p>
            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} onClick={() => setShowRemovePremiumAll(false)}>Annuler</button>
              <button className={styles.confirmBtn} onClick={handleRemovePremiumAll} disabled={saving}>{saving ? "..." : "Confirmer"}</button>
            </div>
          </div>
        </div>
      )}
      {showResetPlayer && selected && (
        <div className={styles.overlay} onClick={() => setShowResetPlayer(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "2rem" }}>♻️</div>
            <h3>Reset complet de {selected.username || "ce joueur"} ?</h3>
            <p>Pseudo, avatar, XP, histoires, mots, favoris, jeux — tout sera effacé. Le joueur devra rechoisir pseudo et avatar à la prochaine connexion.</p>
            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} onClick={() => setShowResetPlayer(false)}>Annuler</button>
              <button className={styles.confirmBtn} onClick={handleResetPlayer} disabled={saving}>{saving ? "..." : "Confirmer"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
