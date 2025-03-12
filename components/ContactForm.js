//ContactForm.js
import { useState } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Firebase Firestore methods
import styles from "../styles/ContactForm.module.css";
import Footer from "./Footer";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save the form submission to Firestore
      await addDoc(collection(db, "contactFormSubmissions"), {
        name,
        email,
        phone,
        message,
        timestamp: new Date(),
      });
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting message: ", error);
    }
  };

  return (
    <div className={styles.contactPageContainer}>
      <div className={styles.contactContainer}>
        {/* Contact Info Section */}
        <div className={styles.contactInfo}>
          <h2>Contact Information</h2>
          <p><strong>Address:</strong> 123, Rehman Constructions, Hyderabad, India</p>
          <p><strong>Email:</strong> info@rehmanconstructions.com</p>
          <p><strong>Phone:</strong> +91 123 456 7890</p>
          <h3>Visit Us</h3>
          <div className={styles.mapContainer}>
            {/* Embed Google Map */}
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244236.8589527637!2d78.39638281771603!3d17.3850440915081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb94fae1d79b01%3A0x4c21a9eaa9a71ffb!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1631574861127!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Section */}
        <form className={styles.contactform} onSubmit={handleSubmit}>
          <h2>Send Us A Message</h2>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
