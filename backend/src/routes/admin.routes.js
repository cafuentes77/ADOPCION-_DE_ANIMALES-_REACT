import { Router } from "express";
import { changeStateUser, getAllUsers } from "../controllers/admin.controller.js";



const router = Router()

router.get("/", getAllUsers)
router.put("/cambiar-estado", changeStateUser)




export default router