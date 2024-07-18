import { Router } from "express";
import { getAllUsers } from "./user.handlers.js";
import { verifyToken } from "../../middleware/token.middleware.js";

const userRouter = Router();
userRouter.get('/allusers', verifyToken, getAllUsers)
export default userRouter;