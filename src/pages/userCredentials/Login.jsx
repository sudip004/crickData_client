import React, { useState, } from 'react';
import axios from 'axios';
import styles from './Register.module.css';
import {useNavigate} from "react-router-dom"

const Login = () => {

    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Track loading state

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true); // Start loading

      try {
          // ✅ Step 1: Log in the user
          const response = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/login`, {
              email,
              password,
          }, { withCredentials: true });

          console.log('Logged in successfully!', response.data);

          // ✅ Step 2: Wait for session to be established
          await new Promise((resolve) => setTimeout(resolve, 500));

          // ✅ Step 3: Check if the user has a balance
          try {
              const response1 = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {
                  withCredentials: true,
              });

              console.log("User balance:", response1.data);
          } catch (error) {
              if (error.response?.status === 404) {
                  console.log("User does not have a balance. Creating one...");

                  // ✅ Step 4: Create balance if it doesn't exist
                  await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/balance`, {}, { withCredentials: true });

                  console.log("Balance created successfully!");
              } else {
                  throw error; // Throw other errors
              }
          }

          // ✅ Step 5: Navigate to the dashboard after balance is successfully created
          console.log("Navigating to home...");
          navigate('/');

      } catch (error) {
          console.error('Login error:', error.response?.data || error.message);
      } finally {
          setLoading(false); // Stop loading
      }
  };


  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Password:</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <p>If you are not login please register <span style={{color:"royalblue",textDecoration:"underline",cursor:"pointer",paddingLeft:"1rem"}} onClick={()=>navigate('/register')}>register</span></p>
      <button type="submit" className={styles.submitButton}>
        Login
      </button>
    </form>
  );
};

export default Login;
