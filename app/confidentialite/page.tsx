import styles from "../legal.module.css";

export const metadata = {
  title: "Politique de confidentialité — LexiStory",
};

export default function Confidentialite() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Politique de confidentialité</h1>
        <p className={styles.updated}>Dernière mise à jour : 29 mai 2026</p>

        <section className={styles.section}>
          <h2>Données collectées</h2>
          <p>LexiStory collecte uniquement :</p>
          <ul>
            <li>Votre <strong>adresse email</strong> lors de la création de compte</li>
            <li>Votre <strong>pseudo</strong> si vous choisissez d&apos;en créer un</li>
            <li>Votre <strong>avatar</strong> si vous en sélectionnez un (identifiant de style stocké, aucune image personnelle)</li>
            <li>Les <strong>mots consultés</strong> et <strong>histoires lues</strong> pour afficher vos statistiques</li>
            <li>Votre <strong>XP, niveau et série quotidienne</strong> pour le système de progression et le classement</li>
            <li>Vos <strong>favoris</strong> (mots mis en favori) et <strong>notes d&apos;histoires</strong></li>
            <li>Vos <strong>relations d&apos;amitié</strong> si vous utilisez la fonctionnalité amis</li>
            <li>Les <strong>données de paiement</strong> gérées exclusivement par Stripe — nous n&apos;y avons pas accès</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Utilisation des données</h2>
          <p>Vos données sont utilisées uniquement pour :</p>
          <ul>
            <li>Gérer votre compte et votre connexion</li>
            <li>Afficher vos statistiques de progression et votre niveau</li>
            <li>Alimenter le classement global et le classement entre amis</li>
            <li>Traiter votre abonnement Premium</li>
            <li>Vous envoyer des emails de connexion (magic link)</li>
            <li>Générer des définitions de mots via l&apos;API Claude (Anthropic) — le mot sélectionné est transmis à l&apos;API Anthropic pour obtenir une définition</li>
          </ul>
          <p>Nous ne vendons jamais vos données à des tiers.</p>
        </section>

        <section className={styles.section}>
          <h2>Intelligence artificielle — API Claude (Anthropic)</h2>
          <p>Lorsque vous cliquez sur un mot pour en obtenir la définition, le mot sélectionné est transmis à l&apos;API Claude d&apos;Anthropic. Aucune donnée personnelle (email, pseudo, identifiant) n&apos;est transmise à Anthropic. Seul le texte du mot ou groupe de mots est envoyé. Les définitions générées sont ensuite mises en cache dans notre base de données Supabase.</p>
          <p>Pour en savoir plus sur la politique d&apos;Anthropic : <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">anthropic.com/privacy</a></p>
        </section>

        <section className={styles.section}>
          <h2>Données publiques</h2>
          <p>Si vous choisissez un pseudo, celui-ci ainsi que votre niveau, votre XP et votre avatar apparaissent dans le classement public. Vos statistiques détaillées (mots appris, histoires lues) ne sont visibles que par vos amis acceptés. Les notes que vous attribuez aux histoires sont agrégées (moyenne) et ne sont pas nominatives.</p>
        </section>

        <section className={styles.section}>
          <h2>Stockage des données</h2>
          <p>Vos données sont stockées de façon sécurisée via <strong>Supabase</strong> (Supabase Inc., 970 Toa Payoh North, Singapore), sur des serveurs situés dans l&apos;Union européenne. Supabase est conforme au RGPD.</p>
          <p>Les paiements sont traités par <strong>Stripe</strong> (Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, USA), certifié PCI DSS niveau 1, le plus haut niveau de sécurité pour les paiements en ligne.</p>
        </section>

        <section className={styles.section} id="cookies">
          <h2>Cookies</h2>
          <p>LexiStory utilise les cookies suivants :</p>
          <ul>
            <li><strong>Cookies techniques Supabase</strong> (nécessaires) : gestion de votre session de connexion et sécurité du service</li>
            <li><strong>Cookies Stripe</strong> (fonctionnels) : nécessaires à la sécurisation des transactions de paiement</li>
            <li><strong>Google AdSense</strong> (publicitaires, en cours d&apos;approbation) : si activé, Google peut déposer des cookies pour la personnalisation des publicités. Vous pouvez refuser via la bannière cookies du site.</li>
          </ul>
          <p>Vous pouvez gérer votre consentement cookies via la bannière affichée en bas de page. Le refus des cookies publicitaires n&apos;affecte pas le fonctionnement du service.</p>
        </section>

        <section className={styles.section}>
          <h2>Vos droits (RGPD)</h2>
          <p>Vous disposez des droits suivants sur vos données :</p>
          <ul>
            <li><strong>Droit d&apos;accès</strong> : connaître les données que nous détenons sur vous</li>
            <li><strong>Droit de rectification</strong> : corriger vos données (pseudo modifiable depuis votre profil)</li>
            <li><strong>Droit à l&apos;effacement</strong> : supprimer votre compte et toutes vos données (disponible depuis votre profil)</li>
            <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format lisible</li>
            <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
          </ul>
          <p>Pour exercer ces droits : <a href="mailto:lexistory.fr@gmail.com">lexistory.fr@gmail.com</a></p>
        </section>

        <section className={styles.section}>
          <h2>Durée de conservation</h2>
          <p>Vos données sont conservées aussi longtemps que votre compte est actif. En cas de suppression du compte, toutes vos données sont définitivement effacées dans un délai de 30 jours.</p>
        </section>

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
