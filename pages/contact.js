//contact.js
import ContactForm from "../components/ContactForm"; // Path to your ContactForm component
import Navbar from "../components/Navbar";  // Import Navbar
import "../styles/ContactForm.module.css"; // Import CSS

const ContactPage = () => (
  <div >
    <Navbar /> 
    <h1>Contact Us</h1>
    <ContactForm />
   
  </div>
);

export default ContactPage;
