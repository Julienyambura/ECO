import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <Link href="/" className={styles.footerLogo}>
              <div className={styles.logoIcon}>
                <Image
                  src="/recycle-icon.svg"
                  alt="ECO GLASS Logo"
                  width={24}
                  height={24}
                />
              </div>
              <span className={styles.logoText}>ECO GLASS</span>
            </Link>
            <p className={styles.footerText}>
              Helping communities recycle glass efficiently and responsibly for
              a greener future.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/" className={styles.footerLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/locations" className={styles.footerLink}>
                  Find Locations
                </Link>
              </li>
              <li>
                <Link href="/guide" className={styles.footerLink}>
                  Recycling Guide
                </Link>
              </li>
              <li>
                <Link href="/stats" className={styles.footerLink}>
                  Impact Stats
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Resources</h3>
            <ul className={styles.footerLinks}>
              
            </ul>
          </div> */}

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Connect</h3>
            <ul className={styles.footerLinks}>
             
             
              <li>
                <a href="#" className={styles.footerLink}>
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} ECO GLASS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
