import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

    const { addToCart } = useCart();

    return (
        <div className="card">

            <img src={product.imagenes?.[0]?.urlImagen} />

            <h3>{product.nombre}</h3>

            <p>Bs {product.precio}</p>

            <button onClick={() => addToCart(product)}>
                🛒 Agregar al carrito
            </button>

        </div>
    );
}