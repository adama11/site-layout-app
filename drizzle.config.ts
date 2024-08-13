import { type Config, defineConfig } from "drizzle-kit";

let config: Config;
if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {
  config = defineConfig({
    schema: "./src/db/models",
    driver: "turso",
    dbCredentials: {
      url: process.env.DATABASE_URL ?? "",
    },
    verbose: true,
    strict: true,
    out: "./src/db/drizzle",
    dialect: "sqlite",
  });
} else {
  config = defineConfig({
    schema: "./src/db/models",
    driver: "turso",
    dbCredentials: {
      url: process.env.DATABASE_URL ?? "",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    verbose: true,
    strict: true,
    out: "./src/db/drizzle",
    dialect: "sqlite",
  });
}

// biome-ignore lint/style/noDefaultExport: we need this file to be a module
export default config;
