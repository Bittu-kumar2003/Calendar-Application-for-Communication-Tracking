import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [communicationDetails, setCommunicationDetails] = useState({
    type: '',
    date: '',
    notes: ''
  });
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Sample data for demonstration
    const sampleCompanies = [
      {
        id: 1,
        name: "ABC Corp",
        communications: [
          { type: "Email", date: "2025-01-01", notes: "Initial Contact" },
          { type: "LinkedIn Post", date: "2024-12-20", notes: "Shared company update" },
          { type: "Call", date: "2024-12-15", notes: "Follow-up on project" },
          { type: "Meeting", date: "2024-12-10", notes: "Discussed quarterly goals" },
          { type: "Follow-up", date: "2024-12-05", notes: "Sent proposal" },
        ],
        nextCommunication: { type: "Email", date: "2025-01-10" },
        highlight: null, // Added highlight field
      },
      {
        id: 2,
        name: "XYZ Ltd",
        communications: [
          { type: "LinkedIn Post", date: "2024-12-25", notes: "End of year summary" },
          { type: "Email", date: "2024-12-18", notes: "Sent newsletter" },
          { type: "Follow-up", date: "2024-12-12", notes: "Waiting for response" },
          { type: "Meeting", date: "2024-12-08", notes: "Product discussion" },
          { type: "Call", date: "2024-12-01", notes: "Check-in on project status" },
        ],
        nextCommunication: { type: "Meeting", date: "2025-01-05" },
        highlight: null, // Added highlight field
      },
    ];

    setCompanies(sampleCompanies);
  }, []);

  const handleLogout = () => {
    navigate('/'); // Redirect to Login page
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCommunicationDetails({ type: '', date: '', notes: '' });
  };

  const handleCommunicationLog = () => {
    const { type, date, notes } = communicationDetails;

    // Validate input
    if (!type || !date || !notes) {
      alert("Please fill all fields before submitting.");
      return;
    }

    // Reset highlights for selected companies
    const newCompanies = companies.map(company => {
      if (selectedCompanies.includes(company.id)) {
        const newCommunication = {
          type,
          date,
          notes,
        };
        // Reset highlights
        return {
          ...company,
          communications: [...company.communications, newCommunication],
          highlight: null, // Reset highlight after logging communication
        };
      }
      return company;
    });

    // Update the companies state with the new communication
    setCompanies(newCompanies);
    setShowModal(false);
    setCommunicationDetails({ type: '', date: '', notes: '' });
  };

  const handleCompanySelection = (companyId) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId) ? prev.filter(id => id !== companyId) : [...prev, companyId]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunicationDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSetRedHighlight = () => {
    const updatedCompanies = companies.map(company => {
      if (selectedCompanies.includes(company.id)) {
        return { ...company, highlight: 'red' };
      }
      return company;
    });

    setCompanies(updatedCompanies);
  };

  const handleSetYellowHighlight = () => {
    const updatedCompanies = companies.map(company => {
      if (selectedCompanies.includes(company.id)) {
        return { ...company, highlight: 'yellow' };
      }
      return company;
    });

    setCompanies(updatedCompanies);
  };

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];

    if (companies.some(company => company.highlight === "red" && company.nextCommunication.date === dateString)) {
      return 'calendar-tile-overdue';
    }

    if (companies.some(company => company.highlight === "yellow" && company.nextCommunication.date === dateString)) {
      return 'calendar-tile-due';
    }

    return null;
  };

  return (
    <div style={styles.dashboard}>
      <nav style={styles.navbar}>
        <h1 style={styles.title}>User Dashboard</h1>
        <div style={styles.navActions}>
          <div style={styles.notificationIcon} onClick={toggleNotifications}>
            🔔
          </div>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </nav>

      {showNotifications && (
        <div ref={notificationRef} style={styles.notificationsPanel}>
          <h2>Notifications</h2>
        </div>
      )}

      <Calendar
        value={calendarValue}
        onChange={setCalendarValue}
        tileClassName={tileClassName}
        style={{ color: 'black' }} // Make calendar text black
      />

      <div style={styles.buttonContainer}>
        <button onClick={handleSetRedHighlight} style={styles.highlightButton}>Set Red Highlight</button>
        <button onClick={handleSetYellowHighlight} style={styles.highlightButton}>Set Yellow Highlight</button>
      </div>

      <button onClick={handleModalOpen} style={styles.actionButton}>Communication Performed</button>

      {showModal && (
        <div style={styles.modal}>
          <h2>Log Communication</h2>
          <div>
            <label>Type:</label>
            <select name="type" value={communicationDetails.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Email">Email</option>
              <option value="LinkedIn Post">LinkedIn Post</option>
              <option value="Call">Call</option>
              <option value="Meeting">Meeting</option>
              <option value="Follow-up">Follow-up</option>
            </select>
          </div>
          <div>
            <label>Date:</label>
            <input type="date" name="date" value={communicationDetails.date} onChange={handleChange} />
          </div>
          <div>
            <label>Notes:</label>
            <textarea name="notes" value={communicationDetails.notes} onChange={handleChange}></textarea>
          </div>
          <div>
            <button onClick={handleCommunicationLog} style={styles.submitButton}>Log Communication</button>
            <button onClick={handleModalClose} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Company Name</th>
            <th style={styles.tableHeader}>Last Five Communications</th>
            <th style={styles.tableHeader}>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              style={{
                ...styles.tableRow,
                backgroundColor: company.highlight === "red" ? "#ffcccc" : company.highlight === "yellow" ? "#ffffcc" : "#ffffff"
              }}
            >
              <td style={styles.tableCell}>
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleCompanySelection(company.id)}
                />
                {company.name}
              </td>
              <td style={styles.tableCell}>
                {company.communications.map((comm, index) => (
                  <div key={index} title={comm.notes}>
                    {comm.type} - {new Date(comm.date).toLocaleDateString()}
                  </div>
                ))}
              </td>
              <td style={styles.tableCell}>
                {company.nextCommunication.type} -
                {new Date(company.nextCommunication.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  dashboard: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    boxSizing: 'border-box',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '5px',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  notificationIcon: {
    position: 'relative',
    fontSize: '20px',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    color: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  notificationsPanel: {
    position: 'absolute',
    top: '60px',
    right: '20px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    margin: 0,
  },
  buttonContainer: {
    margin: '20px 0',
  },
  highlightButton: {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  actionButton: {
    margin: '20px 0',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  table: {
    marginTop: '20px',
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  },
  tableRow: {
    backgroundColor: '#fff',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default Dashboard;
