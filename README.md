# CreatorsSampark 🎯
### India's Premier Talent Management & Influencer Marketing Platform

A full-stack MERN application built as a reference implementation of [creatorsmela.com](https://creatorsmela.com), featuring the same color scheme, layout, and functionality.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios, React Toastify |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| Styling | Custom CSS with CSS Variables |
| Icons | React Icons |

---

## 📁 Project Structure

```
creatorsSampark/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Creator.js
│   │   ├── Campaign.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── creators.js
│   │   ├── campaigns.js
│   │   └── contact.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.png
│   │   ├── components/
│   │   │   ├── Navbar.js / Navbar.css
│   │   │   └── Footer.js / Footer.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js / Home.css
│   │   │   ├── Creators.js / Creators.css
│   │   │   ├── CreatorDetail.js / CreatorDetail.css
│   │   │   ├── Campaigns.js / Campaigns.css
│   │   │   ├── Services.js / Services.css
│   │   │   ├── About.js / About.css
│   │   │   ├── Contact.js / Contact.css
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Auth.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v16+ installed
- MongoDB installed locally **OR** a MongoDB Atlas account
- npm or yarn

---

### Step 1: Install MongoDB (if not installed)

**Windows:** Download from https://www.mongodb.com/try/download/community
**Mac:** `brew tap mongodb/brew && brew install mongodb-community`
**Ubuntu:** Follow guide at https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

Start MongoDB:
```bash
# Windows (run as admin)
net start MongoDB

# Mac
brew services start mongodb-community

# Ubuntu
sudo systemctl start mongod
```

---

### Step 2: Clone / Extract the Project

```bash
cd creatorsSampark
```

---

### Step 3: Setup Backend

```bash
cd backend
npm install
```

Edit the `.env` file with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/creatorsSampark
JWT_SECRET=creatorsSampark_secret_key_2024
NODE_ENV=development
```

> **Using MongoDB Atlas?** Replace MONGODB_URI with your Atlas connection string:
> `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/creatorsSampark`

Start the backend:
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

---

### Step 4: Seed Sample Data

Once backend is running, open a new terminal and run:

```bash
# Seed creators
curl -X POST http://localhost:5000/api/creators/seed/data

# Seed campaigns
curl -X POST http://localhost:5000/api/campaigns/seed/data
```

Or visit these URLs in your browser after the backend starts.

---

### Step 5: Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**

---

## 🌐 Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, categories, featured creators, services, campaigns, testimonials, CTA |
| Creators | `/creators` | Filter & browse creators by category, platform, followers |
| Creator Detail | `/creators/:id` | Full profile with metrics, social links, pricing |
| Campaigns | `/campaigns` | Browse & apply to brand campaigns |
| Services | `/services` | Service descriptions + pricing plans |
| About | `/about` | Company story, team, values |
| Contact | `/contact` | Contact form (saves to MongoDB) |
| Login | `/login` | JWT authentication |
| Register | `/register` | Brand or Creator registration |

---

## 🎨 Design

- **Primary Color:** `#2D0A5F` (Deep Purple)
- **Accent Color:** `#C9A84C` (Gold)
- **Font:** Poppins + Playfair Display (from Google Fonts)
- **Logo:** CreatorsSampark logo (provided)
- Fully **responsive** for mobile, tablet, and desktop

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get current user (protected) |

### Creators
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/creators` | Get all creators (with filters) |
| GET | `/api/creators/:id` | Get single creator |
| POST | `/api/creators` | Create creator (protected) |
| POST | `/api/creators/seed/data` | Seed sample creators |

### Campaigns
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/campaigns` | Get all campaigns |
| GET | `/api/campaigns/:id` | Get single campaign |
| POST | `/api/campaigns` | Create campaign (protected) |
| POST | `/api/campaigns/seed/data` | Seed sample campaigns |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all messages |

---

## ⚠️ Troubleshooting

**Port 5000 already in use?**
```bash
# Change PORT in backend/.env to 5001
# Then update frontend/package.json proxy to "http://localhost:5001"
```

**MongoDB connection error?**
- Make sure MongoDB service is running
- Check your MONGODB_URI in backend/.env

**npm install fails?**
```bash
npm install --legacy-peer-deps
```

---

## 📝 Notes for Final Year Project

- This is a **local development** project (not deployed)
- All data is stored in your local MongoDB database
- The logo is preserved exactly as provided
- Colors and layout match the reference site creatorsmela.com
- JWT tokens are stored in localStorage for auth persistence

---

*Built with ❤️ using MERN Stack*
