# 🏢 Building Management System (Client)

A comprehensive web application designed to manage a single building's operations. This platform connects Residents (Members), Regular Users, and Administrators, offering seamless management of apartments, agreements, payments, and announcements.

## 🔗 Project Links
- **🚀 Live Site:** https://building-management-system-client.vercel.app/
- **⚙️ Server Repository:** https://github.com/MahinAnowar/building-management-system-server

## 🔑 Admin Credentials (For Testing)
- **Email:** `admin@bms.com`
- **Password:** `Password123`
*(Use these credentials to access the full Admin Dashboard)*

## 🛠️ Technology Stack
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Custom themes & Responsive components)
- **Authentication:** Firebase (Email/Password & Google Login)
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **Forms:** React Hook Form
- **Data Fetching:** Axios (with custom Interceptors for JWT)
- **Maps:** React Leaflet / Leaflet
- **Animations:** Framer Motion (Optional features), Swiper JS (Banner)

## 🌟 Key Features

### 🌍 General (Public)
- **Responsive Navbar:** Dynamic navigation based on user roles.
- **Home Page:** Features a Location Map, "About the Building" section, and Coupon codes.
- **Apartment Listing:** Browse available rooms with server-side Pagination and Rent Range filtering.
- **Agreement System:** Users can request an agreement for an apartment directly via the UI.

### 👤 User Dashboard (Role: User)
- **Profile:** View basic profile information.
- **Announcements:** Read updates posted by the building admin.

### 🏘️ Member Dashboard (Role: Member - Verified Tenants)
- **Payment Portal:** Pay monthly rent with a month selector.
- **Coupon System:** Apply discount coupons (validated via API) to reduce rent total.
- **Payment History:** View historical records of successful transactions.
- **Lease Info:** View specific agreement details (Floor, Block, Room No).

### 🛡️ Admin Dashboard (Role: Admin)
- **Statistics:** View Total Rooms, % Booked/Available, and User counts.
- **Manage Members:** Remove members (downgrade role to user).
- **Agreement Requests:** Accept (converts user to member) or Reject agreements.
- **Manage Coupons:** Create, Delete, and Update availability of coupons.
- **Announcements:** Post news for all registered users.

## 📦 Dependencies
- `@tanstack/react-query`
- `axios`
- `firebase`
- `react-helmet-async`
- `react-hot-toast`
- `sweetalert2`
- `localforage` & `match-sorter`

## ⚙️ Run Locally
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
