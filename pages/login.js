import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import styles from "../styles/AdminDashboard.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/AdminDashboard"); // Redirect to dashboard after successful login
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google login successful:", result.user);
      router.push("/dashboard");
    } catch (error) {
      setError("Google login failed. Please try again.");
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Facebook login successful:", result.user);
      router.push("/dashboard");
    } catch (error) {
      setError("Facebook login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>
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
        <button type="submit" className={styles.button}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <div className={styles.socialLoginContainer}>
        <button className={styles.socialButton} onClick={handleGoogleLogin}>
          <img src="/google-logo.png" alt="Google Logo" />
          Login with Google
        </button>
        <button className={styles.socialButton} onClick={handleFacebookLogin}>
          <img src="/facebook-logo.png" alt="Facebook Logo" />
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
