import React, { useState } from "react";
import { validateEmail } from "./utils";

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    linkedin: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailArray = formData.emails.split(",");
    if (!emailArray.every(validateEmail)) {
      alert("Please provide valid emails.");
      return;
    }
    const existingData = JSON.parse(localStorage.getItem("companies")) || [];
    const updatedData = [formData, ...existingData];
    localStorage.setItem("companies", JSON.stringify(updatedData));
    setFormData({
      name: "",
      location: "",
      linkedin: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "",
    });
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.sectionTitle}>Add Company</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile"
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
        />
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
        />
        <input
          type="text"
          name="periodicity"
          placeholder="Communication Periodicity"
          value={formData.periodicity}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>Add Company</button>
      </form>
    </div>
  );
};

export default AddCompany;

// Reuse styles from `styles.js` or define new ones.
const styles = {
  formContainer: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ced4da",
    borderRadius: "5px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    height: "100px",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
