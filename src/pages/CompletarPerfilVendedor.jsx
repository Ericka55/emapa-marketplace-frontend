import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CompletarPerfilVendedor() {
    // --- ESTADOS ---
    const [form, setForm] = useState({
        negocio: "",
        descripcion: "",
        whatsapp: "",
        direccion: ""
    });

    const navigate = useNavigate();

    // --- MANEJO DE EVENTOS ---
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            await api.put("/vendedor/perfil", form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Perfil de vendedor completado correctamente");
            navigate("/vendedor");
        } catch (error) {
            alert(error.response?.data?.message || "Error al completar perfil");
        }
    };

    // --- PALETA DE DISEÑO ---
    const styles = {
        wrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f8f9fc",
            fontFamily: "'Segoe UI', Roboto, sans-serif",
            padding: "20px"
        },
        cardForm: {
            width: "100%",
            maxWidth: "420px",
            backgroundColor: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.03)",
            border: "1px solid #eef2f5",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxSizing: "border-box"
        },
        title: {
            margin: "0 0 5px 0",
            fontSize: "22px",
            fontWeight: "600",
            color: "#1a1a1a",
            textAlign: "center"
        },
        subtitle: {
            margin: "0 0 10px 0",
            fontSize: "14px",
            color: "#8a99ad",
            textAlign: "center",
            lineHeight: "1.4"
        },
        fieldGroup: {
            display: "flex",
            flexDirection: "column",
            gap: "6px"
        },
        label: {
            fontSize: "13px",
            fontWeight: "500",
            color: "#4a5568"
        },
        input: {
            width: "100%",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #dcdfe6",
            fontSize: "14px",
            color: "#333333",
            outline: "none",
            backgroundColor: "#fcfdfe",
            boxSizing: "border-box",
            transition: "all 0.2s ease"
        },
        textarea: {
            width: "100%",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #dcdfe6",
            fontSize: "14px",
            color: "#333333",
            outline: "none",
            backgroundColor: "#fcfdfe",
            boxSizing: "border-box",
            resize: "none",
            minHeight: "90px",
            fontFamily: "inherit",
            transition: "all 0.2s ease"
        },
        button: {
            backgroundColor: "#3182ce",
            color: "#ffffff",
            border: "none",
            padding: "14px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "15px",
            marginTop: "10px",
            boxShadow: "0 4px 12px rgba(49, 130, 206, 0.2)",
            transition: "background 0.2s"
        }
    };

    return (
        <div style={styles.wrapper}>
            <form onSubmit={handleSubmit} style={styles.cardForm}>
                <div>
                    <h2 style={styles.title}>🏪 Configurar Tienda</h2>
                    <p style={styles.subtitle}>Completa los siguientes datos comerciales para empezar a vender en la plataforma.</p>
                </div>

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Nombre del negocio</label>
                    <input
                        style={styles.input}
                        name="negocio"
                        value={form.negocio}
                        placeholder="Ej. Distribuidora Central"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>WhatsApp comercial</label>
                    <input
                        style={styles.input}
                        name="whatsapp"
                        value={form.whatsapp}
                        placeholder="Ej. +591 XXXXXXXX"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Dirección física</label>
                    <input
                        style={styles.input}
                        name="direccion"
                        value={form.direccion}
                        placeholder="Ej. Av. Blanco Galindo Km 5"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Descripción del negocio</label>
                    <textarea
                        style={styles.textarea}
                        name="descripcion"
                        value={form.descripcion}
                        placeholder="Cuéntale a tus clientes qué ofreces en tu negocio..."
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" style={styles.button}>
                    Guardar y Continuar 🚀
                </button>
            </form>
        </div>
    );
}