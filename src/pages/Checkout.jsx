import { useState } from "react";
import api from "../services/api";

export default function Checkout() {

    const [direccionEntrega, setDireccion] = useState("");
    const [telefonoContacto, setTelefono] = useState("");
const inputStyle = {
    width: "100%",
    height: "55px",
    border: "2px solid #e2e8f0",
    borderRadius: "14px",
    padding: "0 16px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box"
};
    const confirmarCompra = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.post(
                "/carrito/checkout",
                {
                    metodoPagoId: 1, // 👈 por ahora fijo
                    direccionEntrega,
                    telefonoContacto
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Compra realizada con éxito 🛒");
            console.log(res.data);

        } catch (error) {
            console.log(error.response?.data || error);
            alert("Error en el checkout");
        }
    };

    return (
    <div
        style={{
            minHeight: "100vh",
            background: "#f8fafc",
            padding: "40px 20px"
        }}
    >
        <div
            style={{
                maxWidth: "800px",
                margin: "0 auto"
            }}
        >
            {/* HEADER */}
            <div
                style={{
                    marginBottom: "30px"
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        color: "#0f172a",
                        fontSize: "2.5rem"
                    }}
                >
                    💳 Finalizar compra
                </h1>

                <p
                    style={{
                        color: "#64748b",
                        marginTop: "10px"
                    }}
                >
                    Completa los datos para recibir tu pedido.
                </p>
            </div>

            {/* CARD */}
            <div
                style={{
                    background: "white",
                    borderRadius: "24px",
                    padding: "35px",
                    boxShadow: "0 10px 30px rgba(0,0,0,.06)"
                }}
            >
                {/* DIRECCIÓN */}
                <div style={{ marginBottom: "25px" }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#334155"
                        }}
                    >
                        📍 Dirección de entrega
                    </label>

                    <input
                        placeholder="Ej. Av. Arce #123, La Paz"
                        value={direccionEntrega}
                        onChange={(e) =>
                            setDireccion(e.target.value)
                        }
                        style={inputStyle}
                    />
                </div>

                {/* TELÉFONO */}
                <div style={{ marginBottom: "25px" }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#334155"
                        }}
                    >
                        📱 Teléfono de contacto
                    </label>

                    <input
                        placeholder="Ej. 76543210"
                        value={telefonoContacto}
                        onChange={(e) =>
                            setTelefono(e.target.value)
                        }
                        style={inputStyle}
                    />
                </div>

                {/* MÉTODO */}
                <div
                    style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "16px",
                        padding: "18px",
                        marginBottom: "30px"
                    }}
                >
                    <h3
                        style={{
                            marginTop: 0,
                            color: "#0f172a"
                        }}
                    >
                        Método de pago
                    </h3>

                    <p
                        style={{
                            margin: 0,
                            color: "#64748b"
                        }}
                    >
                        💵 Pago registrado en el sistema
                    </p>
                </div>

                {/* RESUMEN */}
                <div
                    style={{
                        background:
                            "linear-gradient(135deg,#eef5ff,#f8fbff)",
                        borderRadius: "18px",
                        padding: "20px",
                        marginBottom: "25px"
                    }}
                >
                    <h3
                        style={{
                            marginTop: 0,
                            color: "#0d47a1"
                        }}
                    >
                        🔒 Compra segura
                    </h3>

                    <p
                        style={{
                            marginBottom: 0,
                            color: "#475569"
                        }}
                    >
                        Tus datos serán utilizados únicamente para
                        gestionar la entrega de tu pedido.
                    </p>
                </div>

                {/* BOTÓN */}
                <button
                    onClick={confirmarCompra}
                    style={{
                        width: "100%",
                        height: "58px",
                        border: "none",
                        borderRadius: "16px",
                        background:
                            "linear-gradient(135deg,#16a34a,#22c55e)",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "700",
                        cursor: "pointer",
                        boxShadow:
                            "0 10px 25px rgba(34,197,94,.25)"
                    }}
                >
                    ✅ Confirmar compra
                </button>
            </div>
        </div>
    </div>
);
}