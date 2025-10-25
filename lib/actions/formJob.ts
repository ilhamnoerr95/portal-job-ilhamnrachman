"use server";

import { revalidatePath } from "next/cache";

export async function createJob(formData: FormData) {
  const name = formData.get("name") as string;
  const rating = Number(formData.get("rating"));

  console.log("Menyimpan ke DB:", name, rating);

  // Contoh simpan ke DB (pseudo, ganti sesuai ORM)
  // await prisma.boba.create({ data: { name, rating } });

  //   revalidatePath("/boba");
}
