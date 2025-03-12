import styles from "../styles/Footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Upper Footer Section */}
        <div className={styles.upperFooter}>
          {/* Quick Links */}
          <div className={styles.column}>
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/properties">Properties</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Residential Projects */}
          <div className={styles.column}>
            <h3>Residential Projects</h3>
            <ul>
              <li>
                <a href="/projects/residential-ongoing">Ongoing Projects</a>
              </li>
              <li>
                <a href="/projects/residential-upcoming">Upcoming Projects</a>
              </li>
              <li>
                <a href="/projects/residential-completed">Completed Projects</a>
              </li>
            </ul>
          </div>

          {/* Commercial Projects */}
          <div className={styles.column}>
            <h3>Commercial Projects</h3>
            <ul>
              <li>
                <a href="/projects/commercial-ongoing">Ongoing Projects</a>
              </li>
              <li>
                <a href="/projects/commercial-upcoming">Upcoming Projects</a>
              </li>
              <li>
                <a href="/projects/commercial-completed">Completed Projects</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.column}>
            <h3>Contact Info</h3>
            <p>123, Rehman Constructions, Hyderabad, India</p>
            <p>
              Email:{" "}
              <a href="mailto:sales@rehmanconstructions.com">
                sales@rehmanconstructions.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+911234567890">+91 123 456 7890</a>
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className={styles.socialMedia}>
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={30} />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={30} />
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={30} />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={30} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={30} />
              </a>
            </li>
          </ul>
        </div>

        {/* Logo and Statement */}
        <div className={styles.logoSection}>
          <img
            src="/Rehman-Constructions.png-1.png"
            alt="Rehman Constructions Logo"
            className={styles.logo}
          />
          <p>
            Building homes and communities with trust. Excellence since 1995.
            Crafting spaces where life thrives. Your dream home is our mission.
          </p>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className={styles.bottomFooter}>
        <p>&copy; 2025 Rehman Constructions. All Rights Reserved.</p>
        <p>
          <a href="/terms">Terms & Conditions</a> |{" "}
          <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}
