import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';
import{useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/register`, {
        name,
        email,
        password,
        role,
      });
      console.log('Registered successfully!');
      console.log(response.data);
      navigate('/login')
    } catch (error) {
        console.log('Error: ' + error.response?.data || error.message);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Register</h1>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      <div className={styles.inputGroup}>
        <label className={styles.label}>Role:</label>
        <select
          className={styles.input}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Host</option>
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>
        Register
      </button>
    </form>
  );
};

export default Register;
