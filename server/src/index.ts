import express from "express";
import  "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
const PORT = process.env.PORT ;
console.log(PORT);
const app = express();

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});