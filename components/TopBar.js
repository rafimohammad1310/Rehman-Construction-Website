//TopBar.js
import styles from "../styles/TopBar.module.css";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function TopBar() {
  return (
    
    <div className={styles.topBar}>
       
      <div className={styles.contactInfo}>
        <span>
          <FaPhone /> +91-12345-67890
        </span>
        <span>
          <FaEnvelope /> info@rehmanconstructions.com
        </span>
      </div>
      <div className={styles.socialMedia}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}
