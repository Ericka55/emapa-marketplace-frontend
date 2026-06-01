import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getImageUrl } from "../utils/image";
export default function Home() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [searchParams] = useSearchParams();
const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
    cargar();

    const q = searchParams.get("search");

    if (q && q.trim() !== "") {
        setBusqueda(q);
    } else {
        setBusqueda("");
    }

}, [searchParams]);

    const cargar = async () => {
    const res = await api.get("/productos");

    console.log("HOME");
    console.log(res.data.data);

    setProductos(res.data.data);
};


    const addToCart = async (e, id) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    await api.post(
        "/carrito/agregar",
        { productoId: id, cantidad: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Agregado 🛒");
};
console.log("Busqueda:", busqueda);
console.log("Productos:", productos.length);

const productosFiltrados =
    busqueda.trim() === ""
        ? productos
        : productos.filter(p =>
            p.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
    return (
    <div
        style={{
            background: "#f8fafc",
            minHeight: "100vh",
            padding: "30px"
        }}
    >

        {/* HERO */}
        <div
            style={{
                background:
                    "linear-gradient(135deg,#0d47a1,#1976d2,#42a5f5)",
                borderRadius: "24px",
                padding: "60px 50px",
                color: "white",
                marginBottom: "35px",
                boxShadow: "0 15px 40px rgba(13,71,161,.25)"
            }}
        >
            <h1
                style={{
                    margin: 0,
                    fontSize: "3rem",
                    fontWeight: "800"
                }}
            >
                Compra fácil con EMAPA
            </h1>

            <p
                style={{
                    marginTop: "15px",
                    fontSize: "18px",
                    opacity: .9,
                    maxWidth: "600px"
                }}
            >
                Productos de calidad, precios accesibles
                y compras seguras para toda Bolivia.
            </p>

            <button
                style={{
                    marginTop: "25px",
                    background: "white",
                    color: "#0d47a1",
                    border: "none",
                    padding: "14px 25px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "15px"
                }}
            >
                Explorar productos →
            </button>
        </div>

        {/* CATEGORIAS */}
        <div
            style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                marginBottom: "40px"
            }}
        >
            {[
                "🌾 Granos",
                "🥛 Lácteos",
                "🍞 Panadería",
                "🥩 Carnes",
                "🍎 Frutas",
                "🥬 Verduras"
            ].map(cat => (
                <div
                    key={cat}
                    style={{
                        background: "white",
                        padding: "14px 20px",
                        borderRadius: "14px",
                        boxShadow:
                            "0 4px 12px rgba(0,0,0,.05)",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                    {cat}
                </div>
            ))}
        </div>

        {/* TITULO */}
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px"
            }}
        >
            <h2
                style={{
                    margin: 0,
                    color: "#1e293b"
                }}
            >
                Productos destacados
            </h2>

            <span
                style={{
                    color: "#64748b"
                }}
            >
                {productos.length} productos disponibles
            </span>
        </div>

        {/* PRODUCTOS */}
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fill,minmax(260px,1fr))",
                gap: "25px"
            }}
        >
            {productosFiltrados
            .map(p => (
                <div
                    key={p.id}
                    onClick={() =>
                        navigate(`/producto/${p.id}`)
                    }
                    style={{
                        background: "white",
                        borderRadius: "18px",
                        overflow: "hidden",
                        cursor: "pointer",
                        boxShadow:
                            "0 6px 20px rgba(0,0,0,.06)"
                    }}
                >
                    <div
                        style={{
                            position: "relative"
                        }}
                    >
                        <div
    style={{
        width: "100%",
        aspectRatio: "1 / 1", // 👈 CUADRADO PERFECTO
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderTopLeftRadius: "18px",
        borderTopRightRadius: "18px"
    }}
>
    <img

src={getImageUrl(p.imagenes?.[0]?.urlImagen)}
        alt={p.nombre}
        style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // 👈 recorta sin deformar
            transition: "transform 0.3s ease"
        }}
    />
</div>

                        <div
                            style={{
                                position: "absolute",
                                top: "12px",
                                left: "12px",
                                background: "#0d47a1",
                                color: "white",
                                padding: "6px 12px",
                                borderRadius: "999px",
                                fontSize: "12px"
                            }}
                        >
                            Destacado
                        </div>
                    </div>

                    <div
                        style={{
                            padding: "18px"
                        }}
                    >
                        <h3
                            style={{
                                margin: "0 0 10px",
                                color: "#1e293b"
                            }}
                        >
                            {p.nombre}
                        </h3>

                        <div
                            style={{
                                fontSize: "24px",
                                fontWeight: "800",
                                color: "#0d47a1",
                                marginBottom: "15px"
                            }}
                        >
                            Bs {p.precio}
                        </div>

                        <button
                            onClick={(e) =>
                                addToCart(e, p.id)
                            }
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "none",
                                borderRadius: "12px",
                                background:
                                    "linear-gradient(135deg,#0d47a1,#1976d2)",
                                color: "white",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            🛒 Agregar al carrito
                        </button>
                    </div>
                </div>
            ))}
        </div>

    </div>
);
}