import styles from "../legal.module.css";

export const metadata = {
  title: "CGU — LexiStory",
};

export default function CGU() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Conditions Générales d&apos;Utilisation</h1>
        <p className={styles.updated}>Dernière mise à jour : 29 mai 2026</p>

        <section className={styles.section}>
          <h2>1. Objet</h2>
          <p>Les présentes CGU définissent les conditions d&apos;utilisation du service LexiStory, accessible à l&apos;adresse <strong>lexistory.fr</strong>, édité par Enzo Boiteau, particulier domicilié à Osny, Val-d&apos;Oise, France.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Description du service</h2>
          <p>LexiStory est un service d&apos;apprentissage du français par la lecture et les quiz. Il propose :</p>
          <ul>
            <li>Des histoires culturelles quotidiennes à 3 niveaux (Curieux, Lecteur, Érudit)</li>
            <li>Un système de définitions de mots avec étymologie, généré par IA (API Claude d&apos;Anthropic)</li>
            <li>Des mini-jeux quotidiens (Mot du jour, Définition mystère, Anagramme, Citation)</li>
            <li>Un système de progression (XP, niveaux, séries quotidiennes)</li>
            <li>Un classement global et entre amis</li>
            <li>La possibilité de noter les histoires sur 5 étoiles</li>
            <li>Un avatar personnalisable parmi une sélection prédéfinie</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Accès au service</h2>
          <p>LexiStory propose deux niveaux d&apos;accès :</p>
          <ul>
            <li><strong>Gratuit :</strong> 1 histoire par jour, 3 définitions de mots par histoire par jour, statistiques de base, classement global, jeux quotidiens standards</li>
            <li><strong>Premium :</strong> définitions illimitées, accès à toutes les histoires passées, statistiques avancées, jeux exclusifs supplémentaires — <strong>1,99€ TTC / mois</strong></li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Compte utilisateur</h2>
          <p>Pour accéder aux fonctionnalités complètes (progression, classement, amis), vous devez créer un compte. Le pseudo choisi doit être unique, contenir uniquement des lettres, chiffres, tirets ou underscores (2 à 20 caractères), et respecter les droits des tiers.</p>
          <p>LexiStory se réserve le droit de supprimer tout pseudo inapproprié, offensant ou trompeur.</p>
          <p>L&apos;avatar est sélectionné parmi une liste prédéfinie de styles et seeds. Aucune image personnelle ne peut être téléversée.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Définitions par IA</h2>
          <p>LexiStory utilise l&apos;API Claude d&apos;Anthropic pour générer des définitions de mots. En mode gratuit, l&apos;accès aux définitions générées par IA est limité à 3 par histoire et par jour. Les définitions sont mises en cache dans notre base de données. L&apos;utilisateur reconnaît que ces définitions sont générées par un système d&apos;IA et peuvent contenir des inexactitudes.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Fonctionnalité Amis</h2>
          <p>La fonctionnalité amis vous permet d&apos;ajouter d&apos;autres utilisateurs, de voir leur progression et de vous comparer dans un classement privé. Les profils détaillés ne sont accessibles qu&apos;aux amis mutuellement acceptés.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Abonnement Premium</h2>
          <p>L&apos;abonnement Premium est proposé au prix de <strong>1,99€ TTC par mois</strong>.</p>
          <p>Il est renouvelé automatiquement chaque mois jusqu&apos;à résiliation par l&apos;utilisateur. La résiliation peut être effectuée à tout moment depuis votre profil LexiStory, sans frais ni préavis. L&apos;accès Premium reste actif jusqu&apos;à la fin de la période payée en cours.</p>
          <p>Le paiement est géré de façon sécurisée par Stripe. LexiStory ne stocke aucune donnée bancaire. Pour plus de détails, consultez la <a href="/abonnement">page dédiée à l&apos;abonnement</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Droit de rétractation — Contenu numérique</h2>
          <p>Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation de 14 jours ne s&apos;applique pas aux contenus numériques fournis immédiatement après souscription.</p>
          <p>En souscrivant à l&apos;abonnement Premium, l&apos;utilisateur reconnaît expressément que <strong>l&apos;exécution du service commence immédiatement</strong> et renonce en conséquence à son droit de rétractation.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Propriété intellectuelle</h2>
          <p>Tout le contenu de LexiStory (histoires, définitions, design, système de gamification) est protégé par le droit d&apos;auteur. Toute reproduction est interdite sans accord préalable écrit.</p>
        </section>

        <section className={styles.section}>
          <h2>10. Responsabilité</h2>
          <p>LexiStory est un service éducatif fourni &quot;tel quel&quot;. Nous ne pouvons garantir une disponibilité permanente du service. En cas d&apos;interruption prolongée non planifiée, les abonnés Premium seront remboursés au prorata.</p>
          <p>LexiStory n&apos;est pas responsable des inexactitudes éventuelles dans les définitions générées par IA.</p>
        </section>

        <section className={styles.section}>
          <h2>11. Contact</h2>
          <p>Pour toute question : <a href="/support">page Support</a> ou <a href="mailto:lexistory.fr@gmail.com">lexistory.fr@gmail.com</a></p>
        </section>

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
