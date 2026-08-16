# E-Commerce Monorepo

A full-stack e-commerce platform built as a monorepo powered by **Nx** and **pnpm**.

---

## Workspace Architecture

```text
store/
├── backend/                  # Node.js Express REST API (TypeScript)
│   ├── src/
│   │   ├── controllers/      # Route controllers (Auth, Products, Cart, Orders, Admin, etc.)
│   │   ├── database/         # Database connection & migrations (PostgreSQL)
│   │   ├── middleware/       # Auth guards & error handling
│   │   ├── routes/           # API endpoints
│   │   ├── services/         # Business logic
│   │   └── validators/       # Request validation (Zod)
│   └── package.json
│
├── frontend/                 # React SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── components/       # UI & layout components (TailwindCSS + Shadcn)
│   │   ├── hooks/            # Custom React hooks & TanStack Query hooks
│   │   ├── pages/            # App pages (Storefront, Cart, Checkout, Admin)
│   │   └── store/            # Client state management (Zustand)
│   └── package.json
│
├── nx.json                   # Nx monorepo & task caching configuration
├── pnpm-workspace.yaml       # pnpm workspace definition
└── package.json              # Root scripts and dev dependencies
```

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS v4 + Base UI / Shadcn
- **Routing**: React Router v8
- **Data Fetching**: TanStack React Query v5
- **State Management**: Zustand
- **Form & Validation**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js + Express 5
- **Language**: TypeScript + `tsx`
- **Database**: PostgreSQL (`pg`)
- **Authentication**: JWT & HTTP cookies
- **Validation**: Zod & bcrypt

### Monorepo & Tooling
- **Orchestration & Cache**: [Nx](https://nx.dev)
- **Package Manager**: [pnpm](https://pnpm.io) (v10)
- **Linter & Formatter**: Oxlint & Biome

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20+` or `v22+` (tested on Node v24)
- **pnpm**: `v10+` (`corepack enable pnpm` or `npm i -g pnpm`)
- **PostgreSQL**: Running instance for backend database

### 1. Installation
Install all dependencies across the workspace:
```bash
pnpm install
```

### 2. Environment Configuration
Create environment files for both apps:

**Backend (`backend/.env`)**:
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/store
JWT_SECRET=your_jwt_secret
```

**Frontend (`frontend/.env`)**:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 💻 Development Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start both **backend** and **frontend** concurrently via Nx |
| `pnpm dev:frontend` | Start only the frontend Vite development server |
| `pnpm dev:backend` | Start only the backend API server in watch mode |
| `pnpm build` | Build all projects with Nx caching |
| `pnpm build:frontend` | Build frontend for production |
| `pnpm build:backend` | Compile backend TypeScript to `dist/` |
| `pnpm nx show projects` | List all projects in the workspace |
| `pnpm nx graph` | Visualize project dependency graph |

---

## 📦 Managing Packages

To add dependencies to a specific project:
```bash
# Add to frontend
pnpm add <package-name> --filter frontend

# Add to backend
pnpm add <package-name> --filter backend

# Add workspace-level dev dependency
pnpm add -w -D <package-name>
```

---

## Screenshots
![screenshot](https://raw.githubusercontent.com/Magesh-sam/store/refs/heads/master/screenshots/FireShot%20Capture%20001%20-%20e-commerce%20-%20%5Blocalhost%5D.png)
![screenshot](https://raw.githubusercontent.com/Magesh-sam/store/refs/heads/master/screenshots/FireShot%20Capture%20002%20-%20e-commerce%20-%20%5Blocalhost%5D.png)
![screenshot](https://raw.githubusercontent.com/Magesh-sam/store/refs/heads/master/screenshots/FireShot%20Capture%20003%20-%20e-commerce%20-%20%5Blocalhost%5D.png)
![screenshot](https://raw.githubusercontent.com/Magesh-sam/store/refs/heads/master/screenshots/FireShot%20Capture%20004%20-%20e-commerce%20-%20%5Blocalhost%5D.png)
![screenshot](https://raw.githubusercontent.com/Magesh-sam/store/refs/heads/master/screenshots/FireShot%20Capture%20005%20-%20e-commerce%20-%20%5Blocalhost%5D.png)
![screenshot](https://raw.githubusercontent.com/Magesh-sam/store/refs/heads/master/screenshots/FireShot%20Capture%20006%20-%20e-commerce%20-%20%5Blocalhost%5D.png)
![screenshot](https://raw.githubusercontent.com/Magesh-sam/store/refs/heads/master/screenshots/FireShot%20Capture%20007%20-%20e-commerce%20-%20%5Blocalhost%5D.png)
![screenshot](https://raw.githubusercontent.com/Magesh-sam/store/refs/heads/master/screenshots/FireShot%20Capture%20008%20-%20e-commerce%20-%20%5Blocalhost%5D.png)
![screenshot](https://raw.githubusercontent.com/Magesh-sam/store/refs/heads/master/screenshots/FireShot%20Capture%20009%20-%20e-commerce%20-%20%5Blocalhost%5D.png)


