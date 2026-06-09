import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 5000,

  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/backend_saas",

  LOG_LEVEL: process.env.LOG_LEVEL || "info",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",

  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",

  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  EMAIL_USER: process.env.EMAIL_USER || "",

  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};
