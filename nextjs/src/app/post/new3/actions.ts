"use server";

import { update } from "@/data-access/example";

import { revalidatePath } from "next/cache";

export async function updateNameAction(id: number, formData: FormData) {
    const newName = formData.get("name") as string;
    await update({id, newName});
    revalidatePath('/users/${user.id}');
}