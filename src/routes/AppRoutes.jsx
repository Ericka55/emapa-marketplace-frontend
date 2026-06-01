import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Marketplace from "../pages/Marketplace";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import DashboardVendedor from "../pages/vendedor/DashboardVendedor";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import PedidosVendedor from "../pages/vendedor/PedidosVendedor";

export default function AppRoutes() {
    return (
        <Routes>

<Route path="/marketplace" element={<Marketplace />} />

<Route path="/vendedor" element={<DashboardVendedor />} />

<Route path="/admin" element={<DashboardAdmin />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />

<Route path="/vendedor/pedidos" element={<PedidosVendedor />} />

<Route path="/checkout" element={<Checkout />} />

        </Routes>
    );
}