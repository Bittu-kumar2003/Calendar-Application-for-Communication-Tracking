# Calendar Application for Communication Tracking

## Objective
The Calendar Application for Communication Tracking is a React-based tool designed to help companies maintain strong professional relationships by efficiently tracking communications with other organizations. This application enables users to log past interactions, schedule future communications, and manage engagement frequency, ensuring timely and consistent follow-ups.

# Admin Dashboard Application

## Overview
The Admin Dashboard application is a React-based web application designed for managing company-related information. It allows administrators to add, view, edit, and organize company data efficiently. This application follows a structured approach and provides clear navigation and user-friendly forms.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Frontend Structure](#frontend-structure)
5. [Backend Structure](#backend-structure)
6. [How It Works](#how-it-works)
7. [Screenshots](#screenshots)
8. [Future Enhancements](#future-enhancements)

---

## Features

- Add, edit, and manage company data.
- View the most recently added six companies on the main dashboard.
- Store and display additional data in the "Company Data" section.
- Validates email addresses during form submission.
- Clear and simple navigation through different sections like "Home," "Profile," "Manage Companies," and "Company Data."
- Logout functionality for secure access control.

---

## Technologies Used

### Frontend
- React
- React Router
- CSS-in-JS styling (inline styles and styled components)

### Backend
- Node.js
- Express
- MongoDB (for data persistence)

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed on your machine:

- Node.js (v14+)
- MongoDB (local or cloud instance)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/admin-dashboard.git
   cd admin-dashboard
   ```

2. **Install dependencies**
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     ```

3. **Configure Environment Variables**
   - Create a `.env` file in the backend directory:
     ```env
     PORT=5000
     MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/mydatabase
     ```

4. **Start the application**
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`.

---

## Frontend Structure

### File Structure
```
frontend/
|-- src/
|   |-- components/
|   |   |-- Navbar.jsx
|   |   |-- AdminDashboard.jsx
|   |   |-- AddCompanyForm.jsx
|   |   |-- CompanyList.jsx
|   |   |-- UserDashBoard.jsx
|   |   |-- CommunicationModel.jsx
|   |   |-- Footer.jsx
|   |-- App.jsx
|   |-- index.jsx
|-- public/
|-- package.json
```

### Highlights
- **Navbar.js:** Contains navigation links and logout functionality.
- **AdminDashboard.js:** Core dashboard component that includes forms and company display sections.
- **AddCompanyForm.js:** Handles data input and validation.
- **CompanyList.js:** Displays a paginated list of company data.

---

## Backend Structure

### File Structure
```
backend/
|-- .env
|-- server.js
|-- package.json
```

### API Endpoints

- **POST /api/companies**: Add a new company.
- **GET /api/companies**: Retrieve all companies.
- **PUT /api/companies/:id**: Update a company's information.
- **DELETE /api/companies/:id**: Delete a company.

---

## How It Works

### Adding Companies
1. Navigate to the "Manage Companies" section.
2. Fill out the form with valid details (e.g., valid email, LinkedIn profile URL).
3. Click "Add Company." The company will be saved to the database and displayed on the dashboard.

### Editing Companies
1. Click the "Edit" button on a company card in the "Companies" section.
2. Modify the details in the form.
3. Click "Update Company." Changes will be saved to the database.

### Viewing Company Data
- The most recent six companies are displayed in the "Manage Companies" section.
- Navigate to the "Company Data" section for a complete list of all companies.

---

## Screenshots
### 1. **Register Page**
![Screenshot (78)](https://github.com/user-attachments/assets/d918acb5-217d-45fc-acee-48341179cbcc)

![Screenshot (79)](https://github.com/user-attachments/assets/a6225f54-3a77-4b92-bbd3-adb29ea78c36)


### 1. **Login Page**
  
![Screenshot (75)](https://github.com/user-attachments/assets/2c21f3d5-fdcc-4d9f-ae0b-474e17a6b856)

### 2. **Admin Dashboard**

   ![Screenshot (80)](https://github.com/user-attachments/assets/872562e0-cd7c-4e02-83b8-0ffed3cf7733)


### 3. **Add Company Form**
  ![Screenshot (81)](https://github.com/user-attachments/assets/b6ddd076-c550-466b-a9e5-a7c177550ca2)

### 4. **Company Data Section**

   
![Screenshot (82)](https://github.com/user-attachments/assets/2e755ba8-f39d-4fa3-982a-acb3a671bbde)



