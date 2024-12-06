import { PrismaClient } from "@prisma/client";


const prisma = globalThis.prismaGlobal ?? new PrismaClient();

if(!globalThis.prismaGlobal){
    globalThis.prismaGlobal = prisma;
}

export default prisma;


