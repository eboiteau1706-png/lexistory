export default function CompteConfirmePage() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      fontFamily: "var(--font-dm), sans-serif",
      background: "var(--bg)",
      color: "var(--text)",
      textAlign: "center",
      padding: "24px",
    }}>
      <div style={{ fontSize: "4rem", marginBottom: "16px" }}>✅</div>
      <h1 style={{
        fontFamily: "var(--font-playfair), serif",
        fontSize: "2rem",
        color: "var(--accent)",
        marginBottom: "12px",
      }}>
        Compte confirmé !
      </h1>
      <p style={{
        color: "var(--text-muted)",
        marginBottom: "32px",
        maxWidth: "380px",
        lineHeight: 1.6,
      }}>
        Ton adresse email a bien été vérifiée. Tu peux maintenant te connecter à LexiStory.
      </p>
      <a href="/login" style={{
        padding: "12px 28px",
        borderRadius: "50px",
        background: "var(--accent)",
        color: "var(--bg)",
        fontWeight: 700,
        textDecoration: "none",
        fontSize: "0.95rem",
      }}>
        Se connecter →
      </a>
    </div>
  );
}
