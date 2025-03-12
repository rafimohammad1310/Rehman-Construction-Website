//property[id].js
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../styles/HomePage.module.css";
import Image from 'next/image';
export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      const docRef = doc(db, "properties", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProperty(docSnap.data());
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="property-detail">
        <h1>{property.name}</h1>
        <Image
        src={property.imageUrl}
        alt={property.name}
        width={800}
        height={600}
      />
        <p>{property.price}</p>
        <p>{property.location}</p>
        <p>{property.description}</p>
      </div>
      <Footer />
    </div>
  );
}
