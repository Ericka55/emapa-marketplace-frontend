import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function IncidenciaUsuario() {

    const { pedidoId } = useParams();
    const [descripcion, setDescripcion] = useState("");

    const enviar = async () => {

        const token = localStorage.getItem("token");

        await api.post(
            "/incidencias",
            {
                pedidoId: Number(pedidoId),
                descripcion
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Incidencia enviada");
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>🚨 Reportar problema del pedido #{pedidoId}</h1>

            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe el problema"
            />

            <button onClick={enviar}>
                Enviar incidencia
            </button>

        </div>
    );
}