import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { env } from "./config/env";

import { errorMiddleware } from "./shared/middleware/error.middleware";
import { notFoundMiddleware } from "./shared/middleware/notFound.middleware";
import userRoutes from "./modules/users/routes/User.routes";
import authRoutes from "./modules/auth/routes/Auth.routes";
import roleRoutes from "./modules/roles/routes/Role.routes";
import permissionRoutes from "./modules/permissions/routes/Permission.routes";
import auditLogRoutes from "./modules/audit-logs/routes/AuditLog.routes";
import surveyRoutes from "./modules/surveys/routes/Survey.routes";
import sectionRoutes from "./modules/sections/routes/Section.routes";
import questionRoutes from "./modules/questions/routes/Question.routes";
import ruleRoutes from "./modules/rules/routes/Rule.routes";
import responseRoutes from "./modules/responses/routes/Response.routes";
import dashboardRoutes from "./modules/dashboard/routes/Dashboard.routes";
import analyticsRoutes from "./modules/analytics/routes/Analytics.routes";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/permissions", permissionRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/audit-logs", auditLogRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/surveys", surveyRoutes);
app.use("/api/v1/sections", sectionRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/rules", ruleRoutes);
app.use("/api/v1/responses", responseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
