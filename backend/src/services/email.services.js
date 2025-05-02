import nodemailer from "nodemailer";
import { crearTemplateHtml } from "../utils/templatesEmail.js";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error en la conexión SMTP:", error);
    } else {
        console.log("Conexión exitosa a la cuenta de correo electrónico.");
    }
});

export const createMailOptions = (email, asunto, token, username) => {

    let asuntoCorreo = null

    if (asunto === "registro") {
        asuntoCorreo = "Bienvenido a Proyecto GDP "
    } else {
        asuntoCorreo = "Recuperar Password"
    }


    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: `${email}`,
        subject: asuntoCorreo,
        text: "",
        html: crearTemplateHtml(email, asunto, token, username)
    };

    return mailOptions
}


export const sendEmail = (email, asunto, username, token = null) => {

    const mailOptions = createMailOptions(email, asunto, token, username)

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo:", error);
        } else {
            console.log("Correo enviado:", info.response);
        }
    });
}