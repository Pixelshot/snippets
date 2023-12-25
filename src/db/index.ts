import { PrismaClient } from "@prisma/client";

// This db acts as a portal for our app to communicate with the database
export const db = new PrismaClient();