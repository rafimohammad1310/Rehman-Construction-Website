import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Import Firebase config
import styles from "../styles/AdminDashboard.module.css"; // Updated CSS module
import Navbar from "../components/Navbar";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check role in Firestore
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.role === "admin") {
          router.push("/AdminDashboard");
        } else {
          router.push("/UserDashboard");
        }
      } else {
        setError("User not found in database.");
      }
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save new user as "user" role by default
      await setDoc(doc(db, "users", user.uid), { email: user.email, role: "user" });

      router.push("/UserDashboard");
    } catch (err) {
      setError("Error creating account: " + err.message);
    }
    setLoading(false);
  };


  return (
    
    <div className={styles.container}>


      <div className={styles.card}>
        
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit= {handleLogin }className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

       

        

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
