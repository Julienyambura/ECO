import styles from "./guide.module.css";

export default function GuidePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Glass Recycling Guide</h1>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Recycle Glass?</h2>
          <div className={styles.card}>
            <p className={styles.paragraph}>
              Glass is 100% recyclable and can be recycled endlessly without
              loss in quality or purity. Recycling glass has numerous
              environmental benefits:
            </p>
            <ul className={styles.list}>
              <li>Reduces consumption of raw materials</li>
              <li>Reduces energy consumption by up to 30%</li>
              <li>Reduces CO2 emissions</li>
              <li>Extends the life of landfills</li>
              <li>
                Creates jobs in the recycling and manufacturing industries
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What Glass Can Be Recycled?</h2>

          <div className={styles.cardGrid}>
            <div className={`${styles.card} ${styles.acceptableCard}`}>
              <h3 className={styles.cardTitle}>
                <span className={styles.checkIcon}>✓</span>
                Acceptable Glass
              </h3>
              <ul className={styles.checkList}>
                <li>Food jars (pasta sauce, pickles, etc.)</li>
                <li>Beverage bottles (wine, beer, soda, juice)</li>
                <li>Glass food containers</li>
                <li>Clear, green, and brown glass</li>
              </ul>
            </div>

            <div className={`${styles.card} ${styles.nonRecyclableCard}`}>
              <h3 className={styles.cardTitle}>
                <span className={styles.xIcon}>✕</span>
                Non-Recyclable Glass
              </h3>
              <ul className={styles.xList}>
                <li>Window glass or mirrors</li>
                <li>Ceramics, pottery, or porcelain</li>
                <li>Light bulbs</li>
                <li>Heat-resistant glass (Pyrex)</li>
                <li>Crystal glass</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            How to Prepare Glass for Recycling
          </h2>
          <div className={styles.card}>
            <ol className={styles.numberedList}>
              <li>
                <strong>Empty and rinse</strong> - Remove all contents and rinse
                the container with water.
              </li>
              <li>
                <strong>Remove lids and caps</strong> - Metal lids can often be
                recycled separately.
              </li>
              <li>
                <strong>Remove non-glass items</strong> - Take off any plastic
                or paper labels if possible.
              </li>
              <li>
                <strong>Sort by color</strong> - Some recycling centers require
                glass to be sorted by color (clear, green, brown).
              </li>
              <li>
                <strong>Donot break the glass</strong> - Keep glass containers
                intact for easier handling and sorting.
              </li>
            </ol>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Glass Recycling Process</h2>
          <div className={styles.card}>
            <ol className={styles.numberedList}>
              <li>
                <strong>Collection</strong> - Glass is collected from recycling
                bins and drop-off points.
              </li>
              <li>
                <strong>Sorting</strong> - Glass is sorted by color and
                contaminants are removed.
              </li>
              <li>
                <strong>Crushing</strong> - Glass is crushed into small pieces
                called cullet.
              </li>
              <li>
                <strong>Cleaning</strong> - Cullet is cleaned to remove any
                remaining impurities.
              </li>
              <li>
                <strong>Melting</strong> - Clean cullet is melted in a furnace
                at about 1500°C (2700°F).
              </li>
              <li>
                <strong>Molding</strong> - Molten glass is molded into new
                containers or products.
              </li>
              <li>
                <strong>Cooling</strong> - New glass products are cooled and
                prepared for distribution.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
