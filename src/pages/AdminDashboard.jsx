import { useEffect, useState } from "react";
import api from "../services/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell
} from "recharts";

export default function AdminDashboard() {
    // --- ESTADOS ---
    const [lista, setLista] = useState([]);
    const [stats, setStats] = useState({});
    const [solicitudes, setSolicitudes] = useState([]);
    const [vista, setVista] = useState("stats");
    const [detalle, setDetalle] = useState([]);
    const [data, setData] = useState(null);

    const token = localStorage.getItem("token");

    // --- EFECTOS ---
    useEffect(() => {
        cargarStats();
        cargarSolicitudes();
        cargar();
        cargarLista();
    }, []);

    // --- LÓGICA / PETICIONES ---
    const cargarLista = async () => {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/incidencias/lista", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLista(res.data.data);
    };

    const cargarStats = async () => {
        try {
            const res = await api.get("/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStats(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const cargarUsuarios = async () => {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/usuarios", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setDetalle(res.data.data);
        setVista("usuarios");
    };

    const cargarVendedores = async () => {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/vendedores", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setDetalle(res.data.data);
        setVista("vendedores");
    };

    const cargarProductos = async () => {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/productos", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setDetalle(res.data.data);
        setVista("productos");
    };

    const cargarSolicitudes = async () => {
        try {
            const res = await api.get("/admin/solicitudes", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSolicitudes(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const aprobar = async (id) => {
        try {
            await api.put(`/admin/solicitudes/${id}/aprobar`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            cargarSolicitudes(); 
        } catch (error) {
            console.log(error.response?.data || error);
        }
    };

    const rechazar = async (id) => {
        try {
            await api.put(`/admin/solicitudes/${id}/rechazar`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            cargarSolicitudes();
        } catch (error) {
            console.log(error);
        }
    };

    const cargar = async () => {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/incidencias", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setData(res.data.data);
    };

    // --- RENDER DE CARGA ---
    if (!data) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Segoe UI, sans-serif", color: "#8e8e93", backgroundColor: "#fbfbfb" }}>
                <p style={{ fontSize: "1.2rem", fontWeight: "300" }}>Cargando dashboard...</p>
            </div>
        );
    }

    // --- CONFIGURACIÓN DE GRÁFICOS ---
    const chartData = [
        { name: "Pendientes", value: data.pendientes },
        { name: "En proceso", value: data.enProceso },
        { name: "Resueltas", value: data.resueltas }
    ];

    const COLORS = ["#ffcc80", "#90caf9", "#a5d6a7"]; // Tonos pastel para las gráficas

    // --- PALETA DE DISEÑO ---
    const styles = {
        container: { padding: "40px", backgroundColor: "#f9f9fb", fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif", color: "#3a3a3c", minHeight: "100vh" },
        header: { fontSize: "28px", fontWeight: "600", marginBottom: "30px", color: "#1c1c1e", letterSpacing: "-0.5px" },
        subHeader: { fontSize: "20px", fontWeight: "500", marginTop: "40px", marginBottom: "20px", color: "#2c2c2e" },
        gridStats: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "35px" },
        cardStat: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "100px", border: "1px solid #f2f2f7" },
        btnStat: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #e5e5ea", cursor: "pointer", textAlign: "left", transition: "all 0.2s ease", fontFamily: "inherit", fontSize: "16px", color: "#1c1c1e", fontWeight: "500" },
        cardSolicitud: { backgroundColor: "#ffffff", border: "1px solid #f2f2f7", padding: "25px", marginBottom: "20px", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" },
        btnAprobar: { background: "#e8f5e9", color: "#2e7d32", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "14px" },
        btnRechazar: { background: "#ffebee", color: "#c62828", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "14px" },
        badge: (estado) => ({
            padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block",
            background: estado === "PENDIENTE" ? "#fff3e0" : estado === "APROBADO" ? "#e8f5e9" : "#ffebee",
            color: estado === "PENDIENTE" ? "#ef6c00" : estado === "APROBADO" ? "#2e7d32" : "#c62828"
        }),
        divider: { border: "none", height: "1px", backgroundColor: "#f2f2f7", margin: "15px 0" },
        textMuted: { color: "#8e8e93", fontSize: "14px" },
        flexCharts: { display: "flex", flexWrap: "wrap", gap: "30px", marginTop: "20px", backgroundColor: "#ffffff", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)", border: "1px solid #f2f2f7" }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>🛠 Panel de Administración EMAPA</h1>

            {/* 📊 SECCIÓN DE ESTADÍSTICAS / KPIS */}
            <div style={styles.gridStats}>
                <button onClick={cargarUsuarios} style={styles.btnStat}>
                    <span style={{ fontSize: "20px", marginRight: "8px" }}>👤</span> Usuarios: <span style={{ fontWeight: "700", color: "#007aff" }}>{stats.usuarios}</span>
                </button>

                <button onClick={cargarVendedores} style={styles.btnStat}>
                    <span style={{ fontSize: "20px", marginRight: "8px" }}>🧑‍🌾</span> Vendedores: <span style={{ fontWeight: "700", color: "#007aff" }}>{stats.vendedores}</span>
                </button>

                <button onClick={cargarProductos} style={styles.btnStat}>
                    <span style={{ fontSize: "20px", marginRight: "8px" }}>📦</span> Productos: <span style={{ fontWeight: "700", color: "#007aff" }}>{stats.productos}</span>
                </button>

                <div style={styles.cardStat}>
                    <span style={styles.textMuted}>🛒 Total Pedidos</span>
                    <span style={{ fontSize: "22px", fontWeight: "600", marginTop: "5px" }}>{stats.pedidos}</span>
                </div>
                <div style={styles.cardStat}>
                    <span style={styles.textMuted}>⏳ Pedidos Pendientes</span>
                    <span style={{ fontSize: "22px", fontWeight: "600", marginTop: "5px", color: "#ef6c00" }}>{stats.pedidosPendientes}</span>
                </div>
                <div style={styles.cardStat}>
                    <span style={styles.textMuted}>🚚 Pedidos Enviados</span>
                    <span style={{ fontSize: "22px", fontWeight: "600", marginTop: "5px", color: "#2e7d32" }}>{stats.pedidosEnviados}</span>
                </div>
                <div style={styles.cardStat}>
                    <span style={styles.textMuted}>💰 Ingresos Totales</span>
                    <span style={{ fontSize: "22px", fontWeight: "700", marginTop: "5px", color: "#1c1c1e" }}>Bs {stats.ingresosTotales}</span>
                </div>
            </div>

            {/* 📋 VISTAS DETALLE DINÁMICAS */}
            {vista === "usuarios" && (
                <div style={{ ...styles.cardSolicitud, borderLeft: "4px solid #007aff" }}>
                    <h3 style={{ marginTop: 0, marginBottom: "15px" }}>👤 Listado de Usuarios</h3>
                    {detalle.map(u => (
                        <div key={u.id} style={{ padding: "10px 0", borderBottom: "1px solid #f2f2f7" }}>
                            <b>{u.nombre} {u.apellido}</b> <span style={styles.textMuted}>— {u.email}</span>
                        </div>
                    ))}
                </div>
            )}
            {vista === "vendedores" && (
                <div style={{ ...styles.cardSolicitud, borderLeft: "4px solid #007aff" }}>
                    <h3 style={{ marginTop: 0, marginBottom: "15px" }}>🧑‍🌾 Listado de Vendedores</h3>
                    {detalle.map(v => (
                        <div key={v.id} style={{ padding: "10px 0", borderBottom: "1px solid #f2f2f7" }}>
                            <b>{v.usuario.nombre}</b> <span style={styles.textMuted}>— {v.negocio}</span>
                        </div>
                    ))}
                </div>
            )}
            {vista === "productos" && (
                <div style={{ ...styles.cardSolicitud, borderLeft: "4px solid #007aff" }}>
                    <h3 style={{ marginTop: 0, marginBottom: "15px" }}>📦 Listado de Productos</h3>
                    {detalle.map(p => (
                        <div key={p.id} style={{ padding: "10px 0", borderBottom: "1px solid #f2f2f7" }}>
                            <b>{p.nombre}</b> <span style={{ ...styles.textMuted, color: "#2e7d32", fontWeight: "500" }}>— Bs {p.precio}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* 📩 SOLICITUDES DE VENDEDORES */}
            <h2 style={styles.subHeader}>📩 Solicitudes de vendedores</h2>
            {solicitudes.length === 0 && <p style={styles.textMuted}>No hay solicitudes actualmente.</p>}
            
            {solicitudes.map((s) => {
                let datos = {};
                try {
                    datos = s.motivo ? JSON.parse(s.motivo) : {};
                } catch (e) {
                    datos = { motivo: s.motivo };
                }
                return (
                    <div key={s.id} style={styles.cardSolicitud}>
                        <div style={{ display: "flex", justifyContent: "between", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
                            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>📌 Solicitud #{s.id}</h3>
                            <span style={styles.badge(s.estadoSolicitud.nombre)}>{s.estadoSolicitud.nombre}</span>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginTop: "15px" }}>
                            <p style={{ margin: 0 }}><b>Usuario:</b> {s.usuario.nombre} {s.usuario.apellido}</p>
                            <p style={{ margin: 0 }}><b>Email:</b> {s.usuario.email}</p>
                        </div>

                        <hr style={styles.divider} />

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                            <p style={{ margin: 0 }}><b>🏪 Negocio:</b> {datos.negocio || "Sin dato"}</p>
                            <p style={{ margin: 0 }}><b>📱 WhatsApp:</b> {datos.whatsapp || "Sin dato"}</p>
                            <p style={{ margin: 0 }}><b>📍 Dirección:</b> {datos.direccion || "Sin dato"}</p>
                            <p style={{ margin: 0, gridColumn: "1 / -1" }}><b>📝 Descripción:</b> {datos.descripcionNegocio || "Sin dato"}</p>
                            <p style={{ margin: 0, gridColumn: "1 / -1" }}><b>💬 Motivo:</b> {datos.motivo || "Sin motivo"}</p>
                        </div>

                        <hr style={styles.divider} />

                        <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
                            <button onClick={() => aprobar(s.id)} style={styles.btnAprobar}>
                                Aprobar
                            </button>
                            <button onClick={() => rechazar(s.id)} style={styles.btnRechazar}>
                                Rechazar
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* 📋 TODAS LAS INCIDENCIAS */}
            <h2 style={styles.subHeader}>📋 Todas las incidencias</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "15px", marginBottom: "40px" }}>
                {lista.map(i => (
                    <div key={i.id} style={{ ...styles.cardSolicitud, marginBottom: 0, padding: "20px" }}>
                        <p style={{ margin: "0 0 8px 0" }}><b>Usuario:</b> {i.usuario.nombre}</p>
                        <p style={{ margin: "0 0 8px 0" }}><b>Pedido:</b> #{i.pedidoId}</p>
                        <p style={{ margin: "0 0 8px 0" }}><b>Estado:</b> <span style={{ color: "#007aff", fontWeight: "600" }}>{i.estadoIncidencia.nombre}</span></p>
                        <p style={{ margin: "0", color: "#48484a" }}><b>Descripción:</b> {i.descripcion}</p>
                    </div>
                ))}
            </div>

            {/* 📊 SECCIÓN DE GRÁFICOS DE INCIDENCIAS */}
            <h2 style={styles.subHeader}>📊 Métricas de Incidencias</h2>
            
            <div style={{ ...styles.gridStats, gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "20px" }}>
                <div style={styles.cardStat}>
                    <span style={styles.textMuted}>📌 Total Incidencias</span>
                    <span style={{ fontSize: "22px", fontWeight: "600" }}>{data.total}</span>
                </div>
                <div style={styles.cardStat}>
                    <span style={styles.textMuted}>⏳ Pendientes</span>
                    <span style={{ fontSize: "22px", fontWeight: "600", color: "#ff9800" }}>{data.pendientes}</span>
                </div>
                <div style={styles.cardStat}>
                    <span style={styles.textMuted}>🔵 En proceso</span>
                    <span style={{ fontSize: "22px", fontWeight: "600", color: "#2196f3" }}>{data.enProceso}</span>
                </div>
                <div style={styles.cardStat}>
                    <span style={styles.textMuted}>✅ Resueltas</span>
                    <span style={{ fontSize: "22px", fontWeight: "600", color: "#4caf50" }}>{data.resueltas}</span>
                </div>
            </div>

            <div style={styles.flexCharts}>
                <div style={{ flex: "1", minWidth: "300px", display: "flex", justifyContent: "center" }}>
                    <PieChart width={350} height={300}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            innerRadius={40} // Convierte el gráfico en Donut Chart (más moderno)
                            paddingAngle={4}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>

                <div style={{ flex: "1", minWidth: "300px", display: "flex", justifyContent: "center" }}>
                    <BarChart width={400} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f2f2f7" />
                        <XAxis dataKey="name" stroke="#8e8e93" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#8e8e93" tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#90caf9" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </div>
            </div>
        </div>
    );
}
