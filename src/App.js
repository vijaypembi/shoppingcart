import { useEffect, useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);

    const { products } = data;
    // console.log(data);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("/data.json");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    const addToCart = (item) => {
        setCart((prevCart) => {
            const isItemInCart = prevCart.some(
                (cartItem) => cartItem.id === item.id
            );

            if (isItemInCart) {
                return prevCart;
            } else {
                return [...prevCart, item];
            }
        });
    };

    const updateCart = (updateCartItems) => {
        setCart(updateCartItems);
    };
    return (
        <div className="App">
            <h1 className="app-shopping-cart-name">Shopping Cart</h1>
            <ProductList products={products || []} addToCart={addToCart} />

            {cart.length >= 1 ? (
                <Cart data={data} cart={cart} updateCart={updateCart} />
            ) : (
                <div className="empty-cart-container">
                    <p className="empty-cart-name">Your cart is empty</p>
                    <p className="empty-cart-message">
                        Add some products to see them here!
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
