import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PedidosVendedor() {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const res = await api.get("/vendedor/pedidos");
        setPedidos(res.data.data);
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1 style={{ color: "#0d47a1" }}>
                📦 Pedidos Recibidos
            </h1>

            {pedidos.map(p => (
                <div key={p.id} className="card">

                    <h3>Pedido #{p.id}</h3>

                    <p><b>Cliente:</b> {p.comprador.nombre}</p>
                    <p><b>Total:</b> Bs {p.total}</p>
                    <p><b>Estado:</b> {p.estadoPedido.nombre}</p>

                    <h4>Productos:</h4>

                    {p.detalles.map(d => (
                        <p key={d.id}>
                            {d.producto.nombre} x {d.cantidad}
                        </p>
                    ))}

                </div>
            ))}

        </div>
    );
}