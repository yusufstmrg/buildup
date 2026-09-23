# AI Coding Rules & Guidelines

This document outlines the tech stack, library usage rules, and development guidelines for this project. All AI assistants and developers must adhere to these rules to maintain consistency, security, and code quality.

---

## Tech Stack Overview

*   **React (Vite)**: A modern, fast, single-page application (SPA) framework.
*   **TypeScript**: Strongly-typed JavaScript for robust, self-documenting, and type-safe code.
*   **React Router**: Client-side routing, with all route definitions centralized in `src/App.tsx`.
*   **Tailwind CSS**: Utility-first CSS framework for rapid, responsive, and consistent styling.
*   **shadcn/ui & Radix UI**: Accessible, unstyled UI primitives customized for the project's design system.
*   **Lucide React**: The primary icon library, providing clean and consistent vector icons.
*   **Supabase**: Backend-as-a-Service (BaaS) providing Authentication, PostgreSQL Database, Row-Level Security (RLS), and Edge Functions.
*   **Stripe**: Payment processing integration supporting checkout, subscriptions, and secure payment intents.

---

## Library & Component Usage Rules

### 1. UI Components & Styling
*   **What to use**: Use **shadcn/ui** components (built on top of **Radix UI** primitives) for all standard UI elements (buttons, dialogs, inputs, dropdowns, etc.).
*   **Custom Styling**: Use **Tailwind CSS** classes extensively for layouts, spacing, colors, typography, and responsive design.
*   **Rule**: Do not install or introduce parallel UI libraries (e.g., Material UI, Chakra UI, Bootstrap). If a shadcn/ui component is missing, build a custom component using Tailwind and Radix UI primitives.
*   **Rule**: Do not edit existing files in `src/components/ui/` directly. If customization is needed, compose them or create wrapper components in `src/components/`.

### 2. Icons
*   **What to use**: Use **Lucide React** (`lucide-react`) for all icons.
*   **Rule**: Do not import icons from other libraries (e.g., FontAwesome, React Icons) unless explicitly requested. Keep icon sizes and stroke widths consistent across the app.

### 3. Routing & Page Structure
*   **What to use**: **React Router** for navigation.
*   **File Organization**:
    *   All routes must be defined and wired in `src/App.tsx`.
    *   Full-page views must be placed in `src/pages/` (with the main entry point at `src/pages/Index.tsx`).
    *   Reusable UI components must be placed in `src/components/`.
*   **Rule**: Keep the routing structure clean and centralized. Do not create parallel routing systems.

### 4. Backend & Database (Supabase)
*   **What to use**: The existing Supabase client in `src/integrations/supabase/client.ts` for all database and auth interactions.
*   **Rule**: Always enable Row-Level Security (RLS) on any new database tables. Write explicit, least-privilege policies for SELECT, INSERT, UPDATE, and DELETE.
*   **Rule**: Use Supabase Edge Functions (located in `supabase/functions/`) for sensitive operations, third-party integrations, or any logic requiring secret API keys.
*   **Rule**: Never hardcode or expose service-role keys or database credentials in the frontend.

### 5. Payments (Stripe)
*   **What to use**: **Stripe Elements** (`@stripe/stripe-js` and `@stripe/react-stripe-js`) for embedded, secure checkout flows.
*   **Rule**: Do not create fake payment completions or mock checkout clients. Always use the real Stripe test/live environment.
*   **Rule**: Validate all prices, quantities, and items server-side (via Supabase Edge Functions) before creating a PaymentIntent. Never trust totals calculated solely in the browser.

---

## Code Quality & Security Standards

*   **TypeScript**: Enforce strict typing. Avoid using `any`. Define clear interfaces for database models, API responses, and component props.
*   **No Placeholders**: Do not write `TODO` comments, mock handlers, or incomplete UI sections. All features must be fully implemented, interactive, and handle loading/error states gracefully.
*   **Responsive Design**: Build mobile-first. Ensure all pages and components are fully responsive and look great on mobile, tablet, and desktop screens.
*   **Secure Defaults**: Validate all user inputs. Enforce authentication and owner-scoped access checks on both the frontend and backend.