import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    // para los formularios de registro en frontend, habilitamos el registro con email y password
    // emailAndPassword: {
    //     enabled: true,
    // },

    // usamos esto para cuando tengamos un puerto distinto al 3000
    // trustedOrigins: ["http://localhost:3000", "http://localhost:3001", "https://myapp.com"],

    baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    }

});