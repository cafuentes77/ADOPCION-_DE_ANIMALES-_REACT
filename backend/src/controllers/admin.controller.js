import { Usuario } from "../models/Usuario.model.js";
import { validateUserData, userIfExist, userNotExist } from "../services/validateUserData.js";
import { sendEmail } from "../services/email.services.js";
import { hashPassword } from "../services/auth.services.js";


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
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });
    }
}

export const createUser = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, password } = req.body;

        await userIfExist(email)
        validateUserData(nombre, apellido, email, telefono, password)
        const hash = hashPassword(password)


        await Usuario.create({
            nombre,
            apellido,
            email,
            password: hash,
            telefono
        });

        const username = `${nombre} ${apellido}`

        sendEmail(email, "registro", username)

        res.status(201).json({
            code: 201,
            message: "Usuario creado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });

    }
}

export const updateUser = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono } = req.body;

        validateUserData(nombre, apellido, email, null, telefono)

        await Usuario.update({
            nombre,
            apellido,
            email,
            telefono
        }, {
            where: {
                email
            }
        })
        res.status(200).json({
            code: 200,
            message: "Usuario modificado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });
    }
}

export const changeStateUser = async (req, res) => {
    try {
        const { id, estado } = req.body;
        const user = await Usuario.findByPk(id);

        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "El Usuario no existe",
            });
        }

        await Usuario.update(
            { admin: estado }, {
            where: { id }
        });

        res.status(200).json({
            code: 200,
            message: "Estado del usuario actualizado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });
    }

}

export const getUserDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findOne({
            attributes: { exclude: ["password", "admin", "createdAt", "updatedAt"] },
            where: {
                id
            }
        });

        res.status(201).json({
            code: 201,
            message: "Usuario encontrado con éxito",
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });

    }
}

export const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;
        await userNotExist(null, id);

        await Usuario.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            code: 200,
            message: "Usuario eliminado con éxito",

        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });

    }
}