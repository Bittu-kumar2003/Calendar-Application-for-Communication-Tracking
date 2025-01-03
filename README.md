# Calendar Application for Communication Tracking

## Objective
The Calendar Application for Communication Tracking is a React-based tool designed to help companies maintain strong professional relationships by efficiently tracking communications with other organizations. This application enables users to log past interactions, schedule future communications, and manage engagement frequency, ensuring timely and consistent follow-ups.

---

## Features

### Admin Module
- **Company Management:**
  - Add, edit, and delete company records.
  - Fields include:
    - Name
    - Location
    - LinkedIn Profile
    - Emails (multiple entries supported)
    - Phone Numbers
    - Comments
    - Communication Periodicity (default time intervals like every 2 weeks).

- **Communication Method Management:**
  - Define available communication methods with the following properties:
    - Name (e.g., "Visit")
    - Description (e.g., "Visit to company premises")
    - Sequence (e.g., LinkedIn Post → LinkedIn Message → Email → Phone Call → Other).
    - Mandatory Flag (whether the method is mandatory).
  - Default sequence:
    1. LinkedIn Post
    2. LinkedIn Message
    3. Email
    4. Phone Call
    5. Other

---

### User Module

#### Dashboard
- **Grid View:**
  - Each row represents a company.
  - Columns include:
    - Company Name
    - Last Five Communications (type and date).
    - Next Scheduled Communication (type and date).

- **Color-Coded Highlights:**
  - **Red:** Overdue communication.
  - **Yellow:** Communication due today.
  - Users can override or disable highlights for specific companies or tasks.

- **Hover Effect:** Displays notes or comments on completed communications when hovering.

#### Communication Action
- Select one or multiple companies.
- Log new communication via a modal:
  - Select communication type (e.g., LinkedIn Post, Email).
  - Input communication date.
  - Add notes.
- Resets highlights for the selected company/companies upon submission.

#### Notifications
- **Overdue Communications Grid:** Lists companies with overdue tasks.
- **Today’s Communications Grid:** Displays tasks due today.
- Notification icon with badge indicating overdue and due communication counts.

#### Calendar View
- **View Past Communications:** Displays past communication dates and methods.
- **Manage Upcoming Communications:** Schedule and adjust future interaction dates and methods.

---

## Technology Stack
- **Frontend:** React, React Calendar
- **Backend:** Node.js/Express.js (optional, if APIs are needed)
- **Database:** MongoDB or any preferred database for storing company and communication details
- **Styling:** TailwindCSS or Material-UI
- **State Management:** Redux (optional, for complex state handling)

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/username/calendar-communication-tracker.git
   cd calendar-communication-tracker
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Application:**
   ```bash
   npm start
   ```

4. **Backend Setup (if applicable):**
   - Navigate to the `server` folder.
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm run dev
     ```

---

## Usage
1. Admins can:
   - Add and configure companies.
   - Define communication methods and their sequences.

2. Users can:
   - Log communication details.
   - Track overdue and upcoming tasks.
   - View and manage past and future communication schedules.

---

## Roadmap
- Add a Reporting and Analytics Module.
- Support for integration with third-party tools like Google Calendar.
- Enhanced notification settings (e.g., email or SMS alerts).
- Role-based access control.

---

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add a new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For questions or suggestions, please contact [email@example.com](mailto:email@example.com).
