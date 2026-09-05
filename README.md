# 1Fi Marketplace — SDE Intern Assignment

A full-stack **1Fi Marketplace** application built as a seamless extension of the 1Fi fintech platform. Allows users to browse products, select variants, calculate dynamic EMI plans, manage user authentication, and place/view orders through a responsive, mobile-first design system.

---

## 🌟 Key Features

- 📱 **Mobile-First App Shell**: Native-like bottom navigation, top app bar, and responsive layout system optimized for mobile & desktop.
- 🛒 **Product Browsing & Discovery**: Filter products by category, search by query, and view high-resolution image carousels with stock status indicators.
- ⚙️ **Dynamic Variant System**: Interactive variant selection (storage, color, size, configuration) with real-time price modifier updates.
- 💳 **Flexible EMI Calculator**: Interactive tenure selection (3, 6, 9, 12+ months) with accurate interest rate calculations, down payment adjustments, and monthly breakdown.
- 🔐 **Authentication & Security**: JWT-based login and registration with bcrypt password hashing, persistent sessions via Zustand store, and protected backend routes.
- 📦 **Order Management**: Comprehensive checkout flow, order placement, confirmation screens, and an order history page (`/account/orders`).
- 🎨 **1Fi Design System**: Built with Vanilla CSS tokens mirroring 1Fi's brand palette (`#7C3AED` 1Fi purple, custom surfaces, smooth micro-interactions).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (Pages Router) + TypeScript
- **Styling**: Custom Design Token System in Vanilla CSS (No Tailwind)
- **State Management**: Zustand (Persisted Auth Store & Marketplace Store)
- **HTTP Client**: Axios (with centralized auth header interceptors)
- **Icons**: Lucide React

### Backend
- **Runtime**: Express 5 (Node.js)
- **Database & ORM**: SQLite + Prisma ORM
- **Authentication**: JSON Web Tokens (JWT) + bcryptjs
- **Middleware**: Express JSON parser, CORS, JWT Auth Guard

---

## 📁 Project Structure

```
1Fi SDE Intern Assignment/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema (User, Product, Variant, EMIPlan, Order)
│   │   ├── dev.db                 # SQLite database file
│   │   └── migrations/            # Database migrations
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Prisma Client singleton
│   │   ├── controllers/
│   │   │   ├── authController.js        # User auth (register, login, getMe)
│   │   │   ├── marketplaceController.js # Product catalog & details
│   │   │   └── orderController.js       # Order creation & retrieval
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js        # Protect routes using JWT verify
│   │   ├── routes/
│   │   │   ├── authRoutes.js            # /api/auth
│   │   │   ├── marketplaceRoutes.js     # /api/marketplace
│   │   │   └── orderRoutes.js           # /api/orders
│   │   ├── services/
│   │   │   ├── authService.js           # Token generation & validation
│   │   │   └── emiCalculator.js         # Standard & reducing EMI formulas
│   │   ├── seed.js                      # Seed data script with realistic catalog
│   │   └── server.js                    # Express app initialization
│   ├── .env                             # Backend environment variables
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── components/
    │   ├── layout/                      # AppBar, BottomNav, MobileLayout
    │   └── marketplace/                 # ProductCard, ProductGallery, VariantSelector, EMIPlanSelector, SpecificationList
    ├── lib/                             # axios.ts, emiUtils.ts
    ├── pages/
    │   ├── _app.tsx                     # Global layout wrapper & providers
    │   ├── _document.tsx                # HTML meta & fonts initialization
    │   ├── index.tsx                    # Home page redirect to /shop
    │   ├── account.tsx                  # User Profile page
    │   ├── help.tsx                     # Support & FAQ page
    │   ├── terms.tsx                    # Terms & Conditions
    │   ├── wallet.tsx                   # Wallet & Credit Balance page
    │   ├── account/
    │   │   └── orders.tsx               # Order history & status list
    │   ├── auth/
    │   │   ├── login.tsx                # Login page
    │   │   └── register.tsx             # Account registration
    │   └── shop/
    │       ├── index.tsx                # Shop landing with Marketplace banner
    │       └── marketplace/
    │           ├── index.tsx            # Marketplace catalog & filters
    │           ├── [id].tsx             # Product detail view
    │           └── order-success.tsx    # Order confirmation screen
    ├── services/                        # marketplaceService.ts, authService.ts
    ├── store/                           # authStore.ts, marketplaceStore.ts
    ├── styles/                          # globals.css (Design System Tokens)
    └── package.json
```

---

## 📡 API Endpoints Summary

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ Public | Register a new user account |
| `POST` | `/api/auth/login` | ❌ Public | Authenticate user & return JWT token |
| `GET`  | `/api/auth/me` | 🔒 Protected | Fetch authenticated user profile |

### Marketplace Routes (`/api/marketplace`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET`  | `/api/marketplace/products` | ❌ Public | List products (supports category filter & search) |
| `GET`  | `/api/marketplace/products/:id` | ❌ Public | Get detailed product by ID with variants & EMI plans |
| `GET`  | `/api/marketplace/categories` | ❌ Public | Get list of distinct product categories |

### Order Routes (`/api/orders`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/orders` | 🔒 Protected | Create a new product order with selected variant & EMI plan |
| `GET`  | `/api/orders` | 🔒 Protected | Get list of orders placed by the current user |
| `GET`  | `/api/orders/:id` | 🔒 Protected | Get specific order details by Order ID |

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Run database migrations / seed (if re-initializing)
npx prisma db push
node src/seed.js

# Start the dev server
npm run dev
```
Backend API will start at: `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
Frontend Web Application will start at: `http://localhost:3000`

---

## 🔄 User Navigation Flow

```
/ (Home)
 └── /shop (Main 1Fi Shop View)
      └── Click "1Fi Marketplace" Hero Banner
           └── /shop/marketplace (Catalog with Category Tabs & Search)
                └── Select Product Card
                     └── /shop/marketplace/[id] (Gallery, Variant Picker, EMI Selector)
                          └── Click "Proceed to Buy"
                               ├── If Guest ──> Redirect to /auth/login ──> Return to Checkout
                               └── If Logged In ──> Place Order ──> /shop/marketplace/order-success
                                                                        └── View in /account/orders
```

---

## 🎨 Design System & Styling

- **Primary Color**: `#7C3AED` (1Fi Vibrant Purple)
- **Accent Color**: `#6D28D9` / `#A78BFA`
- **Background**: `#F9F8FF` (Light Lavender tint for surface contrast)
- **Card Surfaces**: Pure White (`#FFFFFF`) with subtle shadow tokens (`rgba(124, 58, 237, 0.06)`)
- **Typography**: Inter (Body text) + Manrope (Headings) via Google Fonts
- **Layout Constraint**: Mobile app shell constrained to `max-width: 480px` centered for seamless desktop preview while preserving mobile feel.

---

## ⚙️ Environment Variables Configuration

### Backend (`backend/.env`)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret_key_here"
FRONTEND_URL="http://localhost:3000"
PORT=5000
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

---

## 🧪 Verification & Testing

1. **Auth Test**:
   - Register a new user at `/auth/register`.
   - Log in at `/auth/login` to confirm JWT token storage in `localStorage` / `authStore`.
2. **Catalog & Filters**:
   - Filter by categories (Electronics, Smartphones, Laptops, Audio, Accessories).
   - Test real-time search query filtering.
3. **EMI & Variant Calculation**:
   - Change variant options to verify price adjustments.
   - Switch tenure months in EMI plan selector to observe calculated monthly breakdown.
4. **Order History**:
   - Complete checkout and navigate to `/account/orders` to view placed orders with status badges and variant breakdown.
