import styles from "../legal.module.css";

export const metadata = {
  title: "Abonnement Premium — LexiStory",
};

export default function Abonnement() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Abonnement Premium</h1>
        <p className={styles.updated}>Dernière mise à jour : 29 mai 2026</p>

        <section className={styles.section}>
          <h2>Prix et facturation</h2>
          <p>L&apos;abonnement LexiStory Premium est proposé au prix de <strong>1,99€ TTC par mois</strong>.</p>
          <p>Le paiement est prélevé chaque mois à la date de souscription, de façon automatique, via Stripe. Le premier prélèvement a lieu immédiatement à la souscription.</p>
        </section>

        <section className={styles.section}>
          <h2>Ce qui est inclus dans le Premium</h2>
          <ul>
            <li>✅ <strong>Définitions illimitées</strong> — plus de limite de 3 définitions par histoire par jour</li>
            <li>✅ <strong>Histoires passées</strong> — accès à toutes les histoires publiées depuis le lancement</li>
            <li>✅ <strong>Boost XP ×1,5</strong> — +4 XP par histoire lue au lieu de 3</li>
            <li>✅ <strong>Statistiques avancées</strong> — rang, record de série, assiduité</li>
            <li>✅ <strong>Jeux exclusifs</strong> — 4 mini-jeux supplémentaires par jour (+12 XP)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Renouvellement automatique</h2>
          <p>L&apos;abonnement est renouvelé automatiquement chaque mois. Vous recevez une confirmation de paiement par email à chaque renouvellement.</p>
          <p>Aucun engagement de durée minimum — vous pouvez annuler à tout moment.</p>
        </section>

        <section className={styles.section}>
          <h2>Résiliation</h2>
          <p>Vous pouvez résilier votre abonnement à tout moment, sans préavis et sans frais, directement depuis votre profil LexiStory (section &quot;Mon abonnement&quot;).</p>
          <p>Après résiliation :</p>
          <ul>
            <li>L&apos;accès Premium reste actif jusqu&apos;à la fin de la période déjà payée</li>
            <li>Aucun nouveau prélèvement n&apos;est effectué</li>
            <li>Votre compte et vos données (progression, XP, mots appris) sont conservés</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Politique de remboursement</h2>
          <p>Conformément à l&apos;article L221-28 du Code de la consommation, <strong>aucun remboursement n&apos;est accordé</strong> pour une période déjà débitée.</p>
          <p>En souscrivant, vous reconnaissez que l&apos;exécution du service commence immédiatement et renoncez à votre droit de rétractation de 14 jours.</p>
          <p>En cas d&apos;interruption prolongée et non planifiée du service (plus de 72h), les abonnés actifs seront remboursés au prorata de la période d&apos;indisponibilité.</p>
        </section>

        <section className={styles.section}>
          <h2>Paiement sécurisé</h2>
          <p>Les paiements sont traités par <strong>Stripe</strong>, certifié PCI DSS niveau 1. LexiStory ne stocke ni ne voit vos données bancaires.</p>
          <p>Moyens de paiement acceptés : carte bancaire (Visa, Mastercard, American Express).</p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>Pour toute question relative à votre abonnement : <a href="mailto:lexistory.fr@gmail.com">lexistory.fr@gmail.com</a></p>
          <p>Réponse sous 48h ouvrées.</p>
        </section>

        <div style={{ display: "flex", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
          <a href="/cgu" className={styles.back}>← CGU</a>
          <a href="/confidentialite" className={styles.back}>Politique de confidentialité →</a>
        </div>
      </div>
    </div>
  );
}
