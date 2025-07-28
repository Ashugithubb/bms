
# 🚌 BusYatra – Simple Bus Booking App

**BusYatra** is a user-friendly web-based bus booking application, inspired by platforms like RedBus. It allows **passengers** to search and book bus rides, while **owners** can register buses, schedule rides, and manage bookings efficiently.

---

## 🚀 Tech Stack

| Layer       | Tech Used                          |
|-------------|------------------------------------|
| Frontend    | Next.js, React, Material UI (MUI)  |
| Backend     | NestJS, TypeORM, PostgreSQL        |
| Auth        | JWT (JSON Web Token)               |
| Deployment  | Docker (optional)                  |

---

## ✨ Features

### 👤 Passenger

- 🔐 **Register/Login**
- 🔍 **Search Rides** by:
  - Pickup/Drop locations
  - Travel time
  - Bus category (AC, Non-AC, Volvo, etc.)
- 📋 **View Bus Listings** with:
  - Pagination support
  - Realtime filter updates
  - Ticket prices
- 🔎 **View Additional Bus Details**:
  - Model, registration number, owner info
  - Total & available seats
- 🎫 **Book Ticket**
- 📜 **View Booking History**
- 👤 **Manage Profile**

---

### 🚌 Bus Owner

- 🔐 **Register/Login**
- 📝 **Register Bus** with:
  - Bus details (color, seats, registration number)
  - Category (AC, Non-AC, Volvo)
- 📢 **Publish Ride**:
  - Source & destination
  - Intermediate stops (optional)
  - Departure time, stop duration
  - Date & fare for each stop
- 📍 **Update Current Location**
- 📜 **View Ride History**
- 👤 **Manage Profile & Bus Info**

---

## 🖥️ UI Design

- Clean and seamless user experience
- Material UI-based layout
- Responsiveness is optional but preferred

---

## 📁 Folder Structure

```

/busyatra/
├── bms\_frontend/     # Next.js frontend
└── bms\_backend/      # NestJS backend

````

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/busyatra.git
cd busyatra
````

### 2. Setup Environment Variables

#### Backend: `bms_backend/.env`

```env
DATABASE_URL=postgres://user:password@localhost:5432/busyatra
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### Frontend: `bms_frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### 3. Install & Run

#### Backend

```bash
cd bms_backend
npm install
npm run start:dev
```

#### Frontend

```bash
cd bms_frontend
npm install
npm run dev
```

---

## 🐳 Deployment (Optional with Docker)

Create a Dockerfile for both frontend and backend and run via `docker-compose`.




## 🙋‍♂️ Author

Built with ❤️ during a demo practice session.

