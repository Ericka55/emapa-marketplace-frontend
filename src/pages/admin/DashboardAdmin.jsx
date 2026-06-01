import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardAdmin() {

    const [stats, setStats] = useState({});
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {

        const resStats = await api.get("/admin/dashboard");
        const resSol = await api.get("/admin/solicitudes");

        setStats(resStats.data.data);
        setSolicitudes(resSol.data.data);
    };

    const aprobar = async (id) => {
        await api.put(`/admin/solicitudes/${id}/aprobar`);
        cargarDatos();
    };

    return (
        <div style={{ display: "flex" }}>

            {/* SIDEBAR */}
            <div style={{
                width: "250px",
                height: "100vh",
                background: "#0d47a1",
                color: "white",
                padding: "20px"
            }}>
                <h2>EMAPA ADMIN</h2>

                <p>📊 Dashboard</p>
                <p>👥 Usuarios</p>
                <p>🧑‍🌾 Vendedores</p>
                <p>📦 Productos</p>
            </div>

            {/* CONTENIDO */}
            <div style={{ flex: 1, padding: "20px" }}>

                <h1 style={{ color: "#0d47a1" }}>
                    Panel Administrativo
                </h1>

                {/* STATS */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "15px"
                }}>

                    <div className="card">
                        <h3>Usuarios</h3>
                        <p>{stats.usuarios}</p>
                    </div>

                    <div className="card">
                        <h3>Vendedores</h3>
                        <p>{stats.vendedores}</p>
                    </div>

                    <div className="card">
                        <h3>Productos</h3>
                        <p>{stats.productos}</p>
                    </div>

                    <div className="card">
                        <h3>Pedidos</h3>
                        <p>{stats.pedidos}</p>
                    </div>

                </div>

                {/* SOLICITUDES */}
                <h2 style={{ marginTop: "20px" }}>
                    Solicitudes de Vendedor
                </h2>

                {solicitudes.map(sol => (
                    <div key={sol.id} className="card">

                        <p><b>Usuario:</b> {sol.usuario.nombre}</p>
                        <p><b>Email:</b> {sol.usuario.email}</p>
                        <p><b>Estado:</b> {sol.estadoSolicitud.nombre}</p>

                        {sol.estadoSolicitud.nombre === "PENDIENTE" && (
                            <button
                                onClick={() => aprobar(sol.id)}
                                style={{
                                    background: "#0d47a1",
                                    color: "white",
                                    padding: "8px",
                                    border: "none",
                                    marginTop: "10px"
                                }}
                            >
                                Aprobar
                            </button>
                        )}

                    </div>
                ))}

            </div>
        </div>
    );
}