import { Router } from "express";
import { getAllAnimals } from "../controllers/animales.controller.js";



const router = Router()

router.get("/", getAllAnimals)





export default router