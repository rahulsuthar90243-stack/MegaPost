 # MegaPost

MegaPost is a React-based publishing application for creating, managing, and reading posts. The project uses Vite for development, Appwrite for authentication and backend services, and Redux Toolkit for client-side auth state.

 ## Features

 - Account registration and email/password login through Appwrite.
 - Automatic session lookup when the application starts.
 - Logout support that clears the active Appwrite sessions.
 - Auth-aware navigation for public and signed-in users.
 - Shared layout components including the header, logo, container, and footer.
 - React Hook Form and TinyMCE dependencies for building post creation forms and rich text content.
 - Appwrite database and storage configuration ready for post data and media.

 The post routes are represented in the navigation, while the main content outlet is still being connected in `src/App.jsx`.

 ## Tech Stack

 - React 19
 - Vite
 - React Router
 - Redux Toolkit and React Redux
 - Appwrite
 - TinyMCE
 - React Hook Form
 - ESLint

 ## Getting Started

 ### Prerequisites

 - Node.js 18 or newer
 - An Appwrite project with the required services configured

 ### Install dependencies

 ```bash
 npm install
 ```

 ### Configure environment variables

 Create a `.env` file in the project root and add the values from `.env.sample`:

 ```env
 VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
 VITE_APPWRITE_PROJECT_ID="your-project-id"
 VITE_APPWRITE_DATABASE_ID="your-database-id"
 VITE_APPWRITE_COLLECTION_ID="your-collection-id"
 VITE_APPWRITE_BUCKET_ID="your-bucket-id"
 ```

 The Appwrite project must allow the local development origin, usually `http://localhost:5173`, in its web platform settings.

 ### Run the development server

 ```bash
 npm run dev
 ```

 Vite will print the local URL in the terminal.

 ## Available Scripts

 | Command | Purpose |
 | --- | --- |
 | `npm run dev` | Start the Vite development server. |
 | `npm run build` | Create a production build. |
 | `npm run preview` | Preview the production build locally. |
 | `npm run lint` | Run ESLint across the project. |

 ## Project Structure

 ```text
 src/
	 appwrite/          Appwrite client and authentication service
	 components/        Reusable UI components and shared layout
	 configVariable/    Environment variable mapping
	 store/             Redux store and authentication slice
	 App.jsx            Application shell and session initialization
	 main.jsx           React entry point
 ```

 ## Development Notes

 Authentication is initialized in `App.jsx`. The current user is requested from Appwrite on startup, then stored in Redux so the header can show the correct navigation. Keep secrets out of source control and use `.env` locally; only `VITE_*` variables are exposed to the Vite client bundle.

 Planned application work includes connecting the post routes, adding post CRUD operations, and wiring the configured Appwrite database and bucket into the editor workflow.
