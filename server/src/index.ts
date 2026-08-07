import express from "express";
import  "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler.middleware.js";
import { registerRoutes } from "./routes/index.js";
const PORT = process.env.PORT ;
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const app = express();

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(cors({
  origin: clientUrl,
  credentials: true,
}))
app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

registerRoutes(app);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});