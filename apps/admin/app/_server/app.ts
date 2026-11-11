import { createApp, createIdentityProvider } from "@kottster/server";
import schema from "../../kottster-app.json";
import "dotenv/config";

export const app = createApp({
  schema,
  secretKey: process.env.KOTTSTER_SECRET_KEY,
  kottsterApiToken: process.env.KOTTSTER_API_TOKEN,

  identityProvider: createIdentityProvider("sqlite", {
    fileName: "app.db",
    passwordHashAlgorithm: "bcrypt",
    jwtSecretSalt: process.env.KOTTSTER_JWT_SALT,

    rootUsername: "admin",
    rootPassword: process.env.KOTTSTER_ROOT_PASSWORD,
  }),
});
