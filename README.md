# Next.js Starter Kit

![Next.js](https://img.shields.io/badge/Next.js-15.x-000000.svg?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat-square&logo=tailwind-css)
![ESLint](https://img.shields.io/badge/ESLint-8.x-4B32C3.svg?style=flat-square&logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3.x-F7B93E.svg?style=flat-square&logo=prettier)
![Husky](https://img.shields.io/badge/Husky-8.x-000000.svg?style=flat-square)
![Lint-Staged](https://img.shields.io/badge/Lint--Staged-13.x-000000.svg?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000.svg?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)

A modern and lightweight boilerplate for building scalable web applications with **Next.js**, **TypeScript**, and **Tailwind CSS**. This starter kit streamlines your development workflow with pre-configured tools for code quality, formatting, and deployment.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Scripts](#scripts)
- [Project Structure](#project-structure)
- [File Documentation](#file-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Next.js 15**: App Router, Server Components, and optimized performance.
- **TypeScript**: Type-safe development for enhanced reliability.
- **Tailwind CSS**: Utility-first CSS for rapid UI development.
- **ESLint & Prettier**: Enforce code quality and consistent formatting.
- **Husky & Lint-Staged**: Pre-commit hooks for clean code.
- **SEO Optimized**: Built-in metadata for better search visibility.
- **Vercel Ready**: Seamless deployment configuration.
- **Modular Design**: Clean, scalable project structure.

## Tech Stack

- **Next.js**: React framework for server-side rendering and static sites.
- **TypeScript**: Static typing for JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **ESLint**: Linting for code quality.
- **Prettier**: Code formatting for consistency.
- **Husky**: Git hooks for pre-commit tasks.
- **Lint-Staged**: Runs linters on staged files.
- **Vercel**: Deployment platform for Next.js apps.

## Getting Started

### Prerequisites

- **Node.js**: v16 or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DakshSitapara/next.js-starter_kit.git
   cd next.js-starter_kit
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` to add your API keys or other configurations.

4. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Scripts

| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Starts the development server            |
| `npm run build` | Builds the app for production            |
| `npm run start` | Runs the production server               |
| `npm run lint`  | Runs ESLint for code quality checks      |
| `npm run format`| Formats code with Prettier               |

## Project Structure

```plaintext
next.js-starter_kit/
├── src/
│   ├── app/            # Next.js App Router (pages, layouts)
│   ├── components/     # Reusable React components
│   ├── styles/         # Global and Tailwind CSS styles
│   ├── lib/            # Utility functions and helpers
│   ├── types/          # TypeScript type definitions
├── public/             # Static assets (images, favicon)
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── .husky/             # Git hooks for pre-commit checks
├── .env.example        # Environment variable template
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project metadata and scripts
```

## File Documentation

### `src/app/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `layout.tsx`    | Root layout for the app, defining global structure and metadata.            |
| `page.tsx`      | Default homepage rendered at the root route (`/`).                          |
| `globals.css`   | Global CSS with Tailwind imports and custom styles.                         |

### `src/components/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `Header.tsx`    | Reusable navigation header component.                                       |
| `Footer.tsx`    | Reusable footer component for the app.                                      |

### `src/styles/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `tailwind.css`  | Tailwind CSS configurations and custom styles.                              |

### `src/lib/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `utils.ts`      | Utility functions for API calls, data processing, or other helpers.         |

### `src/types/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `index.ts`      | TypeScript type definitions for the application.                            |

### `public/`

| File/Folder     | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `favicon.ico`   | Favicon displayed in browser tabs.                                          |
| `images/`       | Static images and other assets.                                             |

### Root Files

| File              | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `.eslintrc.js`    | ESLint config with Airbnb rules for code consistency.                       |
| `.prettierrc`     | Prettier config for code formatting.                                        |
| `.husky/pre-commit` | Git hook for running linting/formatting before commits.                    |
| `.env.example`    | Template for environment variables (e.g., API keys).                        |
| `next.config.js`  | Next.js config for image optimization, env vars, etc.                       |
| `tsconfig.json`   | TypeScript compiler settings.                                               |
| `package.json`    | Project dependencies, scripts, and metadata.                                |

## Deployment

Optimized for **Vercel**, but compatible with any Next.js-compatible hosting provider.

### Vercel Deployment

1. Push the repository to GitHub.
2. Create a new Vercel project and link the repository.
3. Configure environment variables in Vercel’s dashboard.
4. Deploy using Vercel’s CLI or Git integration.

Refer to [Next.js Deployment Docs](https://nextjs.org/docs/deployment) for more details.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

Ensure code adheres to linting and formatting standards.

## License

This project is licensed under the [MIT License](LICENSE).
