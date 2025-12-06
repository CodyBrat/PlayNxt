# 🏟️ PlayNxt - Sports Venue Booking Platform

> A modern, full-stack sports venue booking application built with React Native and Express.js

[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**PlayNxt** is a comprehensive sports venue booking platform that connects venue providers with sports enthusiasts. The platform enables users to discover, book, and manage sports facilities while allowing providers to list and manage their venues efficiently.

### Key Highlights

- 🔐 **Role-Based Access Control** - Separate interfaces for Users and Providers
- 📱 **React Native Mobile App** - Beautiful, native mobile experience
- 🚀 **RESTful API** - Scalable Express.js backend with Prisma ORM
- 🗄️ **MongoDB Database** - Flexible NoSQL data storage
- 🎨 **Modern UI/UX** - Sleek design with glassmorphism and smooth animations
- 🔒 **JWT Authentication** - Secure token-based authentication
- 📊 **Real-time Updates** - Instant booking confirmations and updates

---

## ✨ Features

### For Users (Customers)

- 🔍 **Discover Venues** - Browse and search sports facilities by sport type, location, and rating
- 📅 **Book Slots** - Real-time slot availability with instant booking confirmation
- 💳 **Manage Bookings** - View active and past bookings, cancel reservations
- ⭐ **Favorites** - Save favorite venues for quick access
- 🏷️ **Filters** - Advanced filtering by price, rating, and amenities
- 📱 **Beautiful Interface** - Intuitive, modern mobile-first design

### For Providers (Venue Owners)

- 🏢 **Venue Management** - Create, update, and manage multiple venues
- 📊 **Dashboard** - View booking analytics and revenue insights
- 📋 **Booking Overview** - Track all bookings for your venues
- 💰 **Pricing Control** - Set custom pricing and time slots
- 🖼️ **Media Management** - Upload venue images and details
- 👥 **Customer Details** - Access customer information for bookings

### For Administrators

- 🔐 **Full System Access** - Manage users, providers, and venues
- 📈 **Platform Analytics** - Track platform-wide metrics
- 🛡️ **Security Controls** - Monitor and moderate platform activity

---

## 🛠️ Tech Stack

### Frontend (Mobile)

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo** | Development and build toolchain |
| **React Navigation** | Navigation and routing |
| **Axios** | HTTP client for API calls |
| **AsyncStorage** | Secure local storage |
| **Expo Linear Gradient** | Gradient UI components |
| **React Native Calendars** | Date picker and calendar |

### Backend (API)

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web application framework |
| **Prisma** | Modern ORM for database access |
| **MongoDB** | NoSQL database |
| **JWT** | Token-based authentication |
| **bcryptjs** | Password hashing |
| **CORS** | Cross-origin resource sharing |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MOBILE APPLICATION                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Native + Expo                                  │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │   │
│  │  │   Screens  │  │  Context   │  │ Components │     │   │
│  │  │            │  │  (State)   │  │            │     │   │
│  │  └────────────┘  └────────────┘  └────────────┘     │   │
│  │         │              │               │             │   │
│  │         └──────────────┴───────────────┘             │   │
│  │                       │                              │   │
│  │                 ┌─────▼──────┐                       │   │
│  │                 │  API Layer │                       │   │
│  │                 │   (Axios)  │                       │   │
│  │                 └─────┬──────┘                       │   │
│  └───────────────────────┼──────────────────────────────┘   │
└─────────────────────────┼────────────────────────────────────┘
                          │
                    HTTPS │ JWT Auth
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                    EXPRESS.JS API                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  RESTful Endpoints                                    │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │   │
│  │  │  Routes  │─▶│Controllers│─▶│ Services │           │   │
│  │  └──────────┘  └──────────┘  └──────────┘           │   │
│  │       │              │              │                │   │
│  │       │        ┌─────▼──────┐       │                │   │
│  │       │        │ Middleware │       │                │   │
│  │       │        │ (Auth/Role)│       │                │   │
│  │       │        └────────────┘       │                │   │
│  │       │                             │                │   │
│  │       └─────────────────────────────┘                │   │
│  │                       │                              │   │
│  │                 ┌─────▼──────┐                       │   │
│  │                 │   Prisma   │                       │   │
│  │                 │    ORM     │                       │   │
│  │                 └─────┬──────┘                       │   │
│  └───────────────────────┼──────────────────────────────┘   │
└─────────────────────────┼────────────────────────────────────┘
                          │
                    ┌─────▼──────┐
                    │  MongoDB   │
                    │  Database  │
                    └────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Expo CLI** - `npm install -g expo-cli`
- **iOS Simulator** (Mac only) or **Android Studio** (for Android development)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/playnxt.git
cd playnxt

# Install dependencies for both frontend and backend
cd PlayNxt && npm install
cd backend && npm install

# Set up environment variables (see Environment Variables section)
cp backend/.env.example backend/.env

# Generate Prisma Client
cd backend && npx prisma generate

# Start the backend server
cd backend && npm run dev

# In a new terminal, start the frontend
cd PlayNxt && npm start
```

---

## 💾 Installation

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="mongodb://localhost:27017/playnxt"
   JWT_SECRET="your-super-secret-jwt-key-change-this"
   JWT_EXPIRES_IN="7d"
   PORT=3000
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

   Server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd PlayNxt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API URL** (if testing on physical device)
   
   Edit `src/services/api.js`:
   ```javascript
   const API_URL = __DEV__
     ? 'http://YOUR_COMPUTER_IP:3000/api'  // Replace with your IP
     : 'https://your-production-api.com/api';
   ```

4. **Start the app**
   ```bash
   # Start Expo
   npm start
   
   # Run on iOS
   npm run ios
   
   # Run on Android
   npm run android
   ```

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB connection string | `mongodb://localhost:27017/playnxt` |
| `JWT_SECRET` | Secret key for JWT token signing | `your-super-secret-key` |
| `JWT_EXPIRES_IN` | JWT token expiration time | `7d` (7 days) |
| `PORT` | Server port number | `3000` |

### Frontend

API URL is automatically configured based on platform in `src/services/api.js`:
- **iOS Simulator**: `http://127.0.0.1:3000/api` (automatically detected)
- **Android Emulator**: `http://10.0.2.2:3000/api` (automatically detected)
- **Physical Device**: Update the code to use your computer's network IP:

```javascript
const getApiUrl = () => {
  if (!__DEV__) {
    return 'https://your-production-api.com/api';
  }
  
  // For physical device testing, uncomment and set your IP:
  // return 'http://192.168.1.X:3000/api';
  
  return Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://127.0.0.1:3000/api';
};
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "USER"  // or "PROVIDER"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

### Venue Endpoints

#### Get All Venues (Public)
```http
GET /venues
```

#### Get Venue by ID
```http
GET /venues/:id
```

#### Create Venue (Provider Only)
```http
POST /venues
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Green Stadium",
  "location": "123 Main St, City",
  "shortLocation": "Downtown",
  "sport": "Football",
  "type": "5-a-side",
  "price": 2000,
  "priceUnit": "90 minutes",
  "image": "https://...",
  "images": ["https://...", "https://..."],
  "about": "Premium football turf...",
  "facilities": [
    {"name": "Parking", "icon": "car"},
    {"name": "Water", "icon": "water"}
  ],
  "availableSlots": {
    "2025-12-10": ["06:00", "07:30", "09:00"]
  },
  "openHours": "6:00 AM - 11:00 PM",
  "contactPhone": "+1234567890"
}
```

#### Update Venue (Owner Only)
```http
PUT /venues/:id
Authorization: Bearer {token}
Content-Type: application/json
```

#### Delete Venue (Owner Only)
```http
DELETE /venues/:id
Authorization: Bearer {token}
```

#### Get My Venues (Provider)
```http
GET /venues/my-venues/list
Authorization: Bearer {token}
```

#### Get Venue Bookings (Owner Only)
```http
GET /venues/:id/bookings
Authorization: Bearer {token}
```

### Booking Endpoints

#### Create Booking
```http
POST /bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "venueId": "...",
  "venueName": "Green Stadium",
  "venueImage": "https://...",
  "date": "2025-12-10",
  "time": "09:00",
  "duration": "90 minutes",
  "price": 2000
}
```

#### Get My Bookings
```http
GET /bookings/my-bookings
Authorization: Bearer {token}
```

#### Cancel Booking
```http
PUT /bookings/:id/cancel
Authorization: Bearer {token}
```

---

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id              String    @id @default(auto()) @map("_id") @db.ObjectId
  name            String
  email           String    @unique
  password        String
  phone           String?
  avatar          String?
  role            UserRole  @default(USER)
  totalBookings   Int       @default(0)
  isEmailVerified Boolean   @default(false)
  lastLogin       DateTime?
  joinedDate      DateTime  @default(now())
  
  bookings         Booking[]
  reviews          Review[]
  ownedVenues      Venue[]   @relation("VenueOwner")
  favoriteVenues   Venue[]   @relation("UserFavorites")
}
```

### Venue Model
```prisma
model Venue {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  name          String
  location      String
  sport         String
  price         Int
  rating        Float    @default(0)
  image         String
  facilities    Facility[]
  availableSlots Json
  
  ownerId       String   @db.ObjectId
  owner         User     @relation("VenueOwner")
  
  bookings      Booking[]
  reviews       Review[]
}
```

### Booking Model
```prisma
model Booking {
  id         String        @id @default(auto()) @map("_id") @db.ObjectId
  userId     String        @db.ObjectId
  venueId    String        @db.ObjectId
  date       DateTime
  time       String
  price      Int
  status     BookingStatus @default(CONFIRMED)
  
  user       User          @relation(fields: [userId])
  venue      Venue         @relation(fields: [venueId])
}
```

---

## 📁 Project Structure

```
playnxt/
├── PlayNxt/                      # Frontend (React Native)
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── CustomButton.js
│   │   │   ├── VenueCard.js
│   │   │   ├── SearchBar.js
│   │   │   └── ...
│   │   ├── context/              # React Context for state management
│   │   │   ├── AppContext.js     # App-wide state
│   │   │   ├── AuthContext.js    # Authentication state
│   │   │   └── appReducer.js     # State reducer
│   │   ├── data/                 # Static data
│   │   │   └── sportsCategories.js
│   │   ├── navigation/           # Navigation configuration
│   │   │   └── navigation.js
│   │   ├── screens/              # App screens
│   │   │   ├── HomeScreen.js
│   │   │   ├── LoginScreen.js
│   │   │   ├── SignupScreen.js
│   │   │   ├── BookingScreen.js
│   │   │   ├── MyBookingsScreen.js
│   │   │   ├── ProfileScreen.js
│   │   │   └── TurfDetailsScreen.js
│   │   ├── services/             # API communication
│   │   │   └── api.js
│   │   ├── theme/                # Design system
│   │   │   └── theme.js
│   │   └── utils/                # Utility functions
│   │       └── storage.js
│   ├── App.js                    # App entry point
│   ├── package.json
│   └── app.json
│
└── backend/                       # Backend (Express.js)
    ├── prisma/
    │   └── schema.prisma          # Database schema
    ├── src/
    │   ├── controllers/           # Business logic
    │   │   ├── authController.js
    │   │   ├── venueController.js
    │   │   └── bookingController.js
    │   ├── middleware/            # Express middleware
    │   │   ├── auth.js            # JWT authentication
    │   │   └── roleAuth.js        # Role-based authorization
    │   ├── routes/                # API routes
    │   │   ├── auth.js
    │   │   ├── venue.js
    │   │   └── booking.js
    │   ├── utils/                 # Utility functions
    │   │   └── jwt.js
    │   └── index.js               # Server entry point
    ├── package.json
    └── .env
```

---

## 🔒 Authentication Flow

```
┌─────────────┐
│  Client App │
└──────┬──────┘
       │
       │ 1. POST /auth/register or /auth/login
       │    { email, password }
       ▼
┌─────────────┐
│   Express   │
│   Server    │
└──────┬──────┘
       │
       │ 2. Validate credentials
       │ 3. Hash password (bcrypt)
       │ 4. Generate JWT token
       │
       ▼
┌─────────────┐
│  MongoDB    │
└──────┬──────┘
       │
       │ 5. Return user + token
       ▼
┌─────────────┐
│  Client App │
│ (AsyncStorage)
└──────┬──────┘
       │
       │ 6. Store token locally
       │ 7. Include in Authorization header
       │    Authorization: Bearer {token}
       ▼
┌─────────────┐
│   Protected │
│   Endpoint  │
└──────┬──────┘
       │
       │ 8. Verify JWT
       │ 9. Check role (if needed)
       │ 10. Process request
       ▼
     Success!
```

---

## 🎨 UI/UX Features

- **Glassmorphism Design** - Modern frosted glass effects
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Dark Theme Support** - Easy on the eyes
- **Responsive Layouts** - Optimized for all screen sizes
- **Loading States** - Beautiful skeleton screens
- **Error Handling** - User-friendly error messages
- **Empty States** - Helpful guidance when no data exists

---

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd PlayNxt
npm test
```

### Manual Testing Checklist

- [x] User registration and login
- [x] Venue browsing and filtering
- [x] Booking creation and cancellation
- [x] Provider venue management
- [x] Role-based access control
- [x] API error handling
- [x] Token expiration handling

---

## 🚀 Deployment

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create playnxt-api

# Set environment variables
heroku config:set DATABASE_URL="mongodb+srv://..."
heroku config:set JWT_SECRET="your-secret"

# Deploy
git push heroku main

# Open app
heroku open
```

### Frontend Deployment (EAS Build)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Use meaningful variable names
- Follow existing code patterns
- Add comments for complex logic
- Write tests for new features

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Priyabrata Singh** - *Initial work* - [GitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- React Native Community
- Expo Team
- Prisma Team
- MongoDB
- All contributors

---

## 📞 Support

For support, email priyabrata@playnxt.com or open an issue in this repository.

---

## 🗺️ Roadmap

- [ ] Payment integration (Stripe/Razorpay)
- [ ] Push notifications
- [ ] In-app chat between users and providers
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Review and rating system
- [ ] Loyalty program

---

<div align="center">

**Made with ❤️ by the PlayNxt Team**

[⬆ Back to Top](#-playnxt---sports-venue-booking-platform)

</div>
