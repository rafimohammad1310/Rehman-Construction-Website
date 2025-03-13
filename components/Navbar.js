import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/rehman-logo.png" alt="Rehman Constructions Logo" />
        
      </div>

      <div className={styles.navToggle} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/properties">Properties</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default Navbar;
