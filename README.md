#  GigFlow - Freelance Marketplace Platform

GigFlow is a full-stack freelance marketplace where **Clients** can post jobs (Gigs) and **Freelancers** can bid on them. The platform features secure authentication, fluid user roles, and a complex "Hiring" workflow that atomically updates gig statuses and rejects competing bids.

This project was built as a submission for the **Full Stack Development Internship Assignment**.

---

## 🔗 Live Links
- **📂 GitHub Repository:** https://github.com/Ziya0066/gigflow-mern-assignment
- **🌐 Live Demo (Hosted):** https://gigflow-mern-assignment.vercel.app/

- **🎥 Video Walkthrough:** https://www.loom.com/share/490fb7d9aef947a8bf088da0e08fbfc8

---

## 🛠️ Technical Stack
**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios (with Interceptors & Credentials)

**Backend:**
- Node.js & Express.js
- REST API Architecture

**Database:**
- MongoDB (via Mongoose)
- Cloud Hosted on MongoDB Atlas

**Authentication:**
- JWT (JSON Web Tokens)
- HttpOnly Cookies (Secure)

---

## ✨ Key Features

### 1. User Authentication
- Secure Sign-up and Login.
- **Fluid Roles:** All users can act as both Clients (Post Gigs) and Freelancers (Bid on Gigs).
- **JWT Auth:** Secure cookie-based session management.

### 2. Gig Management
- **Public Feed:** Users can browse all "Open" gigs without logging in.
- **Search:** Filter gigs by title using the search bar.
- **Post Gig:** Authenticated users can create job posts with a Title, Description, and Budget.

### 3. The "Hiring" Logic (Core Feature)
The platform implements an atomic hiring workflow:
1.  **Bidding:** Freelancers submit bids (Price + Message) on open gigs.
2.  **Review:** Clients view a dashboard of all applicants for their posts.
3.  **Atomic Hiring:** When a Client clicks "Hire":
    - The **Bid** status changes to `hired`.
    - The **Gig** status changes to `assigned`.
    - **Crucially:** All *other* bids for that gig are automatically marked as `rejected`.

---

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Connection String

### 1. Clone the Repository
```bash
git clone [INSERT YOUR GITHUB REPO LINK HERE]
cd gigflow
```
### 2. Backend Setup
```bash
cd server
npm install
```
Create a .env file in the server folder (refer to .env.example):
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Run the server:
```bash
npm run dev
```
### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
The app will run on http://localhost:5173.

## 📡 API Endpoints

| Category | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | POST | `/api/auth/register` | Register new user |
| **Auth** | POST | `/api/auth/login` | Login & set HttpOnly Cookie |
| **Gigs** | GET | `/api/gigs` | Fetch all open gigs (supports ?search=) |
| **Gigs** | POST | `/api/gigs` | Create a new job post |
| **Bids** | POST | `/api/bids` | Submit a bid for a gig |
| **Bids** | GET | `/api/bids/:gigId` | Get all bids for a specific gig |
| **Hiring** | PATCH | `/api/bids/:bidId/hire` | Execute Hiring Logic (Atomic Update) |

### 📝 Deployment Notes
Frontend: Deployed on Vercel.

Backend: Deployed on Render.

Note: The backend is hosted on a free instance and may take ~1 minute to spin up on the first request.