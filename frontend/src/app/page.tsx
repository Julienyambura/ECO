import Link from "next/link"
import Image from "next/image"
import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.iconWrapper}>
              <Image src="/recycle-icon.svg" alt="Recycle Icon" width={32} height={32} />
            </div>
            <h1 className={styles.heroTitle}>ECO GLASS</h1>
            <p className={styles.heroText}>
              Find glass recycling locations near you and learn how your recycling efforts make a difference.
            </p>
            <div className={styles.buttonGroup}>
              <Link href="/locations" className={`${styles.button} ${styles.primaryButton}`}>
                Find Recycling Locations
                <span className={styles.arrowIcon}>→</span>
              </Link>
              <Link href="/guide" className={`${styles.button} ${styles.secondaryButton}`}>
                Recycling Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How ECO GLASS Helps You Recycle</h2>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Image src="/map-pin.svg" alt="Location Icon" width={24} height={24} />
              </div>
              <h3 className={styles.featureTitle}>Location Finder</h3>
              <p className={styles.featureText}>
                Easily find the nearest glass recycling drop-off points with our interactive directory.
              </p>
              <Link href="/locations" className={styles.featureLink}>
                Find Locations
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Image src="/recycle-icon.svg" alt="Recycle Icon" width={24} height={24} />
              </div>
              <h3 className={styles.featureTitle}>Recycling Guide</h3>
              <p className={styles.featureText}>
                Learn what types of glass can be recycled and how to prepare them properly.
              </p>
              <Link href="/guide" className={styles.featureLink}>
                View Guide
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Image src="/book-icon.svg" alt="Book Icon" width={24} height={24} />
              </div>
              <h3 className={styles.featureTitle}>Educational Resources</h3>
              <p className={styles.featureText}>
                Discover the environmental impact of glass recycling and stay updated on initiatives.
              </p>
              <Link href="/stats" className={styles.featureLink}>
                View Impact Stats
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Start Recycling?</h2>
          <p className={styles.ctaText}>
            Join thousands of eco-conscious individuals making a difference one glass bottle at a time.
          </p>
          <Link href="/locations" className={`${styles.button} ${styles.primaryButton}`}>
            Find Recycling Locations Near Me
          </Link>
        </div>
      </section>
    </main>
  )
}

