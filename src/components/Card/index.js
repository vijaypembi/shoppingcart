import { useState } from "react";
import "./index.css";

const Card = ({ item, onUpdateItem, onRemoveItem }) => {
    const [quantity, setQuantity] = useState(item.quantity || 1);

    const onDecreaseButton = () => {
        if (quantity === 1) {
            const id = item.id;
            onRemoveItem(id);
        } else {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            const id = item.id;
            onUpdateItem(id, newQuantity);
        }
    };
    const onIncreaseButton = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        const id = item.id;
        onUpdateItem(id, newQuantity);
    };
    return (
        <div className="cart-card">
            <div className="cart-card-left">
                <p className="cart-card-name">{item.name}</p>
                <p className="cart-card-price">{`₹${item.price} x ${
                    item.quantity
                } = ${item.price * item.quantity}`}</p>
            </div>

            {item.price === 0 ? (
                <div className="free-gift">FREE GIFT</div>
            ) : (
                <div className="cart-card-buttoncontainer">
                    <button
                        onClick={() => onDecreaseButton()}
                        className="onDecreaseButton"
                    >
                        -
                    </button>
                    <span className="card-quantity">{quantity}</span>
                    <button
                        onClick={() => onIncreaseButton()}
                        className="onIncreaseButton"
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
};

export default Card;
