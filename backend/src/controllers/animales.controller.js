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
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });
    }
}

export const createAnimal = async (req, res) => {
    try {
        const { nombre, edad, descripcion, especie, raza } = req.body;
        const nuevoAnimal = await Animal.create({
            nombre,
            edad,
            descripcion,
            estado: "disponible",
            id_especie: especie,
            id_raza: raza,
        })
        res.status(201).json({
            code: 201,
            message: "Animal creado correctamente",
            data: nuevoAnimal,
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });

    }
}

export const updateAnimal = async (req, res) => {
    try {
        const { nombre, edad, descripcion, especie, raza } = req.body;
        const { id } = req.params;

        await Animal.Update({
            nombre,
            edad,
            descripcion,
            estado: "disponible",
            id_especie: especie,
            id_raza: raza,
        }, {
            where: {
                id
            }
        }
        );
        res.status(201).json({
            code: 201,
            message: "Animal modificado correctamente",
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });

    }
}

export const changeStateAnimal = async (req, res) => {
    try {
        const { id, estado } = req.body;
        const animal = await Animal.findByPk(id);

        if (!animal) {
            return res.status(404).json({
                code: 404,
                message: "Animal no encontrado",
            });
        }

        await animal.update({ estado }, {
            where: { id }
        });

        res.status(200).json({
            code: 200,
            message: "Estado del animal actualizado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });
    }

}

export const deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animal.findByPk(id);

        if (!animal) {
            return res.status(404).json({
                code: 404,
                message: "Animal no encontrado en la base de datos",
            });
        }

        await animal.destroy({
            where: { id }
        });

        res.status(200).json({
            code: 200,
            message: "Animal eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });
    }
}

export const getAllEspecies = async (req, res) => {
    try {
        const especies = await Especie.findAll();
        res.status(200).json({
            code: 200,
            message: "Especies obtenidas correctamente",
            data: especies,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });
    }
}

export const getAllRazas = async (req, res) => {
    try {
        const razas = await Raza.findAll();

        res.status(200).json({
            code: 200,
            message: "Razas obtenidas correctamente",
            data: razas,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });
    }
} 