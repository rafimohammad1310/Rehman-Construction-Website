import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, deleteDoc, getDocs, collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import the Firestore instance
import styles from "../styles/AdminDashboard.module.css"; // Import the CSS module
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { format } from "date-fns";
const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [properties, setProperties] = useState([]);
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addPropertyFormVisible, setAddPropertyFormVisible] = useState(false); // Add Property form visibility
  const [viewProperties, setViewProperties] = useState(false); // View Properties list visibility
  const [viewAnalytics, setViewAnalytics] = useState(false); // Analytics Dashboard visibility
  const [viewFormSubmissions, setViewFormSubmissions] = useState(false); // View Form Submissions visibility
  const [newPropertyData, setNewPropertyData] = useState({
    name: '',
    description: '',
    price: '',
    location: ''
  });
  const [timeFilter, setTimeFilter] = useState('today');
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin-login"); // Redirect to login if not authenticated
      } else {
        setAdmin(user);
      }
    });

    return () => unsubscribe();
  }, [router]);
  
  // Fetch properties from Firestore
  const fetchProperties = async () => {
    const propertiesSnapshot = await getDocs(collection(db, "properties"));
    const propertiesList = propertiesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setProperties(propertiesList);
    setLoading(false);
  };

  // Fetch form submissions from Firestore
  const fetchFormSubmissions = async () => {
    try {
      const submissionsSnapshot = await getDocs(collection(db, "contactFormSubmissions"));
      const submissionsList = submissionsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setFormSubmissions(submissionsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching form submissions: ", error);
    }
  };

  useEffect(() => {
    if (viewFormSubmissions) {
      fetchFormSubmissions();
    }
  }, [viewFormSubmissions,timeFilter]);

  // Fetch properties when the dashboard loads
  useEffect(() => {
    fetchProperties();
  }, [admin]);

  // Add Property button click handler
  const handleAddPropertyClick = () => {
    setAddPropertyFormVisible(true);
    setViewProperties(false);
    setViewAnalytics(false);
    setViewFormSubmissions(false);
  };

  const handleViewPropertiesClick = () => {
    setAddPropertyFormVisible(false);
    setViewProperties(true);
    setViewAnalytics(false);
    setViewFormSubmissions(false);
  };

  const handleViewAnalyticsClick = () => {
    setAddPropertyFormVisible(false);
    setViewProperties(false);
    setViewAnalytics(true);
    setViewFormSubmissions(false);
  };

  const handleViewFormSubmissionsClick = () => {
    setAddPropertyFormVisible(false);
    setViewProperties(false);
    setViewAnalytics(false);
    setViewFormSubmissions(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPropertyData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewPropertyData((prevState) => ({
        ...prevState,
        image: imageURL
      }));
    }
  };

  const uploadImageToFirebase = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `property_images/${file.name}`);
    
    // Upload the image
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the image URL after the upload
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();

    // Check if an image file is selected
    const file = e.target.elements.image.files[0];
    if (file) {
      try {
        const imageURL = await uploadImageToFirebase(file); // Upload the image
        const propertyData = {
          ...newPropertyData,
          image: imageURL // Add image URL to property data
        };
  
        // Save property data with image URL to Firestore
        await addDoc(collection(db, "properties"), propertyData);
        
        setNewPropertyData({
          name: '',
          description: '',
          price: '',
          location: '',
          image: ''
        });
        
        fetchProperties(); // Refresh properties list
        setAddPropertyFormVisible(false); // Hide the form after submission
      } catch (error) {
        console.error("Error adding property: ", error);
      }
    } else {
      console.error("No image selected");
    }
  };

  // Logout functionality
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push("/admin-login"); // Redirect to login page after logout
  };

  // Mark form submission as contacted
  const handleMarkAsContacted = async (submissionId) => {
    try {
      const submissionRef = doc(db, "contactFormSubmissions", submissionId);
      await updateDoc(submissionRef, {
        contactedBack: true
      });
      fetchFormSubmissions(); // Refresh form submissions list
    } catch (error) {
      console.error("Error marking form as contacted: ", error);
    }
  };
  const filterFormSubmissions = (submissions, filter) => {
    const today = new Date();
    return submissions.filter(submission => {
      const submissionDate = new Date(submission.timestamp.seconds * 1000); // Convert Firestore timestamp to Date
      const diffTime = today - submissionDate;
      const diffDays = diffTime / (1000 * 3600 * 24); // Convert difference to days
  
      switch (filter) {
        case 'today':
          return diffDays < 1; // Less than 1 day ago (i.e., today)
        case 'yesterday':
          return diffDays >= 1 && diffDays < 2; // Between 1 and 2 days ago (i.e., yesterday)
        case 'week':
          return diffDays < 7; // Less than 7 days ago (i.e., within the past week)
        case 'month':
          return diffDays < 30; // Less than 30 days ago (i.e., within the past month)
        default:
          return true; // No filter, show all
      }
    });
  };
  
  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.dashboardContainer}>
      <h2>Welcome, {admin.email}</h2>
      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>

      <div className={styles.buttonGroup}>
        <button className={styles.addButton} onClick={handleAddPropertyClick}>
          Add New Property
        </button>
        <button className={styles.addButton} onClick={handleViewPropertiesClick}>
          View Properties
        </button>
        <button className={styles.addButton} onClick={handleViewAnalyticsClick}>
          Analytics Dashboard
        </button>
        <button className={styles.addButton} onClick={handleViewFormSubmissionsClick}>
          View Form Submissions
        </button>
      </div>

      {/* Property Add Form (appears when Add New Property is clicked) */}
      {addPropertyFormVisible && (
        <div className={styles.addPropertyForm}>
          <h3>Add New Property</h3>
          <form onSubmit={handleAddProperty}>
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={newPropertyData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Description</label>
              <textarea
                name="description"
                value={newPropertyData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={newPropertyData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={newPropertyData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Image Upload */}
            <div className={styles.inputGroup}>
              <label>Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
              {newPropertyData.image && (
                <img
                  src={newPropertyData.image}
                  alt="Image Preview"
                  className={styles.previewImage}
                />
              )}
            </div>
            <button type="submit" className={styles.submitButton}>Add Property</button>
          </form>
        </div>
      )}
  {/* Filter for Form Submissions */}
  {viewFormSubmissions && (
  <div className={styles.timeFilter}>
    <label>Filter by:</label>
    <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
      <option value="today">Today</option>
      <option value="yesterday">Yesterday</option>
      <option value="week">This Week</option>
      <option value="month">This Month</option>
    </select>
  </div>
)}

      {/* View Form Submissions */}
      {viewFormSubmissions && (
        <div className={styles.formSubmissions}>
          <h3>Form Submissions</h3>
          {formSubmissions.length > 0 ? (
            formSubmissions.map((submission) => (
              <div key={submission.id} className={styles.submissionCard}>
                <p><strong>Name:</strong> {submission.name}</p>
                <p><strong>Email:</strong> {submission.email}</p>
                <p><strong>Phone:</strong> {submission.phone}</p>
                <p><strong>Message:</strong> {submission.message}</p>
                <p><strong>Date:</strong> {new Date(submission.timestamp.seconds * 1000).toLocaleString()}</p>
                <div>
                  <button
                    className={styles.contactButton}
                    onClick={() => handleMarkAsContacted(submission.id)}
                  >
                    Mark as Contacted
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No form submissions available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
