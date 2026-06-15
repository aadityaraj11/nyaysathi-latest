# NyaySathi — AI-Powered Legal Advisor

NyaySathi is a web application that combines an AI-powered legal assistant, a curated legal library, downloadable legal templates, and a real-time advocate-client communication system. The project aims to make legal information and help more accessible to the general public while providing tools that legal professionals can use to manage consultations and templates.


## Key features

- AI legal assistant: Ask legal questions and get contextual answers powered by an LLM integration.
- Real-time chat: Advocate–client chat and consultation flows (using Supabase/Firebase or a real-time backend).
- Legal library: Searchable collection of acts, case laws, policy documents, and rights summaries.
- Document templates: Lawyer-approved templates for employment, rental, family, loans, and other categories (PDFs available in `public/Templets`).
- Rights & guides: Simple, user-friendly explainers for common legal rights and procedures.

## Tech stack

- Frontend: React + TypeScript, Vite
- Styling: Tailwind CSS
- State & data: React Query, Supabase (used in `supabase/`), Firebase (some auth/other features)
- Realtime & storage: Supabase / Firebase / Multer for uploads
- LLM and AI integrations: LangChain packages listed in `package.json` and other LLM adapters
- Backend utilities: Express (present in dependencies) for any server-side helpers
- PDF helpers: `pdf-parse` and local `pdfs/` and `public/Templets/` for documents

## Prerequisites

- Node.js (v18+ recommended)
- npm or bun (the repo includes a `bun.lockb` but `package.json` uses npm scripts)
- A Supabase project (optional but recommended for the full feature set)
- A Firebase project (if using Firebase auth/storage; check `src/firebase.js`)
- An OpenAI or compatible API key if you intend to enable the AI assistant features

## Quick start — local development

1. Clone the repository

	git clone https://github.com/aadityaraj11/nyaysathi-latest.git
	cd nyaysathi

2. Install dependencies

	npm install

3. Create a `.env` in the project root with required variables (example below)

4. Run the dev server

	npm run dev

Open http://localhost:5173 (Vite's default) in your browser.

### Example `.env` (replace with actual keys)

This project uses Vite. Prefix any variables that need to be accessible in client code with `VITE_`.

```
# Supabase (if used)
VITE_SUPABASE_URL=https://your-supabase-url
VITE_SUPABASE_ANON_KEY=public-anon-key

# Firebase (if used)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxx
FIREBASE_APP_ID=1:xxxxxxxx:web:xxxxxxxx

# AI / LLM
OPENAI_API_KEY=sk-...

# Node/Server
NODE_ENV=development
PORT=3000
```

Note: Check `src/firebase.js` and `supabase/client.js` to confirm the exact environment variable names used by those files and add any additional keys they expect.

## NPM scripts (from `package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets via Vite
- `npm run build:dev` — build using development mode
- `npm run preview` — preview production build locally
- `npm run start` — run `node assistant.js` (project includes an `assistant.js` which the `start` script runs; inspect the file to confirm its role)
- `npm run lint` — run ESLint across the project

## Project structure (important files/folders)

- `src/` — main source code
  - `components/` — React components (home, layout, legal-library, rights, ui)
  - `pages/` — route pages (Assistant, Booking, Index, Lawyers, Templates, etc.)
  - `firebase.js` — Firebase initialization (check for exact keys)
  - `main.tsx` — app entry
- `public/Templets/` — PDF templates and legal document samples (organized by category)
- `pdfs/` — sample PDF files used in the app
- `supabase/` — Supabase client initialization
- `uploads/` — uploaded files (committed in repo for sample/testing)
- `assistant.js` — helper script / local server used by `npm start` (inspect before running in production)
- `package.json` — dependencies & scripts

## LLM and AI notes

The project includes dependencies for LangChain and adapter packages (see `package.json`). How the LLM is used depends on runtime secrets and configuration. Before enabling LLM features, ensure you have:

- An API key for a supported LLM provider (OpenAI, Ollama, or other adapters configured in the code)
- Environment variables set correctly and never committed to source control

If the repository integrates with LangChain/LLM in `src` or server files, review those modules to confirm provider configuration and streaming/usage patterns.

## Build & Deploy

1. Build the project

	npm run build

2. The build output will be in `dist/` (Vite default). Serve via any static host (Netlify, Vercel, S3 + CloudFront) or a Node server if you have server-side pieces.

3. If using server components (e.g., `assistant.js` or Express endpoints), deploy them alongside the static build or as separate serverless functions. Ensure secrets are set in the hosting environment.


## Troubleshooting

- Dev server not starting: ensure Node and npm are installed, install dependencies and check port conflicts.
- Missing environment variables: check console logs for errors and confirm `.env` variables match names used in `src/firebase.js` and `supabase/client.js`.
- LLM errors: check provider limits, API key validity, and network connectivity.

## Contributing

Contributions are welcome. A suggested workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Add changes and tests
4. Open a pull request with a clear description and related screenshots / logs

Guidelines:

- Keep changes focused and well-documented.
- Add or update tests for new logic.
- Run `npm run lint` and fix issues before submitting.


## Maintainers / Contact

Repository owner: Aaditya (GitHub: `aadityaraj11`). For questions, open an issue on the repository.

## Acknowledgements

- This project uses many great OSS libraries: React, Vite, Tailwind CSS, Supabase, Firebase, LangChain, and Radix UI.

---
