// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//     const user1 = await prisma.user.create({
//         data: {
//             name: 'Emanuel'
//         }
//     });

//     await prisma.task.create({
//         data: {
//             title: 'Ayudar a terminar la app',
//             idUser: user1.id,
//             dueDate: new Date('2024-12-18'),
//         }
//     });

//     console.log('Datos insertados'); 
// }

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async() => {
//         await prisma.$disconnect();
//     });