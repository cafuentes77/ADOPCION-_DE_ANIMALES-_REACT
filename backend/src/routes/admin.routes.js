import { Router } from "express";
import { changeStateUser, deleteUser, getAllUsers, getUserDataById, updateUser } from "../controllers/admin.controller.js";
import { verifyTokenMiddleware } from "../middlewares/login.middlewares.js";



const router = Router()

router.get("/", verifyTokenMiddleware, getAllUsers) //listo rutas protegidas
router.get("/get-user/:id", verifyTokenMiddleware, getUserDataById) // listo
router.put("/cambiar-estado", verifyTokenMiddleware, changeStateUser) //listo
router.put("/update-user", verifyTokenMiddleware, updateUser) //listo
router.delete("/delete-user/:id", verifyTokenMiddleware, deleteUser) //listo




export default router