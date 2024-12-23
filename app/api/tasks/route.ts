import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { title, dueDate, idUser} = await req.json();


        if (!title || !dueDate || !idUser) {
            return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
        }

        const task = await prisma.task.create({
            data: {
                title,
                dueDate: new Date(dueDate),
                idUser: Number(idUser),
            },
        });

        return NextResponse.json(task, {status: 201});
    } catch(error){
        console.error("Error al crear la tarea:", error);
        return NextResponse.json({ error: "Error al crear la tarea"}, {status: 500});
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await req.json();

    if (!id || isNaN(id)) {
        return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await prisma.task.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Tarea eliminada correctamente' }, { status: 200 });
    } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    return NextResponse.json({ error: 'Error al eliminar la tarea' }, { status: 500 });
    }
}