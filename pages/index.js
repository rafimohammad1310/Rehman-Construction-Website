import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar"; 
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import styles from "../styles/HomePage.module.css";
import Link from "next/link";
import Slider from "react-slick"; // Import React Slick for Carousel
import ScheduleVisitPopup from "../components/ScheduleVisitPopup";
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} ${styles.prevArrow}`}
    style={{ ...style }}
    onClick={onClick}
  >
    &#10094; {/* Unicode for left arrow */}
  </div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} ${styles.nextArrow}`}
    style={{ ...style }}
    onClick={onClick}
  >
    &#10095; {/* Unicode for right arrow */}
  </div>
);

function SlideImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      {!loaded && <div className={styles.placeholder}>Loading...</div>}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "" : styles.hidden}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, "properties"));
      const propertiesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertiesList);
    };

    fetchProperties();
    const timer = setTimeout(() => {
      setShowPopup(true); // Show the popup after 20 seconds
    }, 10000); // 20 seconds = 20000 milliseconds

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timer);
  }, []);
  

  const handleContactClick = () => {
    setShowContactForm(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };
  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: "ondemand",
    prevArrow: <PrevArrow />, // Add custom previous arrow
    nextArrow: <NextArrow />, // Add custom next arrow
   
  };
  

  return (
    <div className={styles.home}>
      
      <TopBar />
      <Navbar />
      
      {/* Hero Section with Image Carousel */}
      <section className={styles.hero}>
  <div className={styles.heroContainer}>
    <Slider {...settings}>
      <SlideImage src="/hero1.webp" alt="Hero Image 1" className={styles.heroImage} />
      <SlideImage src="/hero2.webp" alt="Hero Image 2" className={styles.heroImage} />
      <SlideImage src="/hero3.webp" alt="Hero Image 3" className={styles.heroImage} />
    </Slider>
  </div>
  <div className={styles.heroContent}>
    <h1>Welcome to Rehman Constructions</h1>
    <p>Your Dream Property Awaits!</p>
    <Link href="/properties">
      <button>Explore Properties</button>
    </Link>
  </div>
</section>
{showPopup && <ScheduleVisitPopup onClose={handleClosePopup} />}

      {/* About Us Section */}
      <section className={styles.aboutUs}>
        <div className={styles.imageContainer}>
          <img src="/about-us.jpg" alt="About Us" />
        </div>
        <div className={styles.content}>
          <h2>About Us</h2>
          <p>
            Rehman Constructions has been a leading name in real estate, offering quality properties at prime locations.
            With years of experience and a commitment to excellence, we provide properties that offer value, comfort, and
            investment potential. Our track record speaks for itself.
          </p>
          <Link href="/about">
            <button>Know More</button>
          </Link>
        </div>
      </section>
      

      {/* WHY Us? Section */}
      <section className={styles.whyUs}>
        <h2>WHY Us?</h2>
        <p>
          Discover why Rehman Constructions stands out in the real estate market. Choose us for quality, trust, and excellence.
        </p>
        <div className={styles.whyUsPoints}>
          <div className={styles.point}>
            <h3>Expertise</h3>
            <p>Over a decade of experience in real estate development.</p>
          </div>
          <div className={styles.point}>
            <h3>Transparency</h3>
            <p>Clear processes with no hidden charges.</p>
          </div>
          <div className={styles.point}>
            <h3>Prime Locations</h3>
            <p>Properties in highly sought-after areas.</p>
          </div>
          <div className={styles.point}>
            <h3>Quality Assurance</h3>
            <p>Top-notch construction with premium materials.</p>
          </div>
        </div>
      </section>

      <section className={styles.featuredProperties}>
        <h2>Featured Properties</h2>
        <div className={styles.propertyList}>
          {properties.slice(0, 4).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {showContactForm ? (
        <section className={styles.contact}>
          <h2>Contact Us</h2>
          <ContactForm />
        </section>
      ) : null}

      <section className={styles.search}>
        <h2>Find Your Dream Home</h2>
        <div className={styles.searchForm}>
          <input type="text" placeholder="Search by location, price, etc." />
          <button>Search</button>
        </div>
      </section>

      <Footer className={styles.footer} />
    </div>
  );
}
