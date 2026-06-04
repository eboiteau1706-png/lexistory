"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

const CAP          = 500;
const BUDGET_EUR   = 5;
const EUR_PER_CALL = 0.009;

interface Data {
  callCount:  number;
  cacheTotal: number;
}

function Shimmer({ w = "100%", h = 12 }: { w?: string; h?: number }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 6,
      background: "linear-gradient(90deg, var(--surface2) 25%, var(--border) 50%, var(--surface2) 75%)",
      backgroundSize: "200% 100%",
      animation: "apiShimmer 1.4s ease-in-out infinite",
    }} />
  );
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
      <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{label}</span>
      <span style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <strong style={{ fontSize: "1.05rem", color: "var(--text)", fontFamily: "var(--font-playfair), serif" }}>{value}</strong>
        {sub && <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{sub}</span>}
      </span>
    </div>
  );
}

const RESET_KEY = "apiDefStats_lastReset";

export default function ApiDefStats() {
  const supabase   = createClient();
  const [data, setData]         = useState<Data | null>(null);
  const [loading, setLoading]   = useState(true);
  const [resetting, setResetting] = useState(false);
  const [lastReset, setLastReset] = useState<string | null>(null);

  const loadData = () => {
    Promise.all([
      supabase.from("api_usage").select("id, call_count").limit(1).maybeSingle(),
      supabase.from("definitions_cache").select("word_key", { count: "exact", head: true }),
    ]).then(([usage, cache]) => {
      const realCount = cache.count ?? 0;
      const storedCount = usage.data?.call_count ?? 0;
      // Sync call_count avec le cache si décalage (le cache est la source de vérité)
      if (usage.data && realCount > storedCount) {
        supabase.from("api_usage").update({ call_count: realCount }).eq("id", usage.data.id);
      }
      setData({ callCount: realCount, cacheTotal: realCount });
      setLoading(false);
    });
  };

  useEffect(() => {
    setLastReset(localStorage.getItem(RESET_KEY));
    loadData();
  }, []);

  async function handleReset() {
    setResetting(true);
    // Reset by ID — fetch first to get the row id, then update
    const { data: row } = await supabase.from("api_usage").select("id").limit(1).maybeSingle();
    if (row) await supabase.from("api_usage").update({ call_count: 0 }).eq("id", row.id);
    const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    localStorage.setItem(RESET_KEY, today);
    setLastReset(today);
    loadData();
    setResetting(false);
  }

  // cacheTotal est la source de vérité — chaque entrée cache = 1 appel API réel
  const cacheTotal      = data?.cacheTotal ?? 0;
  const callCount       = Math.max(data?.callCount ?? 0, cacheTotal); // prend le max pour affichage cohérent
  const costEur         = cacheTotal * EUR_PER_CALL;
  const remainingBudget = Math.max(0, BUDGET_EUR - costEur);
  const remainingCalls  = Math.max(0, CAP - cacheTotal);
  const pct             = Math.min(100, (cacheTotal / CAP) * 100);
  const barColor        = pct < 70 ? "#22c55e" : pct < 90 ? "#f97316" : "#ef4444";


  const card: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 20,
  };

  return (
    <>
      <style>{`@keyframes apiShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-dim)", marginBottom: 14 }}>
          🤖 Définitions API — Claude
        </div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} style={card}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <Shimmer w="55%" />
                  <Shimmer w="80%" h={20} />
                  <Shimmer w="65%" />
                  <Shimmer w="80%" h={20} />
                  <Shimmer w="50%" />
                  <Shimmer w="80%" h={20} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {/* Colonne gauche — budget */}
            <div style={card}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-dim)", marginBottom: 12 }}>
                💰 Budget cumulatif
              </div>
              <Row label="Dépensé"       value={`${costEur.toFixed(3)} €`} />
              <Row label="Restant"       value={`${remainingBudget.toFixed(3)} €`} sub={`/ ${BUDGET_EUR} €`} />
              <Row label="Appels Claude" value={`${callCount}`} sub={`/ ${CAP}`} />
              <Row label="Restants"      value={`${remainingCalls}`} sub="appels" />

              {/* Barre de progression */}
              <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-dim)", marginBottom: 6 }}>
                  <span>Consommation totale</span>
                  <span style={{ color: barColor, fontWeight: 700 }}>{pct.toFixed(1)} %</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: "var(--surface2)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, borderRadius: 4, background: barColor, transition: "width 0.6s ease" }} />
                </div>
              </div>
            </div>

            {/* Colonne droite — cache */}
            <div style={card}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-dim)", marginBottom: 12 }}>
                🗄️ Cache & réinitialisation
              </div>
              <Row label="Mots en cache"       value={`${cacheTotal}`} sub="définitions sauvegardées" />
              <Row label="Dernier reset"        value={lastReset ?? "Jamais"} />
              <Row label="Coût par appel"       value={`${(EUR_PER_CALL * 100).toFixed(1)} ¢`} sub="€ / définition" />
              <Row label="Budget total"         value={`${BUDGET_EUR} €`} />

              <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 10, background: "rgba(232,201,122,0.06)", border: "1px solid rgba(232,201,122,0.2)", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                💡 Chaque définition en cache est <strong style={{ color: "var(--accent)" }}>gratuite</strong> aux prochaines consultations.
              </div>
              <button onClick={handleReset} disabled={resetting}
                style={{ marginTop: 12, width: "100%", padding: "8px", borderRadius: 8, background: "rgba(224,112,112,0.1)", border: "1px solid rgba(224,112,112,0.4)", color: "#e07070", cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem", fontWeight: 600 }}>
                {resetting ? "Réinitialisation…" : "🗑️ Réinitialiser le compteur"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
