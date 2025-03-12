import { useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import the Firestore instance
import styles from "../styles/AddProperty.module.css"; // Import the CSS module

const AddProperty = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAddProperty = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !location) {
      setError("All fields are required.");
      return;
    }

    try {
      const propertyRef = collection(db, "properties");
      await addDoc(propertyRef, {
        name,
        description,
        price,
        location,
        image: image ? image.name : null, // Save image name if image is selected
      });
      setError("");
      router.push("/AdminDashboard"); // Redirect to dashboard after adding property
    } catch (error) {
      console.error("Error adding property: ", error);
      setError("Failed to add property. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Property</h2>
      <form onSubmit={handleAddProperty} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter property name"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter property description"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Upload Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>

        <button type="submit" className={styles.submitButton}>
          Add Property
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default AddProperty;
