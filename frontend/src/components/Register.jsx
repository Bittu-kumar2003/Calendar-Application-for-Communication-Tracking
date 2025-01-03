import React, { useState } from 'react';

// Email validation regex pattern
const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [personalEmail, setPersonalEmail] = useState('');  // Admin-specific personal email

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    const userData = { fullName, email, mobile, password, role, personalEmail };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User registered successfully!');
        console.log('User registered:', data);
      } else {
        alert(data.message || 'Error occurred');
        console.log('Error:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {role === 'admin' && (
            <input
              type="email"
              placeholder="Personal Email"
              value={personalEmail}
              onChange={(e) => setPersonalEmail(e.target.value)}
              style={styles.input}
              required
            />
          )}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            style={role === 'admin' ? styles.adminButton : styles.userButton}
          >
            {role === 'admin' ? 'Register as Admin' : 'Register as User'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    width: "360%",
    height: "100vh",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    width: '450px',
    textAlign: 'center',
    maxWidth: '90%',
    position: 'relative',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  select: {
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease-in-out',
  },
  adminButton: {
    backgroundColor: '#FF5722',
  },
  userButton: {
    backgroundColor: '#007BFF',
  },
};

export default Register;
