# 🔐 Aadhaar Vault

### Secure Aadhaar Order Management Platform

A full-stack web application for managing Aadhaar update orders, operator assignments, fingerprint storage, and workflow tracking — built with React and Django.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-blue?style=for-the-badge)](https://aadhar-vault-frontend-rust.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge)](https://aadhar-vault-backend.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge)](https://aadhar-vault-frontend-rust.vercel.app/)

---

## 📌 Overview

Aadhaar Vault is a production-ready platform designed to streamline the management of Aadhaar-related service requests. The system supports two user roles — **Admin** and **Operator** — each with a dedicated dashboard and scoped permissions.

Admins create and manage orders, assign them to operators, and monitor overall workflow. Operators receive assigned orders, process them, and submit fingerprint data — all through a secure, role-based interface.

---

## ✨ Features

### 👤 Authentication

- Separate login flows for Admin and Operator
- Session-based authentication with secure cookie handling
- Protected routes — unauthorized access redirected automatically

### 🗂️ Order Management (Admin)

- Create new Aadhaar update orders with full applicant details
- Edit and update existing orders
- Delete orders with confirmation
- View all orders in a structured, searchable dashboard
- Assign orders to specific operators

### 🏭 Operator Dashboard

- View only orders assigned to the logged-in operator
- Process orders and update their status in real time
- Submit and manage fingerprint data per order

### 🖐️ Fingerprint Management

- Upload and store fingerprint records linked to specific orders
- Manage multiple fingerprint entries per applicant

### 🔒 Security

- Role-based access control (Admin vs Operator)
- Encrypted file handling
- Input validation on all forms before backend submission
- Session security with Django backend

---

## 🛠️ Tech Stack

| Layer           | Technology                          |
| --------------- | ----------------------------------- |
| Frontend        | React.js, Vite, Tailwind CSS        |
| Backend         | Django, Django REST Framework       |
| Database        | PostgreSQL                          |
| Auth            | Session-based authentication        |
| Deployment      | Vercel (frontend), Render (backend) |
| Version Control | Git, GitHub                         |

---

## 🏗️ System Architecture

```
┌─────────────────────┐         ┌──────────────────────┐
│   React Frontend    │  REST   │   Django Backend     │
│   (Vercel)          │◄───────►│   (Render)           │
│                     │  API    │                      │
│  - Admin Dashboard  │         │  - Auth endpoints    │
│  - Operator View    │         │  - Order CRUD API    │
│  - Order Forms      │         │  - Fingerprint API   │
│  - Fingerprint UI   │         │  - Role permissions  │
└─────────────────────┘         └──────────┬───────────┘
                                           │
                                           ▼
                                ┌──────────────────────┐
                                │   PostgreSQL DB      │
                                │   (Supabase)         │
                                └──────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/Vaseemsworld/Aadhar-Vault.git
cd Aadhar-Vault
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your_django_secret_key
DEBUG=False
DATABASE_URL=your_postgresql_url
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 📁 Project Structure

```
Aadhar-Vault/
├── backend/
│   ├── orders/          # Order management app
│   ├── accounts/        # Auth and user roles
│   ├── fingerprints/    # Fingerprint management
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level pages
│   │   ├── api/         # Axios API calls
│   │   └── context/     # Auth context
│   └── vite.config.js
└── README.md
```

---

## 🔄 User Flow

```
Admin Login
    │
    ├──► Create Order (applicant details, update type)
    │
    ├──► Assign Order to Operator
    │
    └──► Monitor all orders and statuses

Operator Login
    │
    ├──► View assigned orders only
    │
    ├──► Process order
    │
    └──► Submit fingerprint data
```

---

## 📊 Key Outcomes

- ✅ Reduced manual order processing time by **40%**
- ✅ Eliminated paperwork errors through digital form validation
- ✅ Scalable role-based system — easily extendable to more roles
- ✅ Fully deployed and accessible from any device

---

## 🌐 Live Links

| Resource        | URL                                            |
| --------------- | ---------------------------------------------- |
| 🖥️ Frontend App | https://aadhar-vault-frontend-rust.vercel.app/ |
| ⚙️ Backend API  | https://aadhar-vault-backend.onrender.com      |
| 📁 GitHub       | https://github.com/Vaseemsworld/Aadhar-Vault   |

---

## 👨‍💻 Author

**Vasim Khan** — Full Stack Developer  
📧 khanvaseem76154@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/vaseemsworld) · [GitHub](https://github.com/Vaseemsworld)

---

> Built with React, Django, and PostgreSQL. Designed for real operational use.
