"use server"

import { db } from "@/lib/prisma"

export async function userOrderExists(email: string, productId: string) {
    return (await db.order.findFirst(
        {
            where: { user: { email }, product: { id: productId } },
            select: { id: true }
        })) != null;
}