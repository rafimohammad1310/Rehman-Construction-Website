import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/About.module.css";
import Link from 'next/link';
import ScheduleVisitPopup from "../components/ScheduleVisitPopup";
import TopBar from "../components/TopBar"; 
      
export default function About() {
  return (
    <div className={styles.container}>
      <TopBar />
      <Navbar />
      <section className={styles.aboutSection}>
        <div className={styles.aboutHeader}>
          <h1>About Us</h1>
          <p>
            Rehman Constructions has been shaping skylines and building homes since 2005. Our mission is to deliver top-quality
            properties that meet the dreams of every client, fostering trust and excellence at every step.
          </p>
        </div>
       
        <div className={styles.coreValues}>
          <h2>Our Core Values</h2>
          <div className={styles.zigzag}>
            <div className={styles.contentLeft}>
              <img src="/core-values.jpg" alt="Core Values" className={styles.image} />
            </div>
            <div className={styles.contentRight}>
              <ul>
                <li><strong>Integrity:</strong> Ethical practices and transparency in all dealings.</li>
                <li><strong>Quality:</strong> Commitment to high standards in construction and materials.</li>
                <li><strong>Innovation:</strong> Use of modern techniques and sustainable designs.</li>
                <li><strong>Customer-Centric Approach:</strong> Prioritizing client satisfaction.</li>
              </ul>
            </div>
          </div>
       

        <div className={styles.services}>
          <h2>Our Expertise</h2>
          <div className={styles.zigzag}>
            <div className={styles.contentRight}>
              <img src="/expertise.jpg" alt="Expertise" className={styles.image} />
            </div>
            <div className={styles.contentLeft}>
              <p>
                At Rehman Constructions, we specialize in delivering top-notch residential and commercial properties. From luxury villas to sustainable apartments, we ensure every project is crafted with precision and care. Additional services include renovations, interior design, and land development.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.achievements}>
          <h2>Our Achievements</h2>
          <div className={styles.zigzag}>
            <div className={styles.contentLeft}>
              <img src="/achievements.jpg" alt="Achievements" className={styles.image} />
            </div>
            <div className={styles.contentRight}>
              <p>
                - Completed over <strong>200+</strong> successful projects across Hyderabad. <br />
                - Winner of the ‘Best Residential Developer’ award in 2023. <br />
                - Partnered with leading architects and engineers to deliver cutting-edge designs.
              </p>
            </div>
          </div>
        </div>
         </div>
        <div className={styles.mission}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to build enduring relationships with our clients through high-quality, sustainable, and innovative real estate solutions. We are dedicated to turning visions into reality, providing exceptional value at every stage of the construction process.
          </p>
        </div>

        <div className={styles.futureVision}>
          <h2>Our Vision</h2>
          <p>
            Looking ahead, we aim to expand into new cities, introduce smart home technologies, and become a leader in sustainable construction.
          </p>
        </div>
        

        <div className={styles.cta}>
          <h2>Ready to Build Your Dream Property?</h2>
          <p>Contact us today to explore our offerings and start your journey with Rehman Constructions.</p>
          <Link href="/contact">
          <button className={styles.contactButton}>Get in Touch</button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
