# Job Portal Project

## 📌 Project Overview

Job Portal ini menyediakan platform bagi user untuk mencari dan melamar pekerjaan, serta untuk admin dalam mengelola daftar pekerjaan.  
Beberapa fitur utama di dalam aplikasi ini:

### 🔐 Authentication & Authorization

- Login via **Credentials email & password** dengan role: `admin` & `user`.
- Login via **Link** .
- Login via **Google Provider** (otomatis sebagai role `user`)
- Proteksi halaman berdasarkan role

### 🧑‍💼 Admin Features

- Manage Job List melalui halaman khusus admin
- Tersedia Data Table untuk melihat user pelamar
- Form dinamis untuk membuat & mengupdate job posting

### 👨‍🎓 User Features

- Melihat daftar job yang tersedia
- Mengisi Form Apply Job (input data diri)
- Gesture Photo Sensor untuk capture foto saat apply

---

## 🧰 Tech Stack Used

- **Next.js (App Router, Latest Version)**
- **TypeScript**
- **Tailwind CSS**
- **NextAuth**
- **Zustand** (planned)
- **React Query** (planned)
- **React Testing Library & Jest**
- **clsx**
- **framer-motion**

---

## 🚀 How to Run Locally

### 1️⃣ Clone Repository

````bash
git clone <repository-url>
cd <nama-folder-project>
```
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000/login](http://localhost:3000/login) with your browser to see the result.

## SETUP ENVIRONMENT

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=zebra_panggang_terenkripsi_123
NEXTAUTH_URL=http://localhost:3000
```

Untuk mendapatkan Google OAuth Credentials:
Kunjungi [https://console.cloud.google.com/auth/clients](https://console.cloud.google.com/auth/clients)
Untuk Aktifkan Google Sign-In API.

## PRODUCTION BUILD

```bash
npm run build
npm run start
```

Build akan otomatis menjalankan `npm run test:unit` sebelum proses build.

## Unit Testing

Unit testing hanya fokus di component saja dengan treshold yang nilainya sudah di tetapkan. Cara menjalankannya:

```bash
npm run test:unit
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

let's try our app [https://portal-job-ilhamnrachman.vercel.app/](https://portal-job-ilhamnrachman.vercel.app/)
