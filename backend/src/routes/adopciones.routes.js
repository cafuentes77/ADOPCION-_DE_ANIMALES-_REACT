import { Router } from "express";
import { crearSolicitudAdopcion, SolicitudesById } from "../controllers/adopciones.controller.js";



const router = Router()

router.post("/solicitar-adopcion", crearSolicitudAdopcion)
router.get("/ver-solicitudes/:id", SolicitudesById)





export default router