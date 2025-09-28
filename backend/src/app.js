import express from "express";
import cors from "cors";
import eventRoutes from "./router/event.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import "dotenv/config";

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/event", eventRoutes);

app.use(errorHandler);


export { app };