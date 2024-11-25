
# **Upkeep - Housekeeping Management System**

## **Overview**
Upkeep is a web-based housekeeping management system designed to streamline cleaning requests and provide better surveillance for the housekeeping process in any resident space. It features three interfaces for residents, staff, and admins to manage and monitor cleaning operations effectively.

---

## **Features**
- Residents can:
  - Submit cleaning requests with selected time slots and areas.
  - Track the status of requests.
  - Mark request as complete.
  - Delete the cleaning request
  
- Staff can:
  - View assigned requests according to the assigned building and floor.
  - Accept cleaning requests.
  
- Admins can:
  - Monitor all requests and feedback.

---

## **Technologies Used**
### Frontend:
- React.js
- Tailwind CSS

### Backend:
- Node.js
- Express.js
- MongoDB

---

## **Setup Instructions**
### Prerequisites:
- Node.js installed
- MongoDB instance running

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/constShresth/UpKeep
   cd upkeep
   ```

2. Install dependencies:
   ```bash
   npm install
   cd backend && npm install
   ```

3. Set environment variables:
   - Create a `.env` file in the `backend` directory with:
     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=backend_port
     ```

4. Start the application:
   - Backend: 
     ```bash
     cd backend
     node server.js
     ```
   - Frontend:
     ```bash
     cd ..
     npm run dev
     ```

5. Access the app at `http://localhost:5173`.

---

## **API Endpoints**
### Login Routes:

- **POST** `/login`: Login using email and password.

### Resident Routes:

- **POST** `/resident/home`: Submit a cleaning request.
- **GET** `/resident/home`: Fetch resident details (requires `email` in query, eg: `/resident/home?email=example@example.com`).
- **GET** `/resident/request`: Fetch cleaning request (requires `roll_no` in query, eg: `/resident/request?roll_no=102383077`).
- **DELETE** `/resident/request`: Cancel a request (requires `id` in query, eg: `/resident/request?id=abc123`).
- **PATCH** `/resident/request`: Update request status (requires `id` and `status` in query, eg: `/resident/request?id=abadsfadsfc1212354135341645735343&status=Done`).

### Staff Routes:

- **GET** `/staff/home`: Fetch staff details (requires `email` in query, eg: `/staff/home?email=example@example.com`).
- **GET** `/staff/requests`: Fetch cleaning requests (requires `hostel` and `floor` in query, eg: `/staff/requests?hostel=A&floor=1`).
- **PATCH** `/staff/request`: Update request status (requires `hostel`, `romm_no`, `staffName` and `selected_slot` in query, eg: `/staff/request?hostel=O&room_no=123&staffName=Sanjay&selected_slot=10:00AM - 11:00AM`).

### Admin Routes:

- **GET** `/admin/home`: Fetch admin details (requires `email` in query, eg: `/admin/home?email=example@example.com`).
- **GET** `/admin/requests`: Fetch cleaning requests (requires `hostel` in query, eg: `/admin/requests?hostel=O`).



