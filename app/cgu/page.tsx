import styles from "../legal.module.css";

export const metadata = {
  title: "CGU — LexiStory",
};

export default function CGU() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Conditions Générales d&apos;Utilisation</h1>
        <p className={styles.updated}>Dernière mise à jour : 19 mai 2026</p>

        <section className={styles.section}>
          <h2>1. Objet</h2>
          <p>Les présentes CGU définissent les conditions d&apos;utilisation du service LexiStory, accessible à l&apos;adresse <strong>lexistory.fr</strong>, édité par Enzo Boiteau, particulier domicilié à Osny, Val-d&apos;Oise, France.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Accès au service</h2>
          <p>LexiStory propose deux niveaux d&apos;accès :</p>
          <ul>
            <li><strong>Gratuit :</strong> 1 histoire par jour, statistiques de base, classement global</li>
            <li><strong>Premium :</strong> histoires illimitées, boost XP x1.5, statistiques avancées, accès aux histoires passées — <strong>1,99€ TTC / mois</strong></li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Compte utilisateur</h2>
          <p>Pour accéder aux fonctionnalités complètes (progression, classement, amis), vous devez créer un compte. Le pseudo choisi doit être unique, contenir uniquement des lettres, chiffres, tirets ou underscores, et respecter les droits des tiers.</p>
          <p>LexiStory se réserve le droit de supprimer tout pseudo inapproprié.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Fonctionnalité Amis</h2>
          <p>La fonctionnalité amis vous permet d&apos;ajouter d&apos;autres utilisateurs, de voir leur progression et de vous comparer dans un classement privé. Les profils détaillés ne sont accessibles qu&apos;aux amis mutuellement acceptés.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Abonnement Premium</h2>
          <p>L&apos;abonnement Premium est proposé au prix de <strong>1,99€ TTC par mois</strong>.</p>
          <p>Il est renouvelé automatiquement chaque mois jusqu&apos;à résiliation par l&apos;utilisateur. La résiliation peut être effectuée à tout moment depuis l&apos;espace client Stripe, sans frais ni préavis. L&apos;accès Premium reste actif jusqu&apos;à la fin de la période payée en cours.</p>
          <p>Le paiement est géré de façon sécurisée par Stripe. LexiStory ne stocke aucune donnée bancaire.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Droit de rétractation — Contenu numérique</h2>
          <p>Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation de 14 jours ne s&apos;applique pas aux contenus numériques fournis immédiatement après souscription.</p>
          <p>En souscrivant à l&apos;abonnement Premium, l&apos;utilisateur reconnaît expressément que <strong>l&apos;exécution du service commence immédiatement</strong> et renonce en conséquence à son droit de rétractation.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Propriété intellectuelle</h2>
          <p>Tout le contenu de LexiStory (histoires, définitions, design, système de gamification) est protégé par le droit d&apos;auteur. Toute reproduction est interdite sans accord préalable.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Responsabilité</h2>
          <p>LexiStory est un service éducatif fourni &quot;tel quel&quot;. Nous ne pouvons garantir une disponibilité permanente du service. En cas d&apos;interruption prolongée, les abonnés Premium seront remboursés au prorata.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Contact</h2>
          <p>Pour toute question : <a href="/support">page Support</a> ou e.boiteau1706@gmail.com</p>
        </section>

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
