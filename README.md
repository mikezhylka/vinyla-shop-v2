  # 🎵 Vinyla Shop

  Welcome to the **Vinyla Shop** repository — a modern e-commerce platform designed for selling vinyl records and music-related goods.

  The project is built as a **monorepo** using [Turborepo](https://turbo.build/) and NPM Workspaces.

  ---

  ## 📦 Project Structure

  The project is divided into two main directories: `apps` (applications) and `packages` (reusable packages).

  ### 🖥 Applications (`apps/`)

  - **`client` (Frontend)**
    The user-facing storefront of the e-commerce platform.
    - **Framework:** Next.js 16 (React 19).
    - **Styling:** TailwindCSS 4.
    - **State Management:** Redux Toolkit.
    - **Forms:** React Hook Form + Zod (for validation).
    - **Integrations:** Stripe (payments).

  - **`api` (Backend)**
    The core server (API) that handles store logic, catalog (genres, recommendations, search), users, and orders.
    - **Framework:** NestJS 11.
    - **Database:** PostgreSQL, Prisma ORM.
    - **Authentication:** Passport (JWT & Local), bcrypt.
    - **Integrations:** Stripe (payments), Cloudinary (media storage).

  - **`admin` (Admin Panel)**
    An internal management dashboard for store administrators and content managers.
    - **Stack:** Vite + React 19.
    - **Tooling:** Built on top of [Kottster](https://github.com/kottster/kottster) for rapid data management directly from the database.

  ### 🧩 Packages (`packages/`)

  - **`shared-types`**
    A shared library of TypeScript types and interfaces. It is used across all three applications (`client`, `api`, `admin`), providing a Single Source of Truth and guaranteeing 100% type safety between the client and the server.

  ---

  ## 🛠 Tech Stack (Summary)

  * **Language:** TypeScript (across the entire project)
  * **Frontend:** React, Next.js, Tailwind, Redux
  * **Backend:** Node.js, NestJS, Prisma
  * **Databases & Storage:** PostgreSQL, Cloudinary
  * **Infrastructure:** Turborepo, npm workspaces, deployment via Render (`render.yaml`).

  ---

  ## 🚀 Development Setup

  To run the project locally, you will need **Node.js** (v20+ recommended), **PostgreSQL**, and **Redis**. You will also need to configure `.env` files (for database connection, Stripe, Cloudinary, and JWT secrets) in the respective applications.

  1. **Install Dependencies**  
    From the root of the project, run the following command (NPM will install dependencies for all workspaces):
    ```bash
    npm install
    ```

  2. **Database Setup**  
    Make sure your PostgreSQL database is running. You may need to run Prisma migrations and seed the initial data before starting:
    ```bash
    cd apps/api
    npx prisma generate
    npx prisma db push
    ```

  3. **Run in Development Mode (Dev)**  
    Go back to the project root. Thanks to Turborepo, you can spin up the client, server, and admin panel simultaneously with a single command:
    ```bash
    npm run dev
    ```

  4. **Build the Project**  
    To test the production build for all applications at once:
    ```bash
    npm run build
    ```

  ## 📝 Development & Code Standards
  - **Prettier** is used for code formatting, and **ESLint** for linting.
  - Strict typing is required. If you need to add a new interface that is shared between the backend and frontend, add it to `packages/shared-types`.
