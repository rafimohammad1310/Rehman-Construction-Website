import { useEffect, useState } from "react";
import { db } from "../firebase"; // Adjust path if needed
import { doc, getDoc } from "firebase/firestore";

function PropertyList() {
  const [property, setProperty] = useState(null);

  // Fetch data from Firestore on component mount
  useEffect(() => {
    const fetchProperty = async () => {
      const propertyDoc = doc(db, "properties", "property1"); // Reference to the property1 document
      const docSnap = await getDoc(propertyDoc); // Fetch document

      if (docSnap.exists()) {
        setProperty(docSnap.data()); // Save document data to state
      } else {
        console.log("No such document!");
      }
    };

    fetchProperty(); // Call the function to fetch property data
  }, []);

  return (
    <div>
      {property ? (
        <div>
          <h2>{property.name}</h2>
          <p>Price: {property.price}</p>
          <p>Location: {property.location}</p>
          <p>Description: {property.description}</p>
          <img src={property.imageUrl} alt={property.name} width={300} />
        </div>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  );
}

export default PropertyList;
