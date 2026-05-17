"use client";
import { useState } from "react";
import styles from "./support.module.css";

export default function Support() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit() {
    if (!form.email || !form.message) return;
    const mailto = `mailto:e.boiteau1706@gmail.com?subject=${encodeURIComponent("[LexiStory] " + (form.subject || "Support"))}&body=${encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Support & Contact</h1>
        <p className={styles.subtitle}>Une question, un bug, une suggestion ? On te répond dans les 48h.</p>

        <div className={styles.faqs}>
          <div className={styles.faqTitle}>Questions fréquentes</div>
          {[
            { q: "Comment résilier mon abonnement Premium ?", a: "Tu peux résilier à tout moment depuis ton espace Stripe. L'accès Premium reste actif jusqu'à la fin du mois payé." },
            { q: "Je n'arrive pas à me connecter.", a: "Vérifie tes spams pour le lien magique. Si le problème persiste, contacte-nous." },
            { q: "Puis-je changer mon pseudo ?", a: "Oui, depuis ta page profil, clique sur ✏️ à côté de ton pseudo." },
            { q: "Les histoires changent quand ?", a: "Une nouvelle histoire est disponible chaque jour à minuit. Les Premium peuvent accéder aux histoires passées." },
          ].map((faq, i) => (
            <div key={i} className={styles.faq}>
              <div className={styles.faqQ}>❓ {faq.q}</div>
              <div className={styles.faqA}>{faq.a}</div>
            </div>
          ))}
        </div>

        {sent ? (
          <div className={styles.sent}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>✅</div>
            <p>Ton client mail s&apos;est ouvert avec ton message. Envoie-le et on te répond dans les 48h !</p>
          </div>
        ) : (
          <div className={styles.form}>
            <div className={styles.formTitle}>Nous contacter</div>
            <div className={styles.row}>
              <input className={styles.input} placeholder="Ton prénom" value={form.name}
                onChange={e => setForm({...form, name: e.target.value})} />
              <input className={styles.input} placeholder="Ton email *" value={form.email}
                onChange={e => setForm({...form, email: e.target.value})} type="email" />
            </div>
            <input className={styles.input} placeholder="Sujet" value={form.subject}
              onChange={e => setForm({...form, subject: e.target.value})} />
            <textarea className={styles.textarea} placeholder="Ton message *" value={form.message}
              onChange={e => setForm({...form, message: e.target.value})} rows={5} />
            <button className={styles.btn} onClick={handleSubmit} disabled={!form.email || !form.message}>
              Envoyer le message →
            </button>
          </div>
        )}

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
