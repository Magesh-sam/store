# AGENTS.md

# E-Commerce Backend Project Guide

## Project Overview

Build a production-style REST API for an e-commerce application using:

- Node.js
- Express
- PostgreSQL

The objective is to learn backend development by implementing features incrementally rather than building everything at once.

---

# Tech Stack

- Node.js
- Express
- PostgreSQL
- TypeScript
- JWT Authentication
- bcrypt
- dotenv
- Zod
- Jest
- Supertest

---

# Development Principles

- Keep controllers thin.
- Put business logic inside services.
- Repository layer should only communicate with PostgreSQL.
- Validate every request.
- Never trust client input.
- Use transactions where multiple database writes must succeed together.
- Write clean, readable code.
- Prefer composition over duplication.
- Handle all errors centrally.
- Keep functions focused on one responsibility.

---

# Project Structure

```
ecommerce-api/
│
├── src/
│   ├── config/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── validators/
│   ├── utils/
│   ├── types/
│   ├── app.ts
│   └── server.ts
│
├── sql/
├── tests/
├── .env
├── package.json
└── tsconfig.json
```

---

# Architecture

```
Client

↓

Route

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

PostgreSQL

↓

Response
```

---

# Development Roadmap

## Phase 1 — Project Setup

### Goals

- Express server
- PostgreSQL connection
- Environment variables
- Routing
- Global error handler
- Logging
- Basic folder structure

---

## Phase 2 — Authentication

### Learn

- Registration
- Login
- Password hashing
- JWT
- Refresh tokens
- Authentication middleware
- Authorization middleware

### Database

users

### Endpoints

POST /auth/register

POST /auth/login

POST /auth/refresh

GET /auth/me

---

## Phase 3 — Categories

### CRUD

- Create category
- Update category
- Delete category
- List categories

### Database

categories

---

## Phase 4 — Products

### CRUD

Fields

- id
- name
- description
- price
- stock
- category_id
- image_url
- created_at
- updated_at

### Features

- Pagination
- Search
- Sorting
- Filtering

---

## Phase 5 — Shopping Cart

### Features

- Add item
- Remove item
- Update quantity
- Clear cart
- View cart

### Database

carts

cart_items

---

## Phase 6 — Orders

Workflow

Cart

↓

Checkout

↓

Validate Stock

↓

Create Order

↓

Insert Order Items

↓

Reduce Stock

↓

Clear Cart

### Database

orders

order_items

Use PostgreSQL transactions.

---

## Phase 7 — Reviews

Features

- Add review
- Edit own review
- Delete own review
- List reviews

---

## Phase 8 — Wishlist

Features

- Add product
- Remove product
- List wishlist

---

## Phase 9 — Admin APIs

Admin can

- Manage products
- Manage categories
- View users
- View orders

---

# Database Tables

users

categories

products

carts

cart_items

orders

order_items

reviews

wishlists

---

# PostgreSQL Topics

Learn while building.

- Primary Keys
- Foreign Keys
- Constraints
- Indexes
- UNIQUE
- CHECK
- NOT NULL
- JOIN
- GROUP BY
- Aggregate Functions
- Transactions
- Views
- Triggers (optional)

---

# Express Topics

- Routers
- Middleware
- Error handling
- Async handlers
- Authentication middleware
- Authorization middleware
- Request lifecycle
- Static files
- File uploads

---

# Node.js Topics

- Event Loop
- Modules
- Streams
- Buffers
- File System
- Environment Variables
- Promises
- Async/Await

---

# Validation

Every endpoint should validate

- Body
- Params
- Query

Use Zod.

---

# Error Handling

Implement a centralized error handler.

Return consistent error responses.

Example

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

# Security Checklist

- Hash passwords
- Validate input
- Sanitize input
- Never expose passwords
- Use JWT expiration
- Protect admin routes
- Use parameterized SQL queries
- Store secrets in .env

---

# API Development Order

1. Health Check

2. Authentication

3. Categories

4. Products

5. Cart

6. Orders

7. Reviews

8. Wishlist

9. Admin APIs

---

# Testing

Write tests for

- Authentication
- Products
- Cart
- Orders

Use

- Jest
- Supertest

---

# Git Commit Milestones

- Initial project setup
- PostgreSQL connection
- Authentication
- JWT middleware
- Category CRUD
- Product CRUD
- Product search
- Shopping cart
- Checkout
- Orders
- Reviews
- Wishlist
- Admin APIs
- Tests
- Deployment

---

# Definition of Done

A feature is complete only when it includes

- Database changes
- Validation
- Service logic
- Repository queries
- Routes
- Controller
- Error handling
- Tests
- Documentation

---

# Final Feature Checklist

- User authentication
- Role-based authorization
- Product CRUD
- Category CRUD
- Product search
- Pagination
- Filtering
- Sorting
- Shopping cart
- Checkout
- Orders
- Order history
- Reviews
- Wishlist
- Admin dashboard APIs
- Validation
- Global error handling
- PostgreSQL transactions
- Logging
- Unit tests
- Integration tests
- Deployment

---

# Coding Standards

- Use TypeScript everywhere.
- Keep functions small.
- Prefer async/await over promise chains.
- Never duplicate business logic.
- Name variables clearly.
- Keep controllers thin.
- Services contain business logic.
- Repositories only access PostgreSQL.
- Avoid unnecessary abstractions.
- Follow REST API conventions.
- Write meaningful commit messages.
- Refactor continuously as the project grows.