import { Adopcion } from "../models/Adopcion.model.js";


export const crearSolicitudAdopcion = async (req, res) => {
    try {
        const { id_usuario, id_animal } = req.body;
        const id = 2
        await Adopcion.create({
            id_usuario: 2,
            id_animal,
            estado: "pendiente",
        })

        res.status(201).json({
            code: 201,
            message: "Solicitud de adopción creada con éxito",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });

    }
}