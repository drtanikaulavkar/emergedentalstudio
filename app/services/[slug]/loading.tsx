import styles from "../services.module.css";

export default function ServiceLoading() {
  return (
    <main aria-busy="true">
      <section className={styles.serviceLoading} role="status" aria-live="polite">
        <div className={`container ${styles.serviceLoadingInner}`}>
          <div className={styles.serviceLoadingCopy}>
            <span className={styles.serviceLoadingEyebrow} aria-hidden="true" />
            <span className={styles.serviceLoadingLine} aria-hidden="true" />
            <span className={`${styles.serviceLoadingLine} ${styles.serviceLoadingLineShort}`} aria-hidden="true" />
            <span>Loading treatment details...</span>
          </div>
          <div className={styles.serviceLoadingImage} aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
