//PropertyList.js
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PropertyCard from "./PropertyCard";
import "../styles/PropertyCard.css";


export default function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, "properties"));
      setProperties(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProperties();
  }, []);

  return (
    <div className="property-list">
      {properties.length > 0 ? (
        properties.map(property => <PropertyCard key={property.id} property={property} />)
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
}
