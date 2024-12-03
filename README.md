# Critix

Final Project Study Club Web Intermediate KSM Android

## Authors

- [@ausathdzil](https://www.github.com/ausathdzil)
- [@JuliaDinda21](https://www.github.com/JuliaDinda21)

## Demo

[critix.vercel.app](https://critix.vercel.app)

## Environment Variables

Untuk menjalankan proyek ini, tambahkan enviroment variables berikut ini ke dalam file .env.local

`DATABASE_URL`

`SESSION_SECRET`

`NEXT_PUBLIC_TMDB_API_KEY`

## Features

- Search movies
- Create reviews
- Authentication

## Run Locally

Clone proyek ini

```bash
  git clone https://github.com/ausathdzil/ausath-juli-web-intermediate-2024.git
```

Pergi ke direktori proyek

```bash
  cd ausath-juli-web-intermediate-2024
```

Masukkan enviroment variables

`DATABASE_URL` = Gunakan database Neon dan masukan URLnya

`SESSION_SECRET` = JWT 256 bit secret, gunakan perintah `openssl rand -base64 32` untuk generasi string acak

`NEXT_PUBLIC_TMDB_API_KEY` = API KEY yang digunakan sebagai header Authorization untuk mengonsumsi API dari TMDB

Install dependencies

```bash
  pnpm install
```

Nyalakan server

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
