import styles from "../legal.module.css";

export const metadata = {
  title: "Conditions Générales de Vente — LexiStory",
};

export default function CGV() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Conditions Générales de Vente</h1>
        <p className={styles.updated}>Dernière mise à jour : 20 mai 2026</p>

        <section className={styles.section}>
          <h2>1. Vendeur</h2>
          <ul>
            <li><strong>Nom :</strong> Enzo Boiteau</li>
            <li><strong>Statut :</strong> Particulier</li>
            <li><strong>Ville :</strong> Osny, Val-d&apos;Oise, France</li>
            <li><strong>Email :</strong> lexistory.fr@gmail.com</li>
            <li><strong>Site :</strong> https://lexistory.fr</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>2. Produit proposé</h2>
          <p>LexiStory propose un abonnement <strong>Premium</strong> donnant accès à des fonctionnalités supplémentaires sur le site lexistory.fr, notamment :</p>
          <ul>
            <li>Accès aux histoires passées</li>
            
            <li>Statistiques avancées (classement, record streak, assiduité)</li>
            <li>4 mini-jeux Premium exclusifs quotidiens</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Prix</h2>
          <p>L&apos;abonnement Premium est proposé au prix de <strong>1,99 € TTC par mois</strong>, sans engagement de durée minimale.</p>
          <p>Le paiement est effectué au moment de la souscription, puis automatiquement renouvelé chaque mois à la date anniversaire.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Paiement</h2>
          <p>Les paiements sont sécurisés et traités par <strong>Stripe Inc.</strong> LexiStory n&apos;a accès à aucune donnée bancaire. Les moyens de paiement acceptés sont ceux proposés par Stripe (carte bancaire, etc.).</p>
        </section>

        <section className={styles.section}>
          <h2>5. Résiliation</h2>
          <p>L&apos;abonnement peut être résilié à tout moment depuis votre profil via le bouton <strong>&ldquo;Gérer mon abonnement&rdquo;</strong>, accessible après connexion. La résiliation prend effet à la fin de la période en cours déjà payée — vous conservez l&apos;accès Premium jusqu&apos;à cette date.</p>
          <p>En cas de difficulté, contactez-nous à <a href="mailto:lexistory.fr@gmail.com">lexistory.fr@gmail.com</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Droit de rétractation</h2>
          <p>Conformément à l&apos;article L221-18 du Code de la consommation, vous disposez d&apos;un délai de <strong>14 jours</strong> à compter de la souscription pour exercer votre droit de rétractation, sans avoir à justifier de motifs.</p>
          <p>Pour exercer ce droit, envoyez un email à <a href="mailto:lexistory.fr@gmail.com">lexistory.fr@gmail.com</a> en indiquant votre adresse email et votre demande de remboursement. Le remboursement sera effectué dans les 14 jours suivant la demande.</p>
          <p><strong>Exception :</strong> Si vous avez expressément demandé l&apos;exécution immédiate du service et que vous avez commencé à utiliser les fonctionnalités Premium avant la fin du délai de 14 jours, le remboursement sera calculé au prorata du temps non consommé.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Disponibilité du service</h2>
          <p>LexiStory s&apos;efforce d&apos;assurer la disponibilité du service 24h/24 et 7j/7. Cependant, des interruptions ponctuelles peuvent survenir pour des raisons de maintenance ou techniques. Aucun remboursement ne sera effectué pour des interruptions de courte durée.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Données personnelles</h2>
          <p>Le traitement de vos données personnelles est décrit dans notre <a href="/confidentialite">Politique de confidentialité</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Droit applicable</h2>
          <p>Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux français seront compétents.</p>
          <p>Conformément à l&apos;ordonnance n°2015-1033 du 20 août 2015, vous pouvez recourir à un médiateur de la consommation. Pour tout litige non résolu, vous pouvez également utiliser la plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>10. Contact</h2>
          <p>Pour toute question relative à votre abonnement : <a href="mailto:lexistory.fr@gmail.com">lexistory.fr@gmail.com</a></p>
        </section>

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
