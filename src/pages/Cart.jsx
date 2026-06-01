import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/image";
export default function Cart() {
const qtyBtn = {
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "10px",
    background: "#eef5ff",
    cursor: "pointer",
    fontSize: "16px"
};
const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        cargarCarrito();
    }, []);

    const cargarCarrito = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/carrito", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCarrito(res.data.data?.detalles || []);

        } catch (error) {
            console.log(error.response?.data || error);
        }
    };
    const eliminar = async (id) => {

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/carrito/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        cargarCarrito(); // 🔥 refresca lista

    } catch (error) {
        console.log(error.response?.data || error);
    }
};
const cambiarCantidad = async (id, accion) => {

    try {

        const token = localStorage.getItem("token");

        await api.put(
            `/carrito/${id}`,
            { accion },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        cargarCarrito(); // refrescar

    } catch (error) {
        console.log(error.response?.data || error);
    }
};
    const total = carrito.reduce((acc, item) => {
        return acc + item.producto.precio * item.cantidad;
    }, 0);

    return (
    <div
        style={{
            background: "#f8fafc",
            minHeight: "100vh",
            padding: "30px"
        }}
    >

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
                flexWrap: "wrap",
                gap: "15px"
            }}
        >
            <div>
                <h1
                    style={{
                        margin: 0,
                        color: "#0f172a"
                    }}
                >
                    🛒 Mi Carrito
                </h1>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    {carrito.length} productos seleccionados
                </p>
            </div>

            <div
                style={{
                    background: "white",
                    padding: "15px 20px",
                    borderRadius: "15px",
                    boxShadow:
                        "0 4px 15px rgba(0,0,0,.05)"
                }}
            >
                <strong>Total:</strong>{" "}
                <span
                    style={{
                        color: "#0d47a1",
                        fontSize: "22px",
                        fontWeight: "bold"
                    }}
                >
                    Bs {total}
                </span>
            </div>
        </div>

        {carrito.length === 0 ? (
            <div
                style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "60px",
                    textAlign: "center",
                    boxShadow:
                        "0 4px 20px rgba(0,0,0,.05)"
                }}
            >
                <div
                    style={{
                        fontSize: "70px"
                    }}
                >
                    🛒
                </div>

                <h2>
                    Tu carrito está vacío
                </h2>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    Explora nuestros productos y agrega
                    lo que necesites.
                </p>

                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginTop: "20px",
                        background: "#0d47a1",
                        color: "white",
                        border: "none",
                        padding: "12px 25px",
                        borderRadius: "12px",
                        cursor: "pointer"
                    }}
                >
                    Ver productos
                </button>
            </div>
        ) : (
            <>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >
                    {carrito.map(item => (
                        <div
                            key={item.id}
                            style={{
                                background: "white",
                                borderRadius: "20px",
                                padding: "20px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,.05)",

                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "20px"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px"
                                }}
                            >
                                <div
    style={{
        width: "100px",
        height: "100px",
        borderRadius: "15px",
        overflow: "hidden",
        flexShrink: 0,
        background: "#f1f5f9"
    }}
>
    <img
        src={
            item.producto.imagenes?.[0]?.urlImagen
                ? getImageUrl(item.producto.imagenes[0].urlImagen)
                : "https://via.placeholder.com/100"
        }
        alt={item.producto.nombre}
        style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
        }}
    />
</div>

                                <div>
                                    <h3
                                        style={{
                                            margin: 0
                                        }}
                                    >
                                        {item.producto.nombre}
                                    </h3>

                                    <p
                                        style={{
                                            color: "#64748b"
                                        }}
                                    >
                                        Bs {item.producto.precio}
                                    </p>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                            >
                                <button
                                    onClick={() =>
                                        cambiarCantidad(
                                            item.id,
                                            "restar"
                                        )
                                    }
                                    style={qtyBtn}
                                >
                                    ➖
                                </button>

                                <span
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "18px"
                                    }}
                                >
                                    {item.cantidad}
                                </span>

                                <button
                                    onClick={() =>
                                        cambiarCantidad(
                                            item.id,
                                            "sumar"
                                        )
                                    }
                                    style={qtyBtn}
                                >
                                    ➕
                                </button>
                            </div>

                            <div
                                style={{
                                    textAlign: "right"
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "22px",
                                        color: "#0d47a1"
                                    }}
                                >
                                    Bs{" "}
                                    {item.producto.precio *
                                        item.cantidad}
                                </div>

                                <button
                                    onClick={() =>
                                        eliminar(item.id)
                                    }
                                    style={{
                                        marginTop: "10px",
                                        border: "none",
                                        background:
                                            "#fee2e2",
                                        color: "#dc2626",
                                        padding:
                                            "10px 15px",
                                        borderRadius:
                                            "10px",
                                        cursor:
                                            "pointer"
                                    }}
                                >
                                    ❌ Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        marginTop: "30px",
                        background: "white",
                        padding: "25px",
                        borderRadius: "20px",
                        boxShadow:
                            "0 4px 15px rgba(0,0,0,.05)"
                    }}
                >
                    <h2>
                        Total a pagar:
                        <span
                            style={{
                                color: "#0d47a1"
                            }}
                        >
                            {" "}
                            Bs {total}
                        </span>
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/checkout")
                        }
                        style={{
                            width: "100%",
                            marginTop: "15px",
                            padding: "15px",
                            border: "none",
                            borderRadius: "15px",
                            background:
                                "linear-gradient(135deg,#0d47a1,#1976d2)",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        💳 Proceder al pago
                    </button>
                </div>
            </>
        )}
    </div>
);
}