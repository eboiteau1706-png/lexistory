import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="/mentions-legales">Mentions légales</a>
        <a href="/confidentialite">Confidentialité</a>
        <a href="/cgu">CGU</a>
        <a href="mailto:e.boiteau1706@gmail.com">Contact</a>
      </div>
      <p className={styles.copy}>© 2026 LexiStory — Enzo Boiteau</p>
    </footer>
  );
}
