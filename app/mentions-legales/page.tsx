import styles from "../legal.module.css";

export const metadata = {
  title: "Mentions légales — LexiStory",
};

export default function MentionsLegales() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Mentions légales</h1>
        <p className={styles.updated}>Dernière mise à jour : 17 mai 2026</p>

        <section className={styles.section}>
          <h2>Éditeur du site</h2>
          <p>Le site LexiStory est édité par :</p>
          <ul>
            <li><strong>Nom :</strong> Enzo Boiteau</li>
            <li><strong>Statut :</strong> Particulier</li>
            <li><strong>Ville :</strong> Osny, Val-d&apos;Oise, France</li>
            <li><strong>Email :</strong> e.boiteau1706@gmail.com</li>
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
          <h2>Propriété intellectuelle</h2>
          <p>L&apos;ensemble du contenu de ce site (textes, histoires, design, code) est la propriété exclusive d&apos;Enzo Boiteau. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>Pour toute question : e.boiteau1706@gmail.com</p>
        </section>

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
