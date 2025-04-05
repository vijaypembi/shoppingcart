import "./index.css";

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="product-list-container">
            <h1 className="products-heading">Products</h1>
            <ul className="product-container">
                {products.map((item) => (
                    <li key={item.id} className="product-card">
                        <div>
                            <p className="product-name">{item.name}</p>
                            <p className="product-price">{`₹${item.price}`}</p>
                            <button
                                onClick={() =>
                                    addToCart({ ...item, quantity: 1 })
                                }
                                className="add-tocart-button"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
