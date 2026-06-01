import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {

    const [user, setUser] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [incidencias, setIncidencias] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {

        const token = localStorage.getItem("token");

        try {

            const [resUser, resPedidos, resIncidencias] = await Promise.all([
                api.get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                api.get("/pedidos/mis", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                api.get("/incidencias/mis", {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setUser(resUser.data.data);
            setPedidos(resPedidos.data.data);
            setIncidencias(resIncidencias.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "250px 1fr",
            minHeight: "100vh",
            background: "#f5f7fb"
        }}>

            {/* SIDEBAR */}
            <div style={{
                background: "#0d47a1",
                color: "white",
                padding: "20px"
            }}>

                <h2>👤 Mi cuenta</h2>

                {user && (
                    <>
                        <p>{user.nombre}</p>
                        <p>{user.email}</p>
                    </>
                )}

                <hr />

                <p style={{ cursor: "pointer" }}>🧾 Mis pedidos</p>
                <p style={{ cursor: "pointer" }}>🚨 Incidencias</p>
                <p style={{ cursor: "pointer" }}>❤️ Favoritos</p>

                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                    }}
                    style={{
                        marginTop: "20px",
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        width: "100%"
                    }}
                >
                    Cerrar sesión
                </button>

            </div>

            {/* CONTENT */}
            <div style={{ padding: "20px" }}>

                {/* PEDIDOS */}
                <h2>🧾 Mis pedidos</h2>

                {pedidos.length === 0 && <p>No tienes pedidos</p>}

                {pedidos.map(p => (
                    <div key={p.id} style={{
                        background: "white",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "10px"
                    }}>

                        <p>Pedido #{p.id}</p>
                        <p>Total: Bs {p.total}</p>

                        <button onClick={() => navigate(`/incidencia/${p.id}`)}>
                            🚨 Reportar problema
                        </button>

                    </div>
                ))}

                <hr />

                {/* INCIDENCIAS */}
                <h2>🚨 Mis incidencias</h2>

                {incidencias.length === 0 && <p>No tienes incidencias</p>}

                {incidencias.map(i => (
                    <div key={i.id} style={{
                        background: "#fff3e0",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "10px"
                    }}>

                        <p>Pedido #{i.pedidoId}</p>
                        <p>Estado: {i.estadoIncidencia?.nombre}</p>
                        <p>{i.descripcion}</p>

                    </div>
                ))}

            </div>
        </div>
    );
}