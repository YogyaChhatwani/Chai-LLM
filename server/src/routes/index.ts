import { workspaceRoutes } from "./workspace.route.js";
import type { Express } from "express";

export function registerRoutes(app: Express) {
    app.use("/api/v1/workspaces", workspaceRoutes);
}