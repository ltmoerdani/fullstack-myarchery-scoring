# Modern Fullstack Turborepo (Fastify + React + Redis + Pusher)

## Deskripsi
Monorepo ini adalah starterpack aplikasi fullstack modern berbasis [Turborepo](https://turbo.build/) yang mengintegrasikan backend Fastify (TypeScript), frontend React (Vite), Redis untuk cache, dan Pusher untuk real-time event. Struktur dan tooling sudah siap pakai untuk pengembangan aplikasi skala kecil-menengah hingga enterprise.

## Fitur Utama
- **Monorepo**: Manajemen multi-app dan shared packages dengan Turborepo
- **Backend**: Fastify, TypeScript, Redis, Pusher, Rate Limit, Helmet, CORS, Error Handler
- **Frontend**: React, Vite, TailwindCSS, Hooks, Komponen modular, WebSocket, Pusher
- **Shared Types**: TypeScript types & schema sharing antar backend dan frontend
- **Linting & Formatting**: ESLint, Prettier, custom config
- **Testing Siap**: Struktur siap untuk penambahan testing
- **Dockerized**: Siap deploy dengan Docker Compose (backend, frontend, redis)

## Struktur Direktori
```
├── apps/
│   ├── backend/      # Fastify API (TypeScript)
│   └── frontend/     # React (Vite, Tailwind)
├── packages/
│   ├── shared-types/ # TypeScript types/schema bersama
│   ├── eslint-config/ # Custom lint config
│   └── typescript-config/ # Custom tsconfig
├── docker-compose.yml
├── package.json      # Root Turborepo
├── turbo.json        # Pipeline Turborepo
└── ...
```

## Backend (Fastify)
- Struktur modular: controller, service, repository, middleware
- Redis untuk cache, Pusher untuk real-time event
- Rate limit, helmet, CORS, error handler siap pakai
- Environment config dengan validasi Zod
- Contoh endpoint: `/api/users`, `/api/ws` (WebSocket)
- Siap di-extend untuk kebutuhan bisnis

## Frontend (React + Vite)
- React 18, Vite, TailwindCSS, hooks modular
- Komunikasi API & WebSocket ke backend
- Integrasi realtime via Pusher
- Struktur siap untuk pengembangan SPA/MPA
- Contoh komponen: UserList, CreateUserForm, RealtimeStatus

## Shared Types
- Semua tipe data, schema, dan utilitas TypeScript didefinisikan di `packages/shared-types`
- Digunakan bersama backend & frontend untuk type safety end-to-end

## Cara Menjalankan
### 1. Clone & Install
```bash
# Clone repo
https://github.com/ltmoerdani/fullstack-myarchery-scoring.git
cd modern-fullstack-app

# Install dependencies (root + semua workspace)
npm install
```

### 2. Konfigurasi Lingkungan
- Edit file `.env` di root dan/atau masing-masing app jika diperlukan.
- Contoh variabel penting:
  - `REDIS_URL`, `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER`, `PORT`, dll.
- Redis & Pusher sudah terhubung otomatis via config.

### 3. Build & Start (Manual)
```bash
# Build semua
npm run build
# Start backend
cd apps/backend && npm run dev
# Start frontend
cd apps/frontend && npm run dev
```

### 4. Jalankan dengan Docker Compose
```bash
# Build & start semua service (backend, frontend, redis)
npm run docker:build
npm run docker:up
# Stop semua service
docker-compose down
```

### 5. Lint & Format
```bash
npm run lint
npm run format
```

## Pengujian & Pengembangan
- Struktur siap untuk penambahan testing (unit, integration, e2e)
- Tambahkan test di masing-masing app sesuai kebutuhan
- Jalankan lint/type-check sebelum commit

## Deployment
- Siap deploy ke cloud (Vercel, AWS, GCP, dsb) via Docker
- Bisa diintegrasikan dengan CI/CD pipeline

## Kontribusi
1. Fork repo ini
2. Buat branch fitur/bugfix
3. Commit perubahan dengan pesan jelas
4. Pull request ke main

## Lisensi
MIT

---

> Dibuat untuk akselerasi pengembangan aplikasi fullstack modern. Silakan modifikasi sesuai kebutuhan proyek Anda.
