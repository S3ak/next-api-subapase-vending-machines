# NextJS Fullstack Web Application Template

This is a full-stack web application built with Next.js, a popular React framework for production-grade applications. The application is designed to run on a remote server, providing a robust and scalable solution for your needs. This is a example of how you would configure your nextjs to run on a serverless environment such as Vercel.

## Technology Stack

**Frontend**: The frontend of this application is built using Next.js, a powerful framework that enables server-side rendering for React applications. This allows for improved performance and SEO capabilities.

**Backend**: The backend is built with Node.js, providing a fast and scalable environment for our server-side logic. We use Supabase as our primary database, using the javascript SDK.

**Database**: We use PostgreSQL as our primary database, known for its reliability and robustness.

**TypeScript**: The application is written in TypeScript, a statically typed superset of JavaScript that adds reliability and maintainability to the codebase.

## Links

- [Production deploy](api-gateway-next-e0lquu0al-seak.vercel.app)
- [Staging deploy](TODO) #TODO
- [API URL](https://api-gateway-next-e0lquu0al-seak.vercel.app/api)
- [Docs]()

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To get started with this project, clone the repository and install the dependencies with npm install. You can then start the development server with npm run dev.

Please refer to the individual directories for more detailed information about each part of the application.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

Directory Structure
app/: Contains the main application code, including React components and API logic.
public/: Static files that are served by the server such as images.
scripts/: Contains scripts for database seeding and other tasks.
drizzle/: Contains database schema and migration files.
.env: Environment variables for the application.
package.json: Lists the package dependencies for the project.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

We welcome contributions to this project. Please feel free to submit issues and pull requests.
