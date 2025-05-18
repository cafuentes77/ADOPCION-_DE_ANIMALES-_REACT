import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { RegisterForm } from "../../../Auth/RegisterView/components/RegisterForm";

export const ModalCrearUsuarios = ({ setIsOpen, modo }) => {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        try {
            const formData = new FormData()
            formData.append("nombre", form.nombre)
            formData.append("edad", form.apellido)
            formData.append("email", form.email)
            formData.append("telefono", form.telefono)
            formData.append("password", form.password)


            const requestOptions = {
                method: modo === "crear" ? "POST" : "PUT",
                body: formData
            }
            const url = "http://localhost:3000/api/v1/admin"
            const path = modo === "crear" ? "/crear-animal" : `/editar-animal/${animalSeleccionado}`


            const response = await fetch(`${url}${path}`, requestOptions)
            const data = await response.json()

            if (data.code === 201) {
                enqueueSnackbar(data.message, { variant: "success" });
                setIsOpen(false)
            } else if (data.code === 200) {
                enqueueSnackbar(data.message, { variant: "success" });
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getAnimalData = async () => {
            try {
                const url = `http://localhost:3000/api/v1/animales/get-animal/${animalSeleccionado}`
                const response = await fetch(url)
                const data = await response.json()
                const animal = data.data

                setForm({
                    nombre: animal.nombre,
                    edad: animal.edad,
                    descripcion: animal.descripcion,
                    especie: animal.id_especie,
                    raza: animal.id_raza,
                })

            } catch (error) {
                console.log(error);
            }
        }
        if (modo === "modificar") {
            getAnimalData()
        } else {
            return
        }
    }, [modo]);


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white flex justify-center items-center flex-col p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4"> {modo === "crear" ? "Crear Nuevo Animal" : "Modificar Animal"}</h2>
                <RegisterForm />
            </div>
        </div>
    )
}