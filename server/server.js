import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import conectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";

const Port = process.env.PORT || 8000;
conectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

//API endpoints
app.get("/", (req, res) => res.send("All good guys"));
app.use("/api/auth", authRouter);

app.listen(Port, () => console.log(`App listening on port ${Port}`));
