import { useEffect } from "react";
import Card from "../Card";
import "./index.css";

const Cart = ({ data, cart, updateCart }) => {
    const { free_gifts, threshold } = data;
    const subTotal = cart.reduce(
        (acc, each) => acc + each.price * each.quantity,
        0
    );

    useEffect(() => {
        const isGiftInclude = cart.some((each) => each.id === free_gifts.id);
        if (subTotal >= threshold && !isGiftInclude) {
            updateCart([...cart, { ...free_gifts, quantity: 1 }]);
        } else if (subTotal < threshold && isGiftInclude) {
            updateCart(cart.filter((each) => each.id !== free_gifts.id));
        }
    });
    const onUpdateItem = (id, newQuantity) => {
        const newList = cart.map((each) =>
            each.id === id ? { ...each, quantity: newQuantity } : each
        );
        updateCart(newList);
    };
    const onRemoveItem = (removeId) => {
        const newList = cart.filter((each) => each.id !== removeId);
        updateCart(newList);
    };
    return (
        <div className="cart-main-container">
            <div className="cart-top">
                <h1 className="cart-headings">Cart Summary</h1>
                <div className="cart-summary-container">
                    <div className="cart-subtotal-container">
                        <h1 className="subtotal-name">Subtotal:</h1>
                        <h1 className="subtotal-price">{`₹${subTotal}`}</h1>
                    </div>
                    <hr className="subtotal-line" />
                    {subTotal < threshold ? (
                        <div className="progress-bar-container">
                            <p className="gift-informaton">{`Add ₹${
                                threshold - subTotal
                            } more to geta FREE ${free_gifts.name}`}</p>

                            <div
                                style={{
                                    height: "10px",
                                    width: "100%",
                                    backgroundColor: "#444a54",
                                    borderRadius: "7px",
                                    marginBottom: "5px",
                                    transition: "width 0.5s ease-in-out",
                                }}
                            >
                                <div
                                    style={{
                                        height: "10px",
                                        width: `${Math.min(
                                            (subTotal / threshold) * 100,
                                            100
                                        )}%`,
                                        backgroundColor: "#2b7efe",
                                        borderRadius: "7px",
                                        marginBottom: "5px",
                                        transition: "width 0.5s ease-in-out",
                                    }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <p className="gift-informaton">{`You got free ${free_gifts.name}!`}</p>
                    )}
                </div>
            </div>

            <div className="cart-bottom">
                <h1 className="cart-headings">Cart Items</h1>
                <ul className="cart-items-container">
                    {cart.map((item) => (
                        <li key={item.id}>
                            <Card
                                item={item}
                                onUpdateItem={onUpdateItem}
                                onRemoveItem={onRemoveItem}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Cart;
