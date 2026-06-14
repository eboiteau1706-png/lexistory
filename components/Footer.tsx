import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <a href="https://www.instagram.com/lexistory.fr" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@lexistory.fr" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.19a8.18 8.18 0 0 0 4.77 1.52V6.27a4.85 4.85 0 0 1-1-.58z"/>
          </svg>
        </a>
        <span className={styles.socialHandle}>@lexistory.fr</span>
      </div>
      <div className={styles.links}>
        <a href="/a-propos">À propos</a>
        <a href="/blog">Blog</a>
        <a href="/support">Support</a>
        <a href="/mentions-legales">Mentions légales</a>
        <a href="/confidentialite">Confidentialité</a>
        <a href="/cgu">CGU</a>
        <a href="/cgv">CGV</a>
        <a href="mailto:lexistory.fr@gmail.com">Contact</a>
      </div>
      <p className={styles.copy}>© 2026 LexiStory — Enzo Boiteau</p>
    </footer>
  );
}
