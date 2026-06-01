import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getImageUrl } from "../utils/image";
export default function Pedidos() {

    const navigate = useNavigate();

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(
                "/pedidos/mis-pedidos",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPedidos(res.data.data);

        } catch (error) {
            console.log(error.response?.data || error);
        }
    };

    return (
    <div
        style={{
            background: "#f8fafc",
            minHeight: "100vh",
            padding: "30px"
        }}
    >
        {/* CABECERA */}
        <div
            style={{
                maxWidth: "1200px",
                margin: "0 auto 30px auto"
            }}
        >
            <h1
                style={{
                    margin: 0,
                    fontSize: "2.5rem",
                    color: "#0f172a"
                }}
            >
                📦 Mis pedidos
            </h1>

            <p
                style={{
                    color: "#64748b",
                    marginTop: "10px"
                }}
            >
                Consulta el estado de todas tus compras.
            </p>
        </div>

        <div
            style={{
                maxWidth: "1200px",
                margin: "0 auto"
            }}
        >
            {pedidos.length === 0 && (
                <div
                    style={{
                        background: "white",
                        borderRadius: "24px",
                        padding: "70px",
                        textAlign: "center",
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,.05)"
                    }}
                >
                    <div
                        style={{
                            fontSize: "80px"
                        }}
                    >
                        📦
                    </div>

                    <h2>No tienes pedidos aún</h2>

                    <p
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Cuando realices una compra aparecerá aquí.
                    </p>
                </div>
            )}

            {pedidos.map((pedido) => (
                <div
                    key={pedido.id}
                    style={{
                        background: "white",
                        borderRadius: "24px",
                        padding: "25px",
                        marginBottom: "25px",
                        boxShadow:
                            "0 8px 25px rgba(0,0,0,.05)"
                    }}
                >
                    {/* HEADER PEDIDO */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "15px",
                            marginBottom: "20px"
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    margin: 0,
                                    color: "#0f172a"
                                }}
                            >
                                Pedido #{pedido.id}
                            </h2>

                            <p
                                style={{
                                    color: "#64748b",
                                    marginTop: "8px"
                                }}
                            >
                                {pedido.detalles?.length || 0} productos
                            </p>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                flexWrap: "wrap"
                            }}
                        >
                            <div
                                style={{
                                    background: "#eef5ff",
                                    color: "#0d47a1",
                                    padding: "10px 18px",
                                    borderRadius: "999px",
                                    fontWeight: "600"
                                }}
                            >
                                {pedido.estadoPedido?.nombre}
                            </div>

                            <div
                                style={{
                                    background: "#ecfdf5",
                                    color: "#16a34a",
                                    padding: "10px 18px",
                                    borderRadius: "999px",
                                    fontWeight: "700"
                                }}
                            >
                                Bs {pedido.total}
                            </div>
                        </div>
                    </div>

                    {/* PRODUCTOS */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px"
                        }}
                    >
                        {pedido.detalles?.map((detalle) => (
                            <div
                                key={detalle.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                    padding: "15px",
                                    borderRadius: "18px",
                                    background: "#f8fafc"
                                }}
                            >
                                <img
src={getImageUrl(detalle.producto.imagenes?.[0]?.urlImagen)}                                    alt={detalle.producto.nombre}
                                    style={{
                                        width: "110px",
                                        height: "110px",
                                        objectFit: "cover",
                                        borderRadius: "15px"
                                    }}
                                />

                                <div
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: 0,
                                            color: "#0f172a"
                                        }}
                                    >
                                        {detalle.producto.nombre}
                                    </h3>

                                    <p
                                        style={{
                                            color: "#64748b"
                                        }}
                                    >
                                        Cantidad: {detalle.cantidad}
                                    </p>

                                    <p
                                        style={{
                                            color: "#64748b"
                                        }}
                                    >
                                        Precio unitario:
                                        {" "}
                                        Bs {detalle.precioUnitario}
                                    </p>
                                </div>

                                <div
                                    style={{
                                        textAlign: "right"
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "700",
                                            color: "#0d47a1",
                                            fontSize: "18px"
                                        }}
                                    >
                                        Bs{" "}
                                        {detalle.precioUnitario *
                                            detalle.cantidad}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BOTONES */}
                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            flexWrap: "wrap",
                            marginTop: "25px"
                        }}
                    >
                        <button
                            onClick={() =>
                                navigate(
                                    `/incidencia/${pedido.id}`
                                )
                            }
                            style={{
                                border: "none",
                                background: "#fee2e2",
                                color: "#dc2626",
                                padding: "12px 18px",
                                borderRadius: "12px",
                                cursor: "pointer",
                                fontWeight: "600"
                            }}
                        >
                            🚨 Reportar incidencia
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    `/producto/${pedido.detalles?.[0]?.productoId}`
                                )
                            }
                            style={{
                                border: "none",
                                background:
                                    "linear-gradient(135deg,#0d47a1,#1976d2)",
                                color: "white",
                                padding: "12px 18px",
                                borderRadius: "12px",
                                cursor: "pointer",
                                fontWeight: "600"
                            }}
                        >
                            ⭐ Ver producto
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}