import "../styles/login.css";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const res = await api.post("/auth/login", {
                email,
                password
            });

            const { token, user } = res.data.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // =========================
            // 🔥 ADMIN
            // =========================
            if (user.rol === "ADMIN") {
                navigate("/admin");
                return;
            }

            // =========================
            // 🔥 VENDEDOR
            // =========================
            if (user.rol === "VENDEDOR") {

                try {

                    const perfilRes = await api.get("/vendedor/me", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const vendedor = perfilRes.data.data?.vendedor;
                    const perfilCompleto = perfilRes.data.data?.perfilCompleto;

                    // 🚨 NO EXISTE PERFIL O NO ESTÁ COMPLETO
                    if (!vendedor || !perfilCompleto) {
                        navigate("/completar-perfil-vendedor");
                        return;
                    }

                    // ✅ TODO OK
                    navigate("/vendedor");
                    return;

                } catch (err) {
                    console.log("Error verificando perfil vendedor", err);

                    // 🔥 si falla la validación, lo mandamos a completar
                    navigate("/completar-perfil-vendedor");
                    return;
                }
            }

            // =========================
            // 👤 COMPRADOR
            // =========================
            navigate("/");

        } catch (error) {
            alert(error.response?.data?.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            <div className="login-box">

                <h2>Sistema EMAPA Marketplace</h2>
                <p>Inicia sesión para continuar</p>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>

                    <p
                        onClick={() => navigate("/register")}
                        style={{ cursor: "pointer", marginTop: "10px" }}
                    >
                        ¿No tienes cuenta? Regístrate
                    </p>

                </form>

            </div>

        </div>
    );
}