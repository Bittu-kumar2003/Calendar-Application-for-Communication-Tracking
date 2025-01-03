import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Importing the Navbar component
import Footer from './Footer'; // Importing the Footer component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [fullName, setFullName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password, role, fullName, personalEmail };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        alert('Login successful!');
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        setErrorMessage(data.message || 'Login failed');
        console.log('Error:', data.message);
      }
    } catch (error) {
      setErrorMessage('Error during login: ' + error.message);
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.loginBox}>
        <h2 style={styles.header}>Login</h2>
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {role === 'admin' && (
            <div>
              <input
                style={styles.input}
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                style={styles.input}
                type="email"
                placeholder="Personal Email"
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
              />
            </div>
          )}
          <div style={styles.roleSelection}>
            <button
              style={role === 'user' ? styles.selectedButtonUser : styles.button}
              onClick={(e) => { e.preventDefault(); setRole('user'); }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              User
            </button>
            <button
              style={role === 'admin' ? styles.selectedButtonAdmin : styles.button}
              onClick={(e) => { e.preventDefault(); setRole('admin'); }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}
            >
              Admin
            </button>
          </div>
          <button
            style={styles.button}
            type="submit"
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}
          >
            Login
          </button>
        </form>
        <div style={styles.registerLink}>
          <p>Don't have an account?</p>
          <button
            style={styles.registerButton}
            onClick={() => navigate(role === 'admin' ? '/register-admin' : '/register')}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            Register here
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Styles for Login, Navbar, and Footer combined
const styles = {
  container: {
    width: '395%',
    backgroundColor: '#f5f7fb', // Lighter background color
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    width: '400px',
    maxWidth: '90%',
    textAlign: 'center',
    marginTop: '50px',
    border: '1px solid #ddd',
  },
  header: {
    color: '#333',
    fontSize: '32px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#007BFF', // Blue outline on focus
  },
  button: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#007BFF', // Blue color for the Login button
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3', // Darker blue on hover
    transform: 'scale(1.05)',
  },
  selectedButtonUser: {
    width: '48%',
    padding: '12px',
    backgroundColor: '#28a745', // Green for User
    color: '#fff',
    border: '1px solid #28a745',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginRight: '5%',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  selectedButtonAdmin: {
    width: '48%',
    padding: '12px',
    backgroundColor: '#007BFF', // Blue for Admin
    color: '#fff',
    border: '1px solid #007BFF',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  roleSelection: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px', // Adds consistent space between the buttons
  },
  registerLink: {
    marginTop: '20px',
  },
  registerButton: {
    padding: '12px 24px',
    marginTop: '15px',
    backgroundColor: '#28a745', // Green for Register button
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  registerButtonHover: {
    backgroundColor: '#218838', // Darker green on hover
    transform: 'scale(1.05)',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default Login;
