import { useEffect, useState } from "react";
import api from "../services/api";
import { getImageUrl } from "../utils/image";
export default function VendedorDashboard() {
    // --- ESTADOS ---
    const [stats, setStats] = useState({});
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [editando, setEditando] = useState(null);
    const [ventas, setVentas] = useState([]);
    const [totalVentas, setTotalVentas] = useState(0);
    const [nuevo, setNuevo] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categoriaId: "",
        imagen: ""
    });

    const token = localStorage.getItem("token");

    // --- EFECTOS ---
    useEffect(() => {
        const checkPerfil = async () => {
            const token = localStorage.getItem("token");
            const res = await api.get("/vendedor/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.data.data.perfilCompleto) {
                navigate("/completar-perfil-vendedor");
            }
        };

        checkPerfil();
    }, []);

    useEffect(() => {
        cargarDashboard();
        cargarProductos();
        cargarVentas();
        cargarCategorias(); // Añadido para asegurar que las categorías se carguen al iniciar
    }, []);

    // --- LÓGICA / PETICIONES ---
    const cargarDashboard = async () => {
        try {
            const res = await api.get("/vendedor/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStats(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarCategorias = async () => {
        try {
            const res = await api.get("/categorias");
            setCategorias(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarProductos = async () => {
    try {
        const res = await api.get("/vendedor/productos", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

console.log(
    JSON.stringify(
        res.data.data,
        null,
        2
    )
);
        setProductos(res.data.data);
    } catch (error) {
        console.error(error);
    }
};

    const cargarVentas = async () => {
        try {
            const res = await api.get("/vendedor/ventas", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setVentas(res.data.data.ventas);
            setTotalVentas(res.data.data.totalVentas);
        } catch (error) {
            console.error(error);
        }
    };

    const crearProducto = async () => {
    try {
        const formData = new FormData();

        formData.append("nombre", nuevo.nombre);
        formData.append("descripcion", nuevo.descripcion);
        formData.append("precio", nuevo.precio);
        formData.append("stock", nuevo.stock);
        formData.append("categoriaId", nuevo.categoriaId);

        if (nuevo.imagen) {
            formData.append("imagen", nuevo.imagen);
        }

        const res = await api.post(
            "/vendedor/productos",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("✅ Producto publicado correctamente");

        setNuevo({
            nombre: "",
            descripcion: "",
            precio: "",
            stock: "",
            categoriaId: "",
            imagen: ""
        });

        cargarProductos();
        cargarDashboard();

    } catch (error) {
        console.error(error);

        alert(
            error.response?.data?.message ||
            "Error al crear producto"
        );
    }
};
    const editarProducto = (producto) => {
        setEditando({
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            categoriaId: producto.categoriaId
        });
    };

    const guardarCambios = async () => {
        try {
            await api.put(`/vendedor/productos/${editando.id}`, editando, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Producto actualizado");
            setEditando(null);
            cargarProductos();
        } catch (error) {
            console.error(error);
        }
    };

    const actualizarStock = async (id, stock) => {
        try {
            await api.put(`/vendedor/stock/${id}`, { stock }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            cargarProductos();
        } catch (error) {
            console.error(error);
        }
    };

    // --- OBJETO DE ESTILOS INLINE ---
    const styles = {
        container: { padding: "40px", backgroundColor: "#f8f9fc", fontFamily: "'Segoe UI', Roboto, sans-serif", color: "#333333", minHeight: "100vh" },
        header: { fontSize: "28px", fontWeight: "600", marginBottom: "30px", color: "#1a1a1a", display: "flex", alignItems: "center", gap: "10px" },
        subHeader: { fontSize: "20px", fontWeight: "600", marginTop: "40px", marginBottom: "20px", color: "#2c3e50", borderBottom: "2px solid #edf2f7", paddingBottom: "8px" },
        gridStats: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "35px" },
        cardStat: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #eef2f5", display: "flex", flexDirection: "column", gap: "5px" },
        statTitle: { color: "#8a99ad", fontSize: "13px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.5px" },
        statNum: { fontSize: "24px", fontWeight: "700", color: "#2c3e50" },
        
        mainLayout: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "start" },
        fullWidth: { gridColumn: "1 / -1" },
        
        card: { backgroundColor: "#ffffff", borderRadius: "16px", padding: "25px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)", border: "1px solid #eef2f5", marginBottom: "25px" },
        inputGroup: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" },
        input: { width: "100%", padding: "11px 15px", borderRadius: "8px", border: "1px solid #dcdfe6", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" },
        textarea: { width: "100%", padding: "11px 15px", borderRadius: "8px", border: "1px solid #dcdfe6", fontSize: "14px", outline: "none", boxSizing: "border-box", resize: "vertical", minHeight: "80px", gridColumn: "1 / -1" },
        select: { width: "100%", padding: "11px 15px", borderRadius: "8px", border: "1px solid #dcdfe6", fontSize: "14px", backgroundColor: "#fff", outline: "none", boxSizing: "border-box" },
        
        btnPrimary: { backgroundColor: "#3182ce", color: "#ffffff", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "14px", transition: "background 0.2s" },
        btnSecondary: { backgroundColor: "#edf2f7", color: "#4a5568", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "14px" },
        btnDanger: { backgroundColor: "#fff5f5", color: "#e53e3e", border: "1px solid #fed7d7", padding: "6px 12px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" },
        
        gridItems: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
        productCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
},
        productInfo: { padding: "15px", flexGrow: 1, display: "flex", flexDirection: "column", gap: "8px" },
        imgContainer: {
    width: "100%",
    aspectRatio: "1 / 1",
    backgroundColor: "#f7fafc",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
},

productImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease"
},
        
        badgeLowStock: { background: "#fff5f5", color: "#c53030", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", display: "inline-block", marginTop: "5px" },
        badgeStatus: { background: "#ebf8ff", color: "#2b6cb0", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
        
        btnActionGroup: { display: "flex", gap: "8px", marginTop: "auto", paddingTop: "10px", borderTop: "1px solid #edf2f7" },
        btnCircle: { width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #cbd5e0", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "bold" },
        
        listVentas: { display: "flex", flexDirection: "column", gap: "12px" },
        itemVenta: { backgroundColor: "#ffffff", borderLeft: "4px solid #38a169", padding: "15px 20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.01)", display: "flex", justifyContent: "space-between", alignItems: "center" }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}><span>🏪</span> Panel del Vendedor</h1>

            {/* 📊 TARJETAS DE INDICADORES (STATS) */}
            <div style={styles.gridStats}>
                <div style={styles.cardStat}>
                    <span style={styles.statTitle}>Mis Productos</span>
                    <span style={styles.statNum}>📦 {stats.productos || 0}</span>
                </div>
                <div style={styles.cardStat}>
                    <span style={styles.statTitle}>Pedidos Recibidos</span>
                    <span style={styles.statNum}>🛒 {stats.pedidos || 0}</span>
                </div>
                <div style={styles.cardStat}>
                    <span style={styles.statTitle}>Ventas del Mes</span>
                    <span style={{ ...styles.statNum, color: "#38a169" }}>Bs {stats.ventas || 0}</span>
                </div>
                <div style={styles.cardStat}>
                    <span style={styles.statTitle}>Incidencias</span>
                    <span style={{ ...styles.statNum, color: stats.incidencias > 0 ? "#e53e3e" : "#2c3e50" }}>🚨 {stats.incidencias || 0}</span>
                </div>
            </div>

            {/* MODAL / SECCIÓN FLOTANTE PARA EDICIÓN */}
            {editando && (
                <div style={{ ...styles.card, border: "2px solid #3182ce", animation: "fadeIn 0.3s" }}>
                    <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#2b6cb0", fontSize: "18px" }}>✏️ Editar Producto</h2>
                    <div style={styles.inputGroup}>
                        <input
                            style={styles.input}
                            value={editando.nombre}
                            placeholder="Nombre del producto"
                            onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
                        />
                        <select
                            style={styles.select}
                            value={editando.categoriaId}
                            onChange={(e) => setEditando({ ...editando, categoriaId: e.target.value })}
                        >
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                        </select>
                        <input
                            style={styles.input}
                            type="number"
                            value={editando.precio}
                            placeholder="Precio (Bs)"
                            onChange={(e) => setEditando({ ...editando, precio: e.target.value })}
                        />
                        <input
                            style={styles.input}
                            type="number"
                            value={editando.stock}
                            placeholder="Stock actual"
                            onChange={(e) => setEditando({ ...editando, stock: e.target.value })}
                        />
                        <textarea
                            style={styles.textarea}
                            value={editando.descripcion}
                            placeholder="Descripción detallada del producto..."
                            onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={guardarCambios} style={styles.btnPrimary}>Guardar cambios</button>
                        <button onClick={() => setEditando(null)} style={styles.btnSecondary}>Cancelar</button>
                    </div>
                </div>
            )}

            {/* SECCIÓN PRINCIPAL EN DOS COLUMNAS */}
            <div style={styles.mainLayout}>
                
                {/* COLUMNA IZQUIERDA: CREAR PRODUCTO */}
                <div>
                    <h2 style={{ ...styles.subHeader, marginTop: 0 }}>➕ Crear Nuevo Producto</h2>
                    <div style={styles.card}>
                        <div style={styles.inputGroup}>
                            <input
                                style={styles.input}
                                placeholder="Nombre del producto"
                                value={nuevo.nombre}
                                onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                            />
                            <select
                                style={styles.select}
                                value={nuevo.categoriaId}
                                onChange={(e) => setNuevo({ ...nuevo, categoriaId: e.target.value })}
                            >
                                <option value="">Categoría</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                ))}
                            </select>
                            <input
                                style={styles.input}
                                type="number"
                                placeholder="Precio (Bs)"
                                value={nuevo.precio}
                                onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
                            />
                            <input
                                style={styles.input}
                                type="number"
                                placeholder="Stock inicial"
                                value={nuevo.stock}
                                onChange={(e) => setNuevo({ ...nuevo, stock: e.target.value })}
                            />
                            <input
    type="file"
    accept="image/*"
    onChange={(e) =>
        setNuevo({
            ...nuevo,
            imagen: e.target.files[0]
        })
    }
/>
                            <textarea
                                style={styles.textarea}
                                placeholder="Descripción del producto..."
                                value={nuevo.descripcion}
                                onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
                            />
                        </div>
                        <button onClick={crearProducto} style={{ ...styles.btnPrimary, width: "100%" }}>
                            🚀 Publicar Producto
                        </button>
                    </div>
                </div>

                {/* COLUMNA DERECHA: HISTORIAL DE VENTAS */}
                <div>
                    <h2 style={{ ...styles.subHeader, marginTop: 0 }}>
                        💰 Historial de Ventas 
                        <span style={{ float: "right", color: "#38a169", fontSize: "16px", fontWeight: "normal" }}>
                            Total: <b>Bs {totalVentas}</b>
                        </span>
                    </h2>
                    
                    <div style={styles.listVentas}>
                        {ventas.length === 0 && <p style={{ color: "#718096", textAlign: "center", padding: "20px" }}>No registras ventas aún.</p>}
                        {ventas.map(v => (
                            <div key={v.id} style={styles.itemVenta}>
                                <div>
                                    <h4 style={{ margin: "0 0 5px 0", color: "#2d3748", fontSize: "15px" }}>{v.producto.nombre}</h4>
                                    <span style={{ fontSize: "13px", color: "#718096" }}>
                                        Cliente: {v.pedido.comprador.nombre} | Cantidad: <b>{v.cantidad}</b>
                                    </span>
                                </div>
                                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                                    <span style={{ fontWeight: "700", color: "#2d3748" }}>Bs {v.precioUnitario * v.cantidad}</span>
                                    <span style={styles.badgeStatus}>{v.pedido.estadoPedido.nombre}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* INVENTARIO COMPLETO (ANCHO COMPLETO) */}
                <div style={styles.fullWidth}>
                    <h2 style={styles.subHeader}>📦 Inventario de Productos</h2>
                    <div style={styles.gridItems}>
                        {productos.map((producto) => (
                            <div key={producto.id} style={styles.productCard}>
                                <div style={styles.imgContainer}>
                                    {producto.imagenes?.[0]?.urlImagen || producto.imagen ? (
<img
    src={
        getImageUrl(
            producto.imagenes?.[0]?.urlImagen ||
            producto.imagen ||
            ""
        )
    }
    alt={producto.nombre}
    style={styles.productImg}
/>                                   ) : (
                                        <span style={{ color: "#a0aec0", fontSize: "30px" }}>📦</span>
                                    )}
                                </div>
                                
                                <div style={styles.productInfo}>
                                    <h3 style={{ margin: 0, fontSize: "16px", color: "#2d3748" }}>{producto.nombre}</h3>
                                    <p style={{ margin: 0, fontSize: "13px", color: "#718096", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                                        {producto.descripcion}
                                    </p>
                                    
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                        <span style={{ fontWeight: "700", color: "#2b6cb0", fontSize: "15px" }}>Bs {producto.precio}</span>
                                        <span style={{ fontSize: "14px", color: "#4a5568" }}>Stock: <b>{producto.stock}</b></span>
                                    </div>

                                    {producto.stock <= 5 && (
                                        <div style={styles.badgeLowStock}>⚠ Stock bajo</div>
                                    )}
                                    
                                    <div style={styles.btnActionGroup}>
                                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                            <button 
                                                onClick={() => actualizarStock(producto.id, producto.stock + 1)} 
                                                style={styles.btnCircle}
                                                title="Aumentar Stock"
                                            >
                                                +
                                            </button>
                                            <button 
                                                onClick={() => actualizarStock(producto.id, producto.stock - 1)} 
                                                style={styles.btnCircle}
                                                title="Disminuir Stock"
                                            >
                                                -
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => editarProducto(producto)}
                                            style={{ ...styles.btnSecondary, padding: "6px 12px", fontSize: "12px", marginLeft: "auto" }}
                                        >
                                            ✏️ Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}