import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CompletarPerfilVendedor from "./pages/CompletarPerfilVendedor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import Checkout from "./pages/Checkout";
import Pedidos from "./pages/Pedidos";
import VendedorDashboard from "./pages/VendedorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetail from "./pages/ProductDetail";
import IncidenciaUsuario from "./pages/IncidenciaUsuario";
import UserDashboard from "./pages/UserDashboard";
function App() {
    return (
        <>
            <Header />

            <Routes>
    {/* PÚBLICO */}
    <Route path="/" element={<Home />} />
    <Route path="/marketplace" element={<Marketplace />} />
    <Route path="/producto/:id" element={<ProductDetail />} />
    <Route path="/incidencia/:pedidoId" element={<IncidenciaUsuario />} />
    

    {/* AUTH */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* PRIVADO */}
    <Route path="/carrito" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/pedidos" element={<Pedidos />} />

<Route
    path="/completar-perfil-vendedor"
    element={<CompletarPerfilVendedor />}
/>

    {/* ROLES */}
    <Route path="/vendedor" element={<VendedorDashboard />} />
    <Route path="/mi-cuenta" element={<UserDashboard />} />

    <Route path="/admin" element={<AdminDashboard />} />
</Routes>
        </>
    );
}

export default App;