import { Animal } from "../models/Animal.model.js";
import { Raza } from "../models/Raza.model.js";
import { Especie } from "../models/Especie.model.js";


export const getAllAnimals = async (req, res) => {
    try {
        const animales = await Animal.findAll({
            include: [
                {
                    model: Especie,
                    as: "especie",
                },
                {
                    model: Raza,
                    as: "raza",
                },
            ],
        });

        const animalesMap = animales.map(animal => ({
            id: animal.id,
            nombre: animal.nombre,
            edad: animal.edad,
            descripcion: animal.descripcion,
            estado: animal.estado,
            especie: animal.especie?.nombre || "Sin especie",
            raza: animal.raza?.nombre || "Sin raza"
        }))

        res.status(200).json({
            code: 200,
            message: "Animales obtenidos correctamente",
            data: animalesMap,
        });
    } catch (error) {
        console.log(error);
        logger.error("Hubo un error interno en el servidor", error);
        next(error);
    }
}