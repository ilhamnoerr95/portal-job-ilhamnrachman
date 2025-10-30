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
- **Zustand**
- **React Query**
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
## dont forget to install first
npm run install
#or
yarn install

First, run the development server:

```bash
npm run server:dev
# or
yarn server:dev
# or
pnpm server:dev
# or
bun server:dev
````

Open [http://localhost:3000/login](http://localhost:3000/login) with your browser to see the result.

## SETUP ENVIRONMENT

```env
GOOGLE_CLIENT_ID=idgoogleclienmu
GOOGLE_CLIENT_SECRET=googlecliensecretmu
NEXTAUTH_SECRET=zebra_panggang_terenkripsi_123
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_ORIGIN=http://localhost:3000
API_URL_INTERNAL=http://localhost:3000
SUPABASE_URL=yoururlsupabase
SUPABASE_SERVICE_ROLE_KEY=yourservicerolesupabase
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

## RUNNING ON DOCKERFILE

dont forget to install docker on your pc

```bash
### build docker
docker build -t bebas_mau_nama_apa -f deployment/Dockerfile .

## docker run
docker run -p 3000:3000 \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=zebra_panggang_terenkripsi_123 \
  -e GOOGLE_CLIENT_ID=nameofyourgoogleclientid \
  -e GOOGLE_CLIENT_SECRET=yourgoogleclientsecret \
 job-portal-ilhamnrachman

### or  create container n start container

docker container create \
  --name bebeas_nama_container \
  -p 3000:3000 \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=zebra_panggang_terenkripsi_123 \
  -e GOOGLE_CLIENT_ID=nameofyourgoogleclientid \
  -e GOOGLE_CLIENT_SECRET=yourgoogleclientsecret \
  nama_image

docker container start nama_container

## kalo ada error stuck di npm install
## hapus dulu .next sama node_modules

```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

let's try our app [https://portal-job-ilhamnrachman.vercel.app/](https://portal-job-ilhamnrachman.vercel.app/)
