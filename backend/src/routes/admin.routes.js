import { Router } from "express";
import { changeStateUser, deleteUser, getAllUsers, getUserDataById, updateUser } from "../controllers/admin.controller.js";



const router = Router()

router.get("/", getAllUsers)
router.get("/get-user/:id", getUserDataById)
router.put("/cambiar-estado", changeStateUser)
router.put("/update-user", updateUser)
router.delete("/delete-user/:id", deleteUser)




export default router