import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [busqueda, setBusqueda] = useState("");
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

    const sugerencias = [
        "arroz",
        "azúcar",
        "leche",
        "aceite",
        "harina",
        "pan",
        "fideo",
        "carne",
        "pollo"
    ];

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("search");
        navigate("/");
        window.location.reload();
    };

    const buscar = (texto = busqueda) => {
    const query = texto.trim();

    if (!query) {
        navigate("/"); // 👈 ESTO LIMPIA LA BÚSQUEDA
        return;
    }

    navigate(`/?search=${encodeURIComponent(query)}`);
    setMostrarSugerencias(false);
};

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                background: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                borderBottom: "1px solid #eef2f7"
            }}
        >

            {/* TOP BAR */}
            <div style={{
                background: "#0d47a1",
                color: "white",
                padding: "8px 25px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px"
            }}>
                <span>🌾 Marketplace Agroalimentario de Bolivia</span>
                <span>📦 Pedidos | 💬 Soporte</span>
            </div>

            {/* HEADER MAIN */}
            <div style={{
                padding: "15px 25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap"
            }}>

                {/* LOGO */}
                <div
                    onClick={() => navigate("/")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer"
                    }}
                >
                    <div style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "14px",
                        background: "#eef5ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px"
                    }}>
                        🌾
                    </div>

                    <div>
                        <h2 style={{ margin: 0, color: "#0d47a1" }}>EMAPA</h2>
                        <span style={{ color: "#64748b", fontSize: "13px" }}>
                            Market
                        </span>
                    </div>
                </div>

                {/* SEARCH */}
                <div style={{
                    flex: 1,
                    minWidth: "250px",
                    maxWidth: "700px",
                    position: "relative"
                }}>

                    <input
                        placeholder="Buscar productos..."
                        value={busqueda}
                        onChange={(e) => {
    const value = e.target.value;
    setBusqueda(value);
    setMostrarSugerencias(true);

    if (value.trim() === "") {
        navigate("/"); // 👈 limpia URL cuando borras todo
    }
}}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") buscar();
                        }}
                        style={{
                            width: "85%",
                            height: "52px",
                            borderRadius: "999px",
                            border: "2px solid #e2e8f0",
                            outline: "none",
                            padding: "0 60px 0 20px",
                            fontSize: "15px"
                        }}
                    />

                    <button
                        onClick={() => buscar()}
                        style={{
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            width: "40px",
                            height: "40px",
                            border: "none",
                            borderRadius: "50%",
                            background: "#0d47a1",
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        🔍
                    </button>

                    {/* SUGERENCIAS */}
                    {mostrarSugerencias && busqueda && (
                        <div style={{
                            position: "absolute",
                            top: "60px",
                            left: 0,
                            right: 0,
                            background: "white",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                            zIndex: 999
                        }}>
                            {sugerencias
                                .filter(s =>
                                    s.toLowerCase().includes(busqueda.toLowerCase())
                                )
                                .map((s, i) => (
                                    <div
                                        key={i}
                                        onClick={() => buscar(s)}
                                        style={{
                                            padding: "12px",
                                            cursor: "pointer",
                                            borderBottom: "1px solid #f1f1f1"
                                        }}
                                    >
                                        🔎 {s}
                                    </div>
                                ))}
                        </div>
                    )}

                </div>

                {/* USER MENU */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap"
                }}>

                    {!user && (
                        <>
                            <button onClick={() => navigate("/login")} style={menuBtn}>
                                Iniciar sesión
                            </button>

                            <button onClick={() => navigate("/register")} style={{
                                ...menuBtn,
                                background: "#0d47a1",
                                color: "white"
                            }}>
                                Registrarse
                            </button>
                        </>
                    )}

                    {user?.rol === "COMPRADOR" && (
                        <>
                            <button onClick={() => navigate("/carrito")} style={menuBtn}>
                                🛒 Carrito
                            </button>

                            <button onClick={() => navigate("/pedidos")} style={menuBtn}>
                                📦 Pedidos
                            </button>

                            <button onClick={logout} style={{
                                ...menuBtn,
                                background: "#ef4444",
                                color: "white"
                            }}>
                                Salir
                            </button>
                        </>
                    )}

                    {user?.rol === "VENDEDOR" && (
                        <>
                            <button onClick={() => navigate("/vendedor")} style={menuBtn}>
                                🏪 Vendedor
                            </button>

                            <button onClick={logout} style={{
                                ...menuBtn,
                                background: "#ef4444",
                                color: "white"
                            }}>
                                Salir
                            </button>
                        </>
                    )}

                    {user?.rol === "ADMIN" && (
                        <>
                            <button onClick={() => navigate("/admin")} style={menuBtn}>
                                🛠 Admin
                            </button>

                            <button onClick={logout} style={{
                                ...menuBtn,
                                background: "#ef4444",
                                color: "white"
                            }}>
                                Salir
                            </button>
                        </>
                    )}

                </div>

            </div>
        </header>
    );
}

const menuBtn = {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "white",
    cursor: "pointer",
    fontWeight: "500"
};