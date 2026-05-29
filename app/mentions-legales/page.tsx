import styles from "../legal.module.css";

export const metadata = {
  title: "Mentions légales — LexiStory",
};

export default function MentionsLegales() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Mentions légales</h1>
        <p className={styles.updated}>Dernière mise à jour : 29 mai 2026</p>

        <section className={styles.section}>
          <h2>Éditeur du site</h2>
          <p>Le site LexiStory est édité par :</p>
          <ul>
            <li><strong>Nom :</strong> Enzo Boiteau</li>
            <li><strong>Statut :</strong> Particulier</li>
            <li><strong>Ville :</strong> Osny, Val-d&apos;Oise, France</li>
            <li><strong>Email :</strong> e.boiteau1706@gmail.com</li>
            <li><strong>Site :</strong> https://lexistory.fr</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Hébergement</h2>
          <ul>
            <li><strong>Hébergeur :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</li>
            <li><strong>Site :</strong> vercel.com</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Nom de domaine</h2>
          <ul>
            <li><strong>Registrar :</strong> OVHcloud</li>
            <li><strong>Domaine :</strong> lexistory.fr</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Base de données et authentification</h2>
          <p>Les données utilisateurs sont gérées par <strong>Supabase Inc.</strong>, 970 Toa Payoh North, Singapore. Infrastructure hébergée dans l&apos;Union européenne.</p>
        </section>

        <section className={styles.section}>
          <h2>Paiement</h2>
          <p>Les paiements sont traités par <strong>Stripe Inc.</strong>, 354 Oyster Point Blvd, South San Francisco, CA 94080, USA. LexiStory ne stocke aucune donnée bancaire.</p>
        </section>

        <section className={styles.section}>
          <h2>Intelligence artificielle</h2>
          <p>Les définitions de mots sont générées via l&apos;API Claude d&apos;<strong>Anthropic PBC</strong>, 548 Market St, PMB 90375, San Francisco, CA 94104, USA.</p>
        </section>

        <section className={styles.section}>
          <h2>Avatars</h2>
          <p>Les avatars affichés sur le site sont générés par <strong>DiceBear</strong> (dicebear.com), service d&apos;avatars SVG open-source. Aucune donnée personnelle n&apos;est transmise à DiceBear.</p>
        </section>

        <section className={styles.section}>
          <h2>Publicité</h2>
          <p>Le site utilise <strong>Google AdSense</strong> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) pour l&apos;affichage de publicités (en cours d&apos;approbation). Google peut utiliser des cookies à des fins publicitaires.</p>
        </section>

        <section className={styles.section}>
          <h2>Propriété intellectuelle</h2>
          <p>L&apos;ensemble du contenu de ce site (textes, histoires, design, code, système de gamification) est la propriété exclusive d&apos;Enzo Boiteau. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>Pour toute question : <a href="mailto:e.boiteau1706@gmail.com">e.boiteau1706@gmail.com</a></p>
        </section>

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
