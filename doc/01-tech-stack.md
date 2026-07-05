# 01 - Tech Stack

This project uses a simple Jamstack architecture: Frontend + BaaS

## Core Technologies

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend Framework** | React 18 + Vite | Single Page App. Fast dev server and builds |
| **Language** | JavaScript ES6 | Main app logic |
| **Backend as a Service** | Supabase | Handles DB, Auth, and File Storage |
| **Database** | Postgres | Table: `sites`. Stores all visit data |
| **Authentication** | Supabase Auth | Email + Password login |
| **File Storage** | Supabase Storage | Bucket: `site-photos`. Stores uploaded images |
| **Hosting / CI/CD** | Vercel + GitHub | Push to `main` branch auto-deploys to Vercel |
| **Environment Variables** | `.env` + `VITE_` prefix | Stores Supabase URL and ANON KEY securely |

## Key Dependencies
`@supabase/supabase-js` - Client to talk to Supabase
`react` - UI library
`vite` - Build tool
