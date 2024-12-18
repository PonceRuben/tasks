import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    try {
    const users = await prisma.user.findMany();

    return(NextResponse.json(users))
    } catch (error) {
        return NextResponse.error()
    } finally {
        await prisma.$disconnect();
    }
}