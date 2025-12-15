import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/adapters/out/drizzle/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
