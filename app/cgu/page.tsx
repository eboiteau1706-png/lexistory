import styles from "../legal.module.css";

export const metadata = {
  title: "CGU — LexiStory",
};

export default function CGU() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Conditions Générales d&apos;Utilisation</h1>
        <p className={styles.updated}>Dernière mise à jour : 17 mai 2026</p>

        <section className={styles.section}>
          <h2>1. Objet</h2>
          <p>Les présentes CGU définissent les conditions d&apos;utilisation du service LexiStory, accessible à l&apos;adresse lexistory-tawny.vercel.app, édité par Enzo Boiteau.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Accès au service</h2>
          <p>LexiStory propose deux niveaux d&apos;accès :</p>
          <ul>
            <li><strong>Gratuit :</strong> 1 histoire par jour</li>
            <li><strong>Premium :</strong> histoires illimitées pour 1,99€/mois</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Abonnement Premium</h2>
          <p>L&apos;abonnement Premium est sans engagement et peut être résilié à tout moment. Le paiement est géré par Stripe. En cas de résiliation, l&apos;accès Premium reste actif jusqu&apos;à la fin de la période payée.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Propriété intellectuelle</h2>
          <p>Tout le contenu de LexiStory (histoires, définitions, design) est protégé par le droit d&apos;auteur. Toute reproduction est interdite sans accord préalable.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Responsabilité</h2>
          <p>LexiStory est un service éducatif fourni &quot;tel quel&quot;. Nous ne pouvons garantir une disponibilité permanente du service. En cas d&apos;interruption prolongée, les abonnés Premium seront remboursés au prorata.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Contact</h2>
          <p>Pour toute question : e.boiteau1706@gmail.com</p>
        </section>

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
