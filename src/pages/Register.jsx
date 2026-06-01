import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        telefono: "",
        tipo: "COMPRADOR",

        // negocio
        negocio: "",
        descripcionNegocio: "",
        whatsapp: "",
        direccion: "",
        motivo: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", form);

            if (form.tipo === "VENDEDOR") {
                alert("Solicitud enviada. Un administrador la revisará.");
            } else {
                alert("Usuario registrado correctamente");
            }

            navigate("/");

        } catch (error) {
            alert(error.response?.data?.message || "Error al registrar");
        }
    };

    return (
        <div className="auth-container">

            <form className="auth-box" onSubmit={handleSubmit}>
<div
    style={{
        fontSize: "65px",
        textAlign: "center"
    }}
>
    🌾
</div>
                <h2>Crear cuenta</h2>
                <p
    style={{
        textAlign: "center",
        color: "#64748b",
        marginTop: "-5px"
    }}
>
    Únete al marketplace agroalimentario de Bolivia
</p>

                <input name="nombre" placeholder="Nombre" onChange={handleChange} />
                <input name="apellido" placeholder="Apellido" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
                <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />

                <select name="tipo" onChange={handleChange}>
                    <option value="COMPRADOR">Soy comprador</option>
                    <option value="VENDEDOR">Quiero ser vendedor</option>
                </select>

                {form.tipo === "VENDEDOR" && (
                    <>
                        <input name="negocio" placeholder="Nombre negocio" onChange={handleChange} />
                        <textarea name="descripcionNegocio" placeholder="Descripción" onChange={handleChange} />
                        <input name="whatsapp" placeholder="WhatsApp" onChange={handleChange} />
                        <input name="direccion" placeholder="Dirección" onChange={handleChange} />
                        <textarea name="motivo" placeholder="Motivo para vender" onChange={handleChange} />
                    </>
                )}

                <button>Registrarse</button>

                <p onClick={() => navigate("/")}>
                    ¿Ya tienes cuenta? Inicia sesión
                </p>

            </form>

        </div>
    );
}