import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    // ➕ agregar producto
    const addToCart = (product) => {

        const exists = cart.find(p => p.id === product.id);

        if (exists) {
            setCart(cart.map(p =>
                p.id === product.id
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // ❌ eliminar producto
    const removeFromCart = (id) => {
        setCart(cart.filter(p => p.id !== id));
    };

    // 🧹 limpiar carrito
    const clearCart = () => {
        setCart([]);
    };

    // 💰 total
    const total = cart.reduce(
        (acc, item) => acc + item.precio * item.quantity,
        0
    );

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            total
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);