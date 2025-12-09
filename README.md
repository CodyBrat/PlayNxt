<div align="center">
  
# 🏟️ PlayNxt

### *Find. Book. Play.*

**The Ultimate Sports Venue Booking Platform**

[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

<br/>

[🎬 Watch Demo](#-demo) • [✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📖 Docs](#-api-documentation) • [🤝 Contribute](#-contributing)

---

</div>

<br/>

## 🎬 Demo
<div align="center">
https://drive.google.com/file/d/1GcO2O99T20hHCncjNsEBIO5FcDs0t74F/view?usp=sharing
</div>

---

## � What is PlayNxt?

**PlayNxt** is a sleek, modern sports venue booking app that bridges the gap between **sports enthusiasts** and **venue owners**. Whether you're looking to book a football turf for a weekend match or manage your sports facility, PlayNxt makes it seamless.

<div align="center">

| 🎯 **For Players** | 🏢 **For Providers** |
|:-:|:-:|
| Discover & book venues instantly | List & manage your venues |
| Real-time slot availability | Track bookings & revenue |
| Save favorites for quick access | Customer insights dashboard |
| Easy cancellations | Media & pricing control |

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏃 **Players**
- 🔍 **Smart Discovery** — Browse by sport, location, rating
- 📅 **Instant Booking** — Real-time availability
- ⭐ **Favorites** — Quick access to loved venues
- � **Booking History** — Track all your games
- 🏆 **Reward Points** — Earn as you play!

</td>
<td width="50%">

### 🏟️ **Providers**
- 📊 **Dashboard Analytics** — Revenue & booking insights
- 🖼️ **Rich Listings** — Photos, facilities, pricing
- � **Customer Management** — View booking details
- ⏰ **Slot Control** — Flexible time management
- 📱 **Mobile First** — Manage on the go

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                      📱 FRONTEND                             │
│  React Native • Expo • React Navigation • Axios             │
└─────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────┐
│                       🔧 BACKEND                             │
│  Node.js • Express.js • JWT Auth • bcrypt                   │
└─────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────┐
│                      🗄️ DATABASE                             │
│  MongoDB • Prisma ORM                                        │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm or yarn
MongoDB (local or Atlas)
Expo CLI
```

### 1️⃣ Clone & Install

```bash
# Clone the repo
git clone https://github.com/yourusername/playnxt.git
cd playnxt/PlayNxt

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### 2️⃣ Configure Environment

```bash
# Create .env in backend/
cp .env.example .env

# Edit with your values:
DATABASE_URL="mongodb://localhost:27017/playnxt"
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### 3️⃣ Launch! 🚀

```bash
# Terminal 1: Start Backend
cd backend && npm run dev

# Terminal 2: Start Frontend
cd PlayNxt && npm start
```

<div align="center">

| Platform | Command |
|:--------:|:-------:|
| 📱 iOS | `npm run ios` |
| 🤖 Android | `npm run android` |
| 🌐 Web | `npm run web` |

</div>

---

## 📡 API Documentation

<details>
<summary><b>🔐 Authentication</b></summary>

```http
POST /api/auth/register    # Create account
POST /api/auth/login       # Login & get token
GET  /api/auth/me          # Get current user
PUT  /api/auth/profile     # Update profile
POST /api/auth/logout      # Logout
```

</details>

<details>
<summary><b>🏟️ Venues</b></summary>

```http
GET    /api/venues              # List all venues
GET    /api/venues/:id          # Get venue details
POST   /api/venues              # Create venue (Provider)
PUT    /api/venues/:id          # Update venue (Owner)
DELETE /api/venues/:id          # Delete venue (Owner)
GET    /api/venues/my-venues/list   # My venues (Provider)
```

</details>

<details>
<summary><b>📅 Bookings</b></summary>

```http
POST /api/bookings              # Create booking
GET  /api/bookings/my-bookings  # My bookings
PUT  /api/bookings/:id/cancel   # Cancel booking
```

</details>

---

## 📁 Project Structure

```
PlayNxt/
├── 📱 src/
│   ├── 🧩 components/     # Reusable UI components
│   ├── 🎭 context/        # State management (React Context)
│   ├── 📍 navigation/     # App navigation
│   ├── 📺 screens/        # App screens
│   ├── 🔌 services/       # API layer
│   └── 🎨 theme/          # Design system
│
└── 🔧 backend/
    ├── 📐 prisma/         # Database schema
    ├── 🎮 controllers/    # Business logic
    ├── 🛡️ middleware/     # Auth & validation
    └── 🛤️ routes/         # API endpoints
```

---

## 🎨 Design Philosophy

<div align="center">

| 🌙 Dark Mode | 💎 Glassmorphism | ⚡ Smooth Animations |
|:------------:|:----------------:|:--------------------:|
| Easy on eyes | Modern aesthetics | Fluid interactions |

</div>

- **Mobile-First** — Optimized for touch
- **Accessible** — Clear typography & contrast
- **Performant** — Fast load times, smooth scrolling

---

## 🗺️ Roadmap

- [x] Core booking flow
- [x] Provider dashboard
- [x] Reward points system
- [x] Cross-device image sync
- [ ] 💳 Payment integration (Razorpay/Stripe)
- [ ] 🔔 Push notifications
- [ ] 💬 In-app messaging
- [ ] ⭐ Reviews & ratings
- [ ] 🌍 Multi-language support

---

## 🤝 Contributing

We love contributions! Check out our [**Contributing Guide**](CONTRIBUTING.md) to get started.

```bash
# Fork → Clone → Branch → Code → Test → PR
git checkout -b feature/awesome-feature
git commit -m "Add awesome feature"
git push origin feature/awesome-feature
```

---

## 📝 License

MIT License — feel free to use this project for learning and building!

---

<div align="center">

### � Built with ❤️ by Priyabrata Singh

[![GitHub](https://img.shields.io/badge/GitHub-CodyBrat-181717?style=for-the-badge&logo=github)](https://github.com/CodyBrat)

**If you found this helpful, give it a ⭐!**

</div>
