"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

interface Profile {
  id: string;
  username: string | null;
  email?: string;
  xp: number;
  is_premium: boolean;
  stripe_customer_id: string | null;
  created_at?: string;
}

export default function AdminPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Profile | null>(null);
  const [editXp, setEditXp] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPremium, setEditPremium] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [xpDelta, setXpDelta] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id !== ADMIN_ID) {
        router.push("/");
        return;
      }
      setAuthorized(true);
      loadProfiles();
    });
  }, []);

  async function loadProfiles() {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, username, xp, is_premium, stripe_customer_id")
      .order("xp", { ascending: false });
    if (data) setProfiles(data);
    setLoading(false);
  }

  function selectProfile(p: Profile) {
    setSelected(p);
    setEditXp(String(p.xp));
    setEditUsername(p.username ?? "");
    setEditPremium(p.is_premium);
    setXpDelta("");
    setMsg("");
  }

  async function handleSave() {
    if (!selected) return;
    setSaving(true); setMsg("");
    const updates: any = {
      xp: parseInt(editXp) || 0,
      username: editUsername.trim() || null,
      is_premium: editPremium,
    };
    const { error } = await supabase.from("profiles").update(updates).eq("id", selected.id);
    if (error) setMsg("❌ Erreur : " + error.message);
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
    const newXp = (selected.xp || 0) + delta;
    const { error } = await supabase.from("profiles").update({ xp: newXp }).eq("id", selected.id);
    if (error) setMsg("❌ Erreur : " + error.message);
    else {
      setMsg(`✅ XP ${delta >= 0 ? "+" : ""}${delta} → ${newXp} XP`);
      setEditXp(String(newXp));
      setProfiles(prev => prev.map(p => p.id === selected.id ? { ...p, xp: newXp } : p));
      setSelected(prev => prev ? { ...prev, xp: newXp } : null);
      setXpDelta("");
    }
    setSaving(false);
  }

  async function handleResetAllXp() {
    setSaving(true); setMsg("");
    const { error } = await supabase.from("profiles").update({ xp: 0 }).neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) setMsg("❌ Erreur : " + error.message);
    else {
      setMsg("✅ Tous les XP remis à zéro !");
      setProfiles(prev => prev.map(p => ({ ...p, xp: 0 })));
      if (selected) setSelected(prev => prev ? { ...prev, xp: 0 } : null);
    }
    setSaving(false);
    setShowResetConfirm(false);
  }

  async function handleDeleteUser() {
    if (!selected) return;
    if (!confirm(`Supprimer définitivement ${selected.username || selected.id} ?`)) return;
    setSaving(true);
    await supabase.from("words_seen").delete().eq("user_id", selected.id);
    await supabase.from("stories_read").delete().eq("user_id", selected.id);
    await supabase.from("profiles").delete().eq("id", selected.id);
    setProfiles(prev => prev.filter(p => p.id !== selected.id));
    setSelected(null);
    setMsg("");
    setSaving(false);
  }

  const filtered = profiles.filter(p =>
    (p.username ?? "").toLowerCase().includes(search.toLowerCase()) ||
    p.id.includes(search)
  );

  if (!authorized) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>⚙️ Admin Panel</h1>
        <div className={styles.headerActions}>
          <span className={styles.count}>{profiles.length} joueurs</span>
          <button className={styles.dangerBtn} onClick={() => setShowResetConfirm(true)}>
            🔄 Reset tous les XP
          </button>
          <a href="/" className={styles.backBtn}>← Accueil</a>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Liste joueurs */}
        <div className={styles.panel}>
          <input
            className={styles.search}
            placeholder="🔍 Rechercher par pseudo ou ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {loading ? (
            <div className={styles.loading}>Chargement...</div>
          ) : (
            <div className={styles.list}>
              {filtered.map(p => (
                <div
                  key={p.id}
                  className={`${styles.item} ${selected?.id === p.id ? styles.itemActive : ""}`}
                  onClick={() => selectProfile(p)}
                >
                  <div className={styles.itemLeft}>
                    <div className={styles.itemName}>{p.username || <span className={styles.noName}>sans pseudo</span>}</div>
                    <div className={styles.itemId}>{p.id.slice(0, 8)}...</div>
                  </div>
                  <div className={styles.itemRight}>
                    <span className={styles.itemXp}>{p.xp} XP</span>
                    {p.is_premium && <span className={styles.itemPremium}>✨</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Détail joueur */}
        <div className={styles.detail}>
          {selected ? (
            <>
              <div className={styles.detailHeader}>
                <h2 className={styles.detailName}>{selected.username || "Sans pseudo"}</h2>
                <div className={styles.detailId}>{selected.id}</div>
              </div>

              {msg && <div className={styles.msg}>{msg}</div>}

              <div className={styles.fields}>
                <label className={styles.label}>Pseudo</label>
                <input className={styles.input} value={editUsername} onChange={e => setEditUsername(e.target.value)} placeholder="Pseudo..." />

                <label className={styles.label}>XP total</label>
                <input className={styles.input} type="number" value={editXp} onChange={e => setEditXp(e.target.value)} />

                <label className={styles.label}>Modifier l'XP (+ ou -)</label>
                <div className={styles.xpRow}>
                  <input className={styles.input} type="number" value={xpDelta} onChange={e => setXpDelta(e.target.value)} placeholder="+100 ou -50" />
                  <button className={styles.xpBtn} onClick={handleAddXp} disabled={saving || !xpDelta}>Appliquer</button>
                </div>

                <label className={styles.label}>Premium</label>
                <div className={styles.toggle}>
                  <button
                    className={`${styles.toggleBtn} ${editPremium ? styles.toggleOn : styles.toggleOff}`}
                    onClick={() => setEditPremium(!editPremium)}
                  >
                    {editPremium ? "✨ Premium actif" : "Plan gratuit"}
                  </button>
                </div>

                <label className={styles.label}>Stripe Customer ID</label>
                <div className={styles.readOnly}>{selected.stripe_customer_id || "—"}</div>
              </div>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                  {saving ? "Sauvegarde..." : "💾 Sauvegarder"}
                </button>
                <button className={styles.deleteBtn} onClick={handleDeleteUser} disabled={saving}>
                  🗑️ Supprimer
                </button>
              </div>
            </>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>👆</div>
              <p>Sélectionne un joueur</p>
            </div>
          )}
        </div>
      </div>

      {showResetConfirm && (
        <div className={styles.overlay} onClick={() => setShowResetConfirm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "2rem" }}>⚠️</div>
            <h3>Reset tous les XP ?</h3>
            <p>Cette action remet l'XP de TOUS les joueurs à 0. Irréversible.</p>
            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} onClick={() => setShowResetConfirm(false)}>Annuler</button>
              <button className={styles.confirmBtn} onClick={handleResetAllXp} disabled={saving}>
                {saving ? "Reset..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
