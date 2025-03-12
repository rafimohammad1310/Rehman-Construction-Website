//PropertyCard.js
import Link from "next/link";
import Image from 'next/image';
import styles from "../styles/PropertyCard.module.css"; // Import the CSS Module

export default function PropertyCard({ property }) {
  return (
    <div className={styles["property-card"]}>
      <div className={styles["property-image"]}>
        <Image
          src={property.imageUrl}
          alt={property.name}
          width={500}
          height={300}
          layout="responsive"
        />
      </div>

      <div className={styles["property-content"]}>
        <h2>{property.name}</h2>
        <p>{property.location}</p>
        <p className={styles["property-price"]}>{property.price}</p>
        <div className={styles["property-highlights"]}>
          <span><strong>TS RERA Reg No.:</strong> {property.reraNumber}</span>
          <span><strong>Project Status:</strong> {property.status}</span>
          <span><strong>Project Highlights:</strong> {property.highlights}</span>
        </div>
        <Link href={`/property/${property.id}`} passHref>
          <button className={styles["property-btn"]}>View Details</button>
        </Link>
      </div>
    </div>
  );
}
