import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import conectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";

const Port = process.env.PORT || 8000;
conectDB();

const app = express();
const allowedOrigin = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));

//API endpoints
app.get("/", (req, res) => res.send("All good guys"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(Port, () => console.log(`App listening on port ${Port}`));
