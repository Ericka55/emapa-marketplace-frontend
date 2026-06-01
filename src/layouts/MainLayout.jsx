import "../styles/layout.css";

export default function MainLayout({ children }) {
    return (
        <div className="app">

            <aside className="sidebar">
                <h2>EMAPA</h2>

                <nav>
                    <a href="#">🏠 Inicio</a>
                    <a href="#">🛒 Productos</a>
                    <a href="#">📦 Pedidos</a>
                    <a href="#">💬 Mensajes</a>
                    <a href="#">⭐ Favoritos</a>
                </nav>
            </aside>

            <main className="content">
                <header className="topbar">
                    <input placeholder="Buscar productos..." />
                    <button>🔔</button>
                    <button>👤</button>
                </header>

                <div className="page">
                    {children}
                </div>
            </main>

        </div>
    );
}