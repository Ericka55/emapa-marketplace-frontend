import { useEffect, useState } from "react";

export default function DashboardVendedor() {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // luego lo conectamos al backend
        setPedidos([
            { id: 1, cliente: "Juan", total: 120 },
            { id: 2, cliente: "Maria", total: 80 }
        ]);
    }, []);

    return (
        <div style={{ display: "flex" }}>

            {/* SIDEBAR */}
            <div style={{
                width: "250px",
                height: "100vh",
                background: "var(--emapa-primary)",
                color: "white",
                padding: "20px"
            }}>
                <h2>EMAPA Vendedor</h2>

                <p>📦 Productos</p>
                <p>🛒 Pedidos</p>
                <p>💰 Pagos</p>
                <p>📊 Reportes</p>
            </div>

            {/* CONTENIDO */}
            <div style={{
                flex: 1,
                padding: "20px"
            }}>

                <h1 style={{ color: "var(--emapa-dark)" }}>
                    Dashboard Vendedor
                </h1>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "15px"
                }}>

                    <div className="card">
                        <h3>Pedidos</h3>
                        <p>{pedidos.length}</p>
                    </div>

                    <div className="card">
                        <h3>Ingresos</h3>
                        <p>Bs 0</p>
                    </div>

                    <div className="card">
                        <h3>Productos</h3>
                        <p>0</p>
                    </div>

                </div>

                <h2 style={{ marginTop: "20px" }}>Pedidos recientes</h2>

                {pedidos.map(p => (
                    <div key={p.id} className="card">
                        <p>Cliente: {p.cliente}</p>
                        <p>Total: Bs {p.total}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}