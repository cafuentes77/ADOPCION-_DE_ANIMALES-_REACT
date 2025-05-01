import logger from "../utils/logger.js";
import { Usuario } from "../models/Usuario.model.js";
import { validateUserData, userIfExist } from "../services/validateUserData.js";
import { hashPassword } from "../services/auth.services.js";
import { sendEmail } from "../services/email.services.js";
import { createToken } from "../services/auth.services.js";


export const createUser = async (req, res, next) => {
    try {
        const { nombre, apellido, email, password, telefono } = req.body

        await userIfExist(email)
        validateUserData(nombre, apellido, email, password, telefono)

        const hash = hashPassword(password)

        await Usuario.create({
            nombre,
            apellido,
            email,
            password: hash,
            telefono
        })

        const username = `${nombre} ${apellido}`

        sendEmail(email, "registro", username)

        res.status(201).json({
            code: 201,
            message: "Usuario creado con éxito",
        });
    } catch (error) {
        console.log(error);
        logger.error("Ha ocurrido un error en createUser Controller", error);
        next(error);
    }
};

export const login = async (req, res) => {
    try {

        res.status(200).json({
            code: 200,
            message: "Usuario logueado con correctamente",
            token: req.token
        })
    } catch (error) {
        console.log(error);
        logger.error("Ha ocurrido un error en login Controller", error);
        next(error);
    }
};

export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.params
        const user = await Usuario.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({
                code: 400,
                message: "No hay ningún usuario con ese email"
            })
        }

        const username = `${user.nombre} ${user.apellido}`
        const token = await createToken(email, "5m")

        sendEmail(email, "recuperar password", username, token)

        res.status(200).json({
            code: 200,
            message:
                "Email de recuperación de contraseña enviado correctamente",
        });
    } catch (error) {
        console.log(error);
        logger.error(
            "Ha ocurrido un error en forgotPassword Controller",
            error
        );
        next(error);
    }
};

export const changePassword = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        logger.error(
            "Ha ocurrido un error en forgotPassword Controller",
            error
        );
        next(error);
    }
};