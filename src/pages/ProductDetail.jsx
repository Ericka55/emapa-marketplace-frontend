import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { getImageUrl } from "../utils/image";
export default function ProductDetail() {

    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [resenas, setResenas] = useState([]);

    const [estrellas, setEstrellas] = useState(5);
    const [comentario, setComentario] = useState("");

    useEffect(() => {
        cargarProducto();
        cargarResenas();
    }, []);

    const cargarProducto = async () => {
        const res = await api.get(`/productos/detalle/${id}`);
        setProducto(res.data.data);
    };
const addToCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Debes iniciar sesión");
        return;
    }

    try {
        await api.post(
            "/carrito/agregar",
            {
                productoId: Number(id),
                cantidad: 1
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Agregado 🛒");

    } catch (error) {
        console.log(error);
        alert("Error al agregar al carrito");
    }
};
    const cargarResenas = async () => {
        const res = await api.get(`/resenas/${id}`);
        setResenas(res.data.data);
    };
const [imagenActiva, setImagenActiva] = useState(0);
    const enviarResena = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión");
            return;
        }

        try {

            await api.post(
                "/resenas",
                {
                    productoId: Number(id),
                    estrellas,
                    comentario
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setComentario("");
            setEstrellas(5);

            cargarResenas(); // 🔥 refresca

        } catch (error) {
            alert("Error al enviar reseña");
        }
    };

    if (!producto) return <p>Cargando...</p>;

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
                maxWidth: "1300px",
                margin: "0 auto"
            }}
        >

            {/* PRODUCTO */}
            <div
                style={{
                    background: "white",
                    borderRadius: "28px",
                    padding: "30px",
                    boxShadow: "0 10px 30px rgba(0,0,0,.05)",

                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px"
                }}
            >

                {/* GALERIA */}
                <div>

                    <img
                        src={getImageUrl(img.urlImagen)}
                        alt={producto.nombre}
                        style={{
                            width: "100%",
                            height: "500px",
                            objectFit: "cover",
                            borderRadius: "20px"
                        }}
                    />

                    
                </div>

                {/* INFO */}
                <div>

                    <span
                        style={{
                            background: "#eef5ff",
                            color: "#0d47a1",
                            padding: "8px 15px",
                            borderRadius: "999px",
                            fontWeight: "600"
                        }}
                    >
                        Producto disponible
                    </span>

                    <h1
                        style={{
                            fontSize: "2rem",
                            marginTop: "20px",
                            marginBottom: "15px",
                            color: "#0f172a"
                        }}
                    >
                        {producto.nombre}
                    </h1>

                    <p
                        style={{
                            color: "#64748b",
                            lineHeight: 1.8,
                            fontSize: "16px"
                        }}
                    >
                        {producto.descripcion}
                    </p>

                    <div
                        style={{
                            marginTop: "25px",
                            marginBottom: "25px"
                        }}
                    >
                        <span
                            style={{
                                fontSize: "3rem",
                                fontWeight: "800",
                                color: "#0d47a1"
                            }}
                        >
                            Bs {producto.precio}
                        </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            flexWrap: "wrap"
                        }}
                    >
                        <button
                            style={{
                                flex: 1,
                                minWidth: "200px",
                                height: "60px",
                                border: "none",
                                borderRadius: "15px",
                                background:
                                    "linear-gradient(135deg,#0d47a1,#1976d2)",
                                color: "white",
                                fontWeight: "700",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}
                            onClick={addToCart}
                        >
                            🛒 Agregar al carrito
                        </button>

                        <button
                            style={{
                                flex: 1,
                                minWidth: "200px",
                                height: "60px",
                                border:
                                    "2px solid #0d47a1",
                                borderRadius: "15px",
                                background: "white",
                                color: "#0d47a1",
                                fontWeight: "700",
                                cursor: "pointer"
                            }}
                        >
                            ❤️ Favoritos
                        </button>
                    </div>

                </div>

            </div>

            {/* RESEÑAS */}
            <div
                style={{
                    marginTop: "30px",
                    display: "grid",
                    gridTemplateColumns: "380px 1fr",
                    gap: "25px"
                }}
            >

                {/* FORMULARIO */}
                <div
                    style={{
                        background: "white",
                        borderRadius: "24px",
                        padding: "25px",
                        boxShadow:
                            "0 10px 25px rgba(0,0,0,.05)"
                    }}
                >
                    <h2>
                        ⭐ Escribir reseña
                    </h2>

                    <select
                        value={estrellas}
                        onChange={(e) =>
                            setEstrellas(
                                Number(e.target.value)
                            )
                        }
                        style={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "12px",
                            border:
                                "2px solid #e2e8f0",
                            padding: "10px"
                        }}
                    >
                        <option value={5}>
                            ⭐⭐⭐⭐⭐
                        </option>

                        <option value={4}>
                            ⭐⭐⭐⭐
                        </option>

                        <option value={3}>
                            ⭐⭐⭐
                        </option>

                        <option value={2}>
                            ⭐⭐
                        </option>

                        <option value={1}>
                            ⭐
                        </option>
                    </select>

                    <textarea
                        placeholder="Comparte tu experiencia..."
                        value={comentario}
                        onChange={(e) =>
                            setComentario(
                                e.target.value
                            )
                        }
                        style={{
                            width: "90%",
                            height: "140px",
                            marginTop: "15px",
                            borderRadius: "12px",
                            border:
                                "2px solid #e2e8f0",
                            padding: "15px"
                        }}
                    />

                    <button
                        onClick={enviarResena}
                        style={{
                            width: "100%",
                            height: "55px",
                            marginTop: "15px",
                            border: "none",
                            borderRadius: "12px",
                            background:
                                "linear-gradient(135deg,#0d47a1,#1976d2)",
                            color: "white",
                            fontWeight: "700",
                            cursor: "pointer"
                        }}
                    >
                        Publicar reseña
                    </button>
                </div>

                {/* LISTA */}
                <div
                    style={{
                        background: "white",
                        borderRadius: "24px",
                        padding: "25px",
                        boxShadow:
                            "0 10px 25px rgba(0,0,0,.05)"
                    }}
                >
                    <h2>
                        ⭐ Opiniones de clientes
                    </h2>

                    {resenas.length === 0 && (
                        <p
                            style={{
                                color: "#64748b"
                            }}
                        >
                            Este producto aún no tiene
                            reseñas.
                        </p>
                    )}

                    {resenas.map((r) => (
                        <div
                            key={r.id}
                            style={{
                                padding: "18px 0",
                                borderBottom:
                                    "1px solid #e2e8f0"
                            }}
                        >
                            <h4
                                style={{
                                    marginBottom: "5px"
                                }}
                            >
                                {r.usuario?.nombre ||
                                    "Usuario"}
                            </h4>

                            <div
                                style={{
                                    fontSize: "18px"
                                }}
                            >
                                {"⭐".repeat(
                                    r.estrellas
                                )}
                            </div>

                            <p
                                style={{
                                    color: "#475569",
                                    marginTop: "10px"
                                }}
                            >
                                {r.comentario}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    </div>
);
}