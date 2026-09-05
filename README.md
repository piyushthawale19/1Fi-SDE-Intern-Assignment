# 1Fi Marketplace — SDE Intern Assignment

A full-stack **1Fi Marketplace** feature built as a natural extension of the 1Fi fintech application. Allows users to browse products, select variants, choose EMI plans, and complete purchases through a mobile-first UI.

---

## Tech Stack

### Frontend
- **Next.js 14** (Pages Router) + **TypeScript**
- **Vanilla CSS** with custom design token system (no Tailwind)
- **Zustand** for state management
- **Axios** for API communication
- **Lucide React** for icons

### Backend
- **Express 5** (Node.js)
- **Prisma ORM** + **SQLite**
- **JWT** for authentication
- **bcrypt** for password hashing

---

## Project Structure

```
1Fi SDE Intern Assignment/
├── backend/
│   ├── prisma/schema.prisma       # DB models
│   ├── src/
│   │   ├── config/db.js           # Prisma singleton
│   │   ├── controllers/           # authController, marketplaceController, orderController
│   │   ├── middlewares/           # JWT auth middleware
│   │   ├── routes/                # authRoutes, marketplaceRoutes, orderRoutes
│   │   ├── services/              # authService, emiCalculator
│   │   ├── seed.js                # 8 realistic products with variants + EMI plans
│   │   └── server.js
│   ├── .env                       # Environment variables (gitignored)
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── components/
    │   ├── layout/                # AppBar, BottomNav, MobileLayout
    │   └── marketplace/           # ProductCard, ProductGallery, VariantSelector, EMIPlanSelector, SpecificationList
    ├── lib/                       # axios.ts, emiUtils.ts
    ├── pages/
    │   ├── auth/login.tsx         # Login
    │   ├── auth/register.tsx      # Register
    │   ├── shop/index.tsx         # Shop home
    │   └── shop/marketplace/      # Listing, [id] detail, order-success
    ├── services/                  # marketplaceService.ts, authService.ts
    ├── store/                     # authStore.ts, marketplaceStore.ts
    ├── styles/globals.css         # Complete 1Fi design token system
    └── package.json
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register user |
| POST | `/api/auth/login` | ❌ | Login, receive JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/marketplace/products` | ❌ | List products (search, category) |
| GET | `/api/marketplace/products/:id` | ❌ | Product detail + variants + EMI plans |
| GET | `/api/marketplace/categories` | ❌ | Available categories |
| POST | `/api/orders` | ✅ | Place order |
| GET | `/api/orders/:id` | ✅ | Get order by ID |

---

## Getting Started

### 1. Backend

```bash
cd backend
npm install
# Database is already initialized — just run:
npm run dev
```

Server runs at `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000`

---

## User Flow

```
/ → /shop
→ Click "1Fi Marketplace" banner
→ /shop/marketplace (browse, search, filter by category)
→ Click a product
→ /shop/marketplace/[id] (gallery, variants, EMI plans)
→ Select variant + EMI plan
→ "Sign in to Buy" → /auth/login (if not authenticated)
→ "Proceed" → places order → /shop/marketplace/order-success
```

---

## Design Language

- **Primary**: `#7C3AED` (1Fi purple)
- **Background**: `#F9F8FF` (very light lavender)
- **Surfaces**: White cards with subtle `rgba(124,58,237,0.06)` shadows
- **Fonts**: Manrope (headings) + Inter (body)
- **Mobile-first**: Max-width 480px app shell, bottom navigation

---

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
PORT=5000
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
