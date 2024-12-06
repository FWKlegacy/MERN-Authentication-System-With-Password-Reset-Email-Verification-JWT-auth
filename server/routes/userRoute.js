import express from "express";
import authentication from "../middleware/userAuth.js";
import getUserData from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", authentication, getUserData);

export default userRouter;
