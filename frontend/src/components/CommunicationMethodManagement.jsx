import React, { useState, useEffect } from 'react';
const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sequence, setSequence] = useState('');
  const [mandatory, setMandatory] = useState(false);

  useEffect(() => {
    const savedMethods = JSON.parse(localStorage.getItem('methods')) || [];
    setMethods(savedMethods);
  }, []);

  const handleAddMethod = (e) => {
    e.preventDefault();

    const newMethod = {
      id: new Date().getTime(), // Assign a unique ID to each method
      name,
      description,
      sequence: parseInt(sequence, 10),
      mandatory,
    };

    const updatedMethods = [...methods, newMethod];
    setMethods(updatedMethods);
    localStorage.setItem('methods', JSON.stringify(updatedMethods));

    setName('');
    setDescription('');
    setSequence('');
    setMandatory(false);
  };

  const handleDeleteMethod = (idToDelete) => {
    const updatedMethods = methods.filter(method => method.id !== idToDelete);
    setMethods(updatedMethods);
    localStorage.setItem('methods', JSON.stringify(updatedMethods));
  };

  return (
    <div style={styles.container}>
      <header style={styles.navbar}>
        <h1 style={styles.title}>Communication Method Management</h1>
      </header>

      <div style={styles.content}>
        <div style={styles.formContainer}>
          <h2 style={styles.sectionTitle}>Define Communication Methods</h2>
          <form style={styles.form} onSubmit={handleAddMethod}>
            <input
              style={styles.input}
              type="text"
              placeholder="Method Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Sequence"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              required
            />
            <label>
              <input
                type="checkbox"
                checked={mandatory}
                onChange={() => setMandatory(!mandatory)}
              />
              Mandatory
            </label>
            <button style={styles.submitButton} type="submit">
              Add Communication Method
            </button>
          </form>
        </div>

        <div style={styles.listContainer}>
          <h2 style={styles.sectionTitle}>Communication Methods</h2>
          {methods.length === 0 ? (
            <p style={styles.noDataText}>No communication methods added yet.</p>
          ) : (
            <div style={styles.companyList}>
              {methods.map((method) => (
                <div style={styles.companyCard} key={method.id}>
                  <p style={styles.companyInfo}><strong>Method Name:</strong> {method.name}</p>
                  <p style={styles.companyInfo}><strong>Description:</strong> {method.description}</p>
                  <p style={styles.companyInfo}><strong>Sequence:</strong> {method.sequence}</p>
                  <p style={styles.companyInfo}><strong>Mandatory:</strong> {method.mandatory ? 'Yes' : 'No'}</p>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteMethod(method.id)} // Using unique ID for deletion
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "320%",
    fontFamily: "'Roboto', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    backgroundColor: "#2c3e50",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  title: {
    color: "#ecf0f1",
    margin: 0,
    fontSize: "26px",
    fontWeight: "600",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  linkButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ecf0f1",
    fontSize: "18px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  content: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    marginBottom: "40px",
    maxWidth: "500px", // Limiting the form width
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    resize: "vertical",
    outline: "none",
  },
  submitButton: {
    padding: "12px",
    fontSize: "18px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  listContainer: {
    marginTop: "30px",
  },
  noDataText: {
    fontSize: "18px",
    color: "#555",
  },
  companyList: {
    display: "flex",
    flexDirection: "column", // Stack items vertically (cards will be stacked)
    gap: "20px",
    justifyContent: "flex-start",
  },
  
  companyCard: {
    
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "4px", // Increased padding for better spacing
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
    width: "180%",
    boxSizing: "border-box",
    display: "flex", // Change to flex for inline data
    flexDirection: "row", // Arrange data horizontally
    justifyContent: "space-between", // Space out data evenly across the card
    alignItems: "center", // Align items vertically centered
  },

  companyInfo: {
    fontSize: "16px",
    color: "black",
    
    marginBottom: "10px",
    display: "inline-block", // Ensures text aligns inline
    width: "auto",
  },
  editButton: {
    margin: "20px",
    backgroundColor: "#f39c12",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "600",
  },
};

export default CommunicationMethodManagement;
