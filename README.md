Full-Stack E-Commerce Platform

A high-performance, production-ready e-commerce application built with the modern Next.js ecosystem. This project features dynamic route-based filtering, predictable global state management, secure user authentication, and a complete Stripe checkout integration. [1, 2]

🌐 Live Demo: View Live Deployment on Vercel

🚀 Key Features

Dynamic Filtering: URL-driven state for robust search, category, and attribute filtering.

Secure Checkout: Stripe integration.

Authentication: Protected client and server routes via Clerk authentication.

Global Cart Management: Predictable, centralized cart state powered by Redux Toolkit.

Responsive Design: Beautiful, accessible UI built with Tailwind CSS and Shadcn UI components.

🛠️ Tech Stack

Frontend & Framework

Framework: Next.js 14+ (App Router)

Styling: Tailwind CSS

UI Components: Shadcn UI / Radix Primitives

State Management & Data Fetching

Global Client State: Redux Toolkit (RTK)

Authentication: Clerk

Payment Gateway: Stripe API

Deployment: Vercel

🏗️ Architecture Highlights

Route-Based Filtering

The application utilizes Next.js search parameters to manage the state of filters. This design choice ensures that users can copy, bookmark, and share specific search result URLs directly, boosting SEO and user experience.

State Architecture: Redux + TanStack Query

This project demonstrates an advanced architectural pattern by decoupling asynchronous server data from synchronous client actions.

Redux Toolkit manages local, predictable UI mutations—such as immediate cart updates, toast triggers, and sidebar toggles.
