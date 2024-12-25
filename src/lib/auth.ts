import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle";
import { nextCookies } from "better-auth/next-js";
import { account, session, user, verification } from "@/drizzle/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: user,
      account: account,
      session: session,
      verification: verification,
    }
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
