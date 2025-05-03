import { Usuario } from "../models/Usuario.model.js";


export const getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ["id", "nombre", "apellido", "admin"],
        });
        res.status(200).json({
            code: 200,
            message: "Usuarios obtenidos correctamente",
            data: usuarios,
        });
    } catch (error) {
        console.log(error);
        logger.error("Hubo un error interno en el servidor", error);
        next(error);
    }
}