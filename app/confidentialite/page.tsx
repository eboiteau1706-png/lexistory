import styles from "../legal.module.css";

export const metadata = {
  title: "Politique de confidentialité — LexiStory",
};

export default function Confidentialite() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Politique de confidentialité</h1>
        <p className={styles.updated}>Dernière mise à jour : 18 mai 2026</p>

        <section className={styles.section}>
          <h2>Données collectées</h2>
          <p>LexiStory collecte uniquement :</p>
          <ul>
            <li>Votre <strong>adresse email</strong> lors de la création de compte</li>
            <li>Votre <strong>pseudo</strong> si vous choisissez d&apos;en créer un</li>
            <li>Les <strong>mots consultés</strong> et <strong>histoires lues</strong> pour afficher vos statistiques</li>
            <li>Les <strong>données de paiement</strong> gérées exclusivement par Stripe — nous n&apos;y avons pas accès</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Utilisation des données</h2>
          <p>Vos données sont utilisées uniquement pour :</p>
          <ul>
            <li>Gérer votre compte et votre connexion</li>
            <li>Afficher vos statistiques de progression</li>
            <li>Traiter votre abonnement Premium</li>
            <li>Vous envoyer des emails de connexion (magic link)</li>
          </ul>
          <p>Nous ne vendons jamais vos données à des tiers.</p>
        </section>

        <section className={styles.section}>
          <h2>Stockage des données</h2>
          <p>Vos données sont stockées de façon sécurisée via <strong>Supabase</strong>, sur des serveurs situés dans l&apos;Union européenne.</p>
          <p>Les paiements sont traités par <strong>Stripe</strong>, dont les serveurs sont situés aux États-Unis. Stripe est certifié PCI DSS niveau 1, le plus haut niveau de sécurité pour les paiements en ligne.</p>
        </section>

        <section className={styles.section}>
          <h2>Cookies</h2>
          <p>LexiStory utilise uniquement des cookies techniques nécessaires à votre connexion et à la sécurité du service. Aucun cookie publicitaire, de tracking ou d&apos;analyse comportementale n&apos;est utilisé.</p>
          <p>Stripe peut déposer des cookies techniques lors du processus de paiement, nécessaires à la sécurisation des transactions.</p>
        </section>

        <section className={styles.section}>
          <h2>Vos droits</h2>
          <p>Vous disposez des droits suivants sur vos données :</p>
          <ul>
            <li><strong>Droit d&apos;accès</strong> : connaître les données que nous détenons sur vous</li>
            <li><strong>Droit de rectification</strong> : corriger vos données</li>
            <li><strong>Droit à l&apos;effacement</strong> : supprimer votre compte et vos données</li>
            <li><strong>Droit à la portabilité</strong> : récupérer vos données</li>
          </ul>
          <p>Pour exercer ces droits : <strong>e.boiteau1706@gmail.com</strong></p>
        </section>

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
