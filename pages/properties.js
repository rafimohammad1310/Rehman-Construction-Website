import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import styles from "../styles/Properties.module.css";
import TopBar from "../components/TopBar"; 
export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    type: "All",
    configuration: "All",
    location: "All Hyderabad",
    budget: "All",
    possession: "All",
  });

  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, "properties"));
      const propertiesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertiesList);
      setFilteredProperties(propertiesList);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = properties;

      if (filters.type !== "All") {
        filtered = filtered.filter((property) => property.type === filters.type);
      }
      if (filters.configuration !== "All") {
        filtered = filtered.filter(
          (property) => property.configuration === filters.configuration
        );
      }
      if (filters.location !== "All Hyderabad") {
        filtered = filtered.filter((property) => property.location === filters.location);
      }
      if (filters.budget !== "All") {
        const [min, max] = filters.budget.split(" to ").map((v) => parseInt(v.replace(/[^\d]/g, ""), 10));
        filtered = filtered.filter((property) => {
          const price = parseInt(property.price.replace(/[^\d]/g, ""), 10);
          return price >= min && (!max || price <= max);
        });
      }
      if (filters.possession !== "All") {
        filtered = filtered.filter((property) => property.possession === filters.possession);
      }

      setFilteredProperties(filtered);
    };

    applyFilters();
  }, [filters, properties]);

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? "" : filterName);
  };

  return (
    <div className={styles.properties}>
      <TopBar />
      <Navbar />
      <h1 className={styles.title}>Explore Our Properties</h1>
      <div className={styles.container}>
        <div className={styles.filters}>
          <div
            className={`${styles.filterItem} ${activeFilter === "type" ? styles.active : ""}`}
            onClick={() => toggleFilter("type")}
          >
            PROPERTY TYPE <span className={styles.arrow}>{activeFilter === "type" ? "▲" : "▼"}</span>
            {activeFilter === "type" && (
              <div className={styles.filterOptions}>
                <button onClick={() => handleFilterChange("type", "Residential Property")}>
                  Residential Property
                </button>
                <button onClick={() => handleFilterChange("type", "Commercial Property")}>
                  Commercial Property
                </button>
                <button onClick={() => handleFilterChange("type", "All")}>All</button>
              </div>
            )}
          </div>
          <div
            className={`${styles.filterItem} ${activeFilter === "configuration" ? styles.active : ""}`}
            onClick={() => toggleFilter("configuration")}
          >
            PROPERTY CONFIGURATION <span className={styles.arrow}>{activeFilter === "configuration" ? "▲" : "▼"}</span>
            {activeFilter === "configuration" && (
              <div className={styles.filterOptions}>
                <button onClick={() => handleFilterChange("configuration", "2 BHK")}>2 BHK</button>
                <button onClick={() => handleFilterChange("configuration", "3 BHK")}>3 BHK</button>
                <button onClick={() => handleFilterChange("configuration", "4 BHK")}>4 BHK</button>
                <button onClick={() => handleFilterChange("configuration", "Lease")}>Lease</button>
                <button onClick={() => handleFilterChange("configuration", "All")}>All</button>
              </div>
            )}
          </div>
          <div
            className={`${styles.filterItem} ${activeFilter === "location" ? styles.active : ""}`}
            onClick={() => toggleFilter("location")}
          >
            LOCATION <span className={styles.arrow}>{activeFilter === "location" ? "▲" : "▼"}</span>
            {activeFilter === "location" && (
              <div className={styles.filterOptions}>
                <button onClick={() => handleFilterChange("location", "Gachibowli")}>Gachibowli</button>
                <button onClick={() => handleFilterChange("location", "Kukatpally")}>Kukatpally</button>
                <button onClick={() => handleFilterChange("location", "Madhapur")}>Madhapur</button>
                <button onClick={() => handleFilterChange("location", "All Hyderabad")}>All Hyderabad</button>
              </div>
            )}
          </div>
          <div
            className={`${styles.filterItem} ${activeFilter === "budget" ? styles.active : ""}`}
            onClick={() => toggleFilter("budget")}
          >
            BUDGET <span className={styles.arrow}>{activeFilter === "budget" ?"▲" : "▼"}</span>
            {activeFilter === "budget" && (
              <div className={styles.filterOptions}>
                <button onClick={() => handleFilterChange("budget", "0 to 5000000")}>Up to ₹50 Lakhs</button>
                <button onClick={() => handleFilterChange("budget", "5000000 to 10000000")}>
                  ₹50 Lakhs to ₹1 Crore
                </button>
                <button onClick={() => handleFilterChange("budget", "10000000 to 20000000")}>
                  ₹1 Crore to ₹2 Crores
                </button>
                <button onClick={() => handleFilterChange("budget", "All")}>All</button>
              </div>
            )}
          </div>
          <div
            className={`${styles.filterItem} ${activeFilter === "possession" ? styles.active : ""}`}
            onClick={() => toggleFilter("possession")}
          >
            POSSESSION <span className={styles.arrow}>{activeFilter === "possession" ? "▲" : "▼"}</span>
            {activeFilter === "possession" && (
              <div className={styles.filterOptions}>
                <button onClick={() => handleFilterChange("possession", "Ready to Move")}>
                  Ready to Move
                </button>
                <button onClick={() => handleFilterChange("possession", "Under Construction")}>
                  Under Construction
                </button>
                <button onClick={() => handleFilterChange("possession", "All")}>All</button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.propertyCards}>
          {loading ? (
            <p className={styles.loading}>Loading properties...</p>
          ) : filteredProperties.length === 0 ? (
            <p>No properties match your criteria.</p>
          ) : (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
