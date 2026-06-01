import { useEffect, useState } from "react";
import api from "../services/api";

export default function Incidencias() {

    const [incidencias, setIncidencias] = useState([]);
    const [descripcion, setDescripcion] = useState("");
    const [pedidoId, setPedidoId] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const res = await api.get("/incidencias", {
            headers: { Authorization: `Bearer ${token}` }
        });

        setIncidencias(res.data.data);
    };

    const crear = async () => {

        await api.post(
            "/incidencias",
            { pedidoId, descripcion },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setDescripcion("");
        setPedidoId("");

        cargar();
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>📩 Mis incidencias</h1>

            <input
                placeholder="ID pedido"
                value={pedidoId}
                onChange={(e) => setPedidoId(e.target.value)}
            />

            <textarea
                placeholder="Describe el problema"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />

            <button onClick={crear}>
                Enviar incidencia
            </button>

            <hr />

            {incidencias.map(i => (
                <div key={i.id}>
                    <p>Pedido: {i.pedidoId}</p>
                    <p>{i.descripcion}</p>
                </div>
            ))}

        </div>
    );
}