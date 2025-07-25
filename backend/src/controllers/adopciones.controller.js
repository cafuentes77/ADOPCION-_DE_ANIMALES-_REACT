import { Adopcion } from "../models/Adopcion.model.js";
import { Animal } from "../models/Animal.model.js";
import { Usuario } from "../models/Usuario.model.js";
import { Raza } from "../models/Raza.model.js";
import { Especie } from "../models/Especie.model.js";


export const crearSolicitudAdopcion = async (req, res) => {
    try {
        const { id_usuario, id_animal } = req.body;

        const adopcionExistente = await Adopcion.findOne({
            where: {
                id_usuario,
                id_animal,
            },
        });

        if (adopcionExistente) {
            return res.status(400).json({
                code: 400,
                message: "Ya existe una solicitud de adopción para este usuario y animal"
            });
        }

        await Adopcion.create({
            id_usuario,
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

export const SolicitudesById = async (req, res) => {
    try {
        const { id } = req.params;
        const animalesSolicitados = await Adopcion.findAll({
            where: {
                id_usuario: id,
            },
            include: [
                {
                    model: Animal,
                    as: "animal",
                    include: [
                        {
                            model: Raza,
                            as: "raza",
                        },
                        {
                            model: Especie,
                            as: "especie",
                        }
                    ]
                },
                {
                    model: Usuario,
                    as: "usuario",
                }
            ],
        });

        const solicitudesMap = animalesSolicitados.map((solicitud) => {
            const data = solicitud.toJSON();
            return {
                id_solicitud: data.id,
                fecha_solicitud: data.fecha_solicitud,
                estado: data.estado,
                id_animal: data.id_animal,
                nombre_animal: data.animal?.nombre,
                edad_animal: data.animal?.edad,
                raza: data.animal?.raza?.nombre,
                especie: data.animal?.especie?.nombre,
                id_usuario: data.usuario?.id,
                nombre_usuario: data.usuario?.nombre
            }
        })

        res.status(200).json({
            code: 200,
            message: "Solicitud de adopción creada con éxito",
            data: solicitudesMap
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error interno del servidor",
        });

    }
}