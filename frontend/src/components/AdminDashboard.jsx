import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    linkedin: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [emailError, setEmailError] = useState(""); // State for email validation error
  const navigate = useNavigate();

  // On component mount, load companies from localStorage
  useEffect(() => {
    const savedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    setCompanies(savedCompanies);
  }, []);

  // Whenever companies state changes, update localStorage
  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem("companies", JSON.stringify(companies));
    }
  }, [companies]);

  // Handle Logout
  const handleLogout = () => {
    navigate("/"); // Redirect to Login
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate Email format
  const validateEmail = (email) => {
    // Basic email regex validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle form submit (add/edit company)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(formData.emails)) {
      setEmailError("Please enter a valid email address.");
      return; // If email is invalid, stop form submission
    } else {
      setEmailError(""); // Clear any previous email error
    }

    if (editIndex !== null) {
      // If editing, update the company data
      const updatedCompanies = companies.map((company, index) =>
        index === editIndex ? formData : company
      );
      setCompanies(updatedCompanies);
      setEditIndex(null);
    } else {
      // Add new company
      setCompanies([...companies, formData]);
    }

    // Clear form and hide it after submit
    setFormData({
      name: "",
      location: "",
      linkedin: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "",
    });
    setShowForm(false);
  };

  // Handle edit button click
  const handleEdit = (index) => {
    setFormData(companies[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // Handle delete button click
  const handleDelete = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <div style={styles.navLinks}>
          <a href="/home" style={styles.link}>Home</a>
          <button onClick={() => setShowForm(!showForm)} style={styles.linkButton}>Add Company</button>
          <a href="/CommunicationMethodManagement" style={styles.link}>Communication Method</a>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      </nav>

      <div style={styles.content}>
        {showForm && (
          <div style={styles.formContainer}>
            <h2 style={styles.sectionTitle}>{editIndex !== null ? "Edit Company" : "Add Company"}</h2>
            <form onSubmit={handleFormSubmit} style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Company Location"
                value={formData.location}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn Profile URL"
                value={formData.linkedin}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="emails"
                placeholder="Emails (comma-separated)"
                value={formData.emails}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              {emailError && <p style={styles.errorText}>{emailError}</p>}
              <input
                type="text"
                name="phoneNumbers"
                placeholder="Phone Numbers (comma-separated)"
                value={formData.phoneNumbers}
                onChange={handleInputChange}
                style={styles.input}
              />
              <textarea
                name="comments"
                placeholder="Comments"
                value={formData.comments}
                onChange={handleInputChange}
                style={styles.textarea}
              ></textarea>
              <input
                type="text"
                name="periodicity"
                placeholder="Communication Periodicity"
                value={formData.periodicity}
                onChange={handleInputChange}
                style={styles.input}
              />
              <button type="submit" style={styles.submitButton}>
                {editIndex !== null ? "Update Company" : "Add Company"}
              </button>
            </form>
          </div>
        )}

        <div style={styles.listContainer}>
          <h2 style={styles.sectionTitle}>Company Data</h2>
          {companies.length === 0 ? (
            <p style={styles.noDataText}>No companies added yet.</p>
          ) : (
            <div style={styles.companyList}>
              {companies.map((company, index) => (
                <div key={index} style={styles.companyCard}>
                  <h3 style={styles.companyInfo}>{company.name}</h3>
                  <p style={styles.companyInfo}><strong>Location:</strong> {company.location}</p>
                  <p style={styles.companyInfo}><strong>LinkedIn:</strong> <a href={company.linkedin} target="_blank" rel="noreferrer">{company.linkedin}</a></p>
                  <p style={styles.companyInfo}><strong>Emails:</strong> {company.emails}</p>
                  <p style={styles.companyInfo}><strong>Phone Numbers:</strong> {company.phoneNumbers}</p>
                  <p style={styles.companyInfo}><strong>Comments:</strong> {company.comments}</p>
                  <p style={styles.companyInfo}><strong>Periodicity:</strong> {company.periodicity}</p>
                  <button onClick={() => handleEdit(index)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(index)} style={styles.deleteButton}>Delete</button>
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
    width:"159%",
    fontFamily: "'Roboto', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    backgroundColor: "#2c3e50", // Darker background for navbar
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
    color: "#ecf0f1", // Light color for title
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
    flexWrap: "wrap", // Allow items to wrap to the next row
    gap: "35px", // Space between items
    justifyContent: "flex-start", // Align items to the left
},

companyCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
    width: "calc(33% - 20px)", // Three cards per row, with a gap of 20px
    minWidth: "300px", // Ensure each card has a minimum width
    boxSizing: "border-box", // Include padding and border in width calculation
},
  companyInfo: {
    fontSize: "16px",
    color: "black", // Change text color to red
    marginBottom: "10px",
  },
  editButton: {
    margin:"20px",
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

export default AdminDashboard;
