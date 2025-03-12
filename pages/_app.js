// pages/_app.js
//import "../styles/HomePage.css";    // Global styles
//import "../styles/ContactForm.css"; // Global styles
//import "../styles/Footer.css";      // Global styles
//import "../styles/Navbar.css";      // Global styles
//import "../styles/AdminDashboard.css"; // Global styles
//import '../styles/PropertyCard.css'; 
import '../styles/globals.css'; 

// Import the necessary libraries and components
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Any global JS can go here (if needed)
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
