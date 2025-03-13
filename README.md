# FLUX:
Full-Stack Authentication & Content Management System
## Overview
This project is a full-stack authentication and content management system built with **NestJS** (backend) and **Next.js** (frontend). It supports role-based access control (RBAC) for two types of content:

- **Posts**: Can be managed by both Users and Admins.
- **Blogs**: Only Admins can create, update, and delete, while Users can only view.

### User Roles & Permissions:
- **Admin**: Full CRUD access to Posts & Blogs.
- **Regular User**: Can create, update, and delete their own Posts but only view Blogs.

## Features
### 1. Authentication (Signup & Login)
- Users sign up and log in using **email and password**.
- Passwords are securely hashed using **bcrypt**.
- Authentication is managed using **JWT (JSON Web Tokens)**.
- Frontend validation is implemented with **Zod**.
- Users are redirected to the dashboard based on their role after login.

### 2. User Roles & Authorization
- **Role-Based Access Control (RBAC)** is implemented using **NestJS Guards**.
- Different permissions for **Admin** and **Regular Users**.

### 3. CRUD Operations
#### **Posts (For Both Admins & Users)**
- **Fields**: `image`, `content`, `date`, `author`
- **Admin & Users can**:
  - Create new posts
  - Update their own posts
  - Delete their own posts
  - View all posts
- **Search & Filter**:
  - Users can search posts by **content** or **date**.
  - Pagination is implemented for better performance.

#### **Blogs (For Admin Only)**
- **Fields**: `image`, `title`, `content`, `created_at`
- **Admin can**:
  - Create, update, delete, and view all blogs.
- **Users can**:
  - Only view blogs.

### 4. Styling
- Uses **Tailwind CSS** for a clean and responsive UI.
- Ensures mobile-friendly design.

## Tech Stack
### **Backend (NestJS)**
- **NestJS** (with TypeScript)
- **PostgreSQL** (database)
- **TypeORM** (ORM for database management)
- **JWT Authentication** (for user sessions)
- **Guards** (for role-based access control)
- **Multer** (for image uploads)

### **Frontend (Next.js)**
- **Next.js** (React framework for SSR & CSR rendering)
- **React Hook Form** (with **Zod** for validation)
- **React Query** (for efficient API requests)
- **Tailwind CSS** (for styling)

## Installation & Setup
### Prerequisites
- Node.js (v16+)
- PostgreSQL

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Backend Setup (NestJS)
```bash
cd backend
npm install
```
- Create a `.env` file and configure database credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
JWT_SECRET=your-secret-key
```
- Run migrations and start the backend server:
```bash
npm run migration:run
npm run start:dev
```

### 3. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### 4. Access the App
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

## Contributing
Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

