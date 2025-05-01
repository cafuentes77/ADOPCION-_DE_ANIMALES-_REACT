import { Router } from "express";
import { createUser, forgotPassword, login } from "../controllers/auth.controller.js";
import { issueTokenMiddleware } from "../middlewares/login.middlewares.js";


const router = Router()

router.post("/", createUser)
router.post ("/login", issueTokenMiddleware, login)
router.post ("/recovery-password", forgotPassword)




export default router