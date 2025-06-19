import { Router } from "express";
import { crearSolicitudAdopcion, SolicitudesById } from "../controllers/adopciones.controller.js";
import { verifyTokenMiddleware } from "../middlewares/login.middlewares.js";



const router = Router()

router.post("/solicitar-adopcion", verifyTokenMiddleware, crearSolicitudAdopcion)
router.get("/ver-solicitudes/:id", verifyTokenMiddleware, SolicitudesById)





export default router