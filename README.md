# Critix

Final Project Study Club Web Intermediate KSM Android.

## Authors

- [@ausathdzil](https://www.github.com/ausathdzil)
- [@JuliaDinda21](https://www.github.com/JuliaDinda21)

## Demo

[critix.vercel.app](https://critix.vercel.app)

## Features

- Search movies menggunakan Next.js Form
- State management menggunakan URL untuk pagination
- Authentication dengan email dan password menggunakan JWT
- Operasi CRUD pada reviews menggunakan React 19 Server Functions
- Progressive enhancement menggunakan React 19 useActionState pada form
- Validasi form pada sisi server menggunakan Zod dan React 19 Server Functions
- Akses data user dimana saja dengan UserProvider menggunakan React createContext
- Global middleware untuk melindungi halaman profil
- Metadata untuk optimisasi SEO

## Run Locally

Clone proyek:

```bash
  git clone https://github.com/ausathdzil/ausath-juli-web-intermediate-2024.git
```

Pergi ke direktori proyek:

```bash
  cd ausath-juli-web-intermediate-2024
```

Buat file .env.local dan tambahkan enviroment variables berikut:

1. `DATABASE_URL`: URL database Neon.

2. `SESSION_SECRET`: String acak menggunakan perintah `openssl rand -base64 32` untuk JWT 256 bit secret.

3. `NEXT_PUBLIC_TMDB_API_KEY`: API KEY yang digunakan sebagai header Authorization untuk mengonsumsi API dari TMDB.

Install dependencies:

```bash
  pnpm install
```

Migrasi database:

```bash
  npx drizzle-kit create
  npx drizzle-kit migrate
```

Nyalakan server development:

```bash
  pnpm run dev
```

## Tech Stack

- [Next.js](https://github.com/vercel/next.js)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Neon](https://github.com/neondatabase/neon)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- [shadcn/ui](https://github.com/shadcn-ui/ui)
