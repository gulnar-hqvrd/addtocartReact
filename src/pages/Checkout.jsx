import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Checkout() {
  let { cart, totalPrice, changeCount, removeFromCart } = useCart();

  return (
    <div className="container">
      <header>
        <h1>Checkout Products</h1>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <Link to="/">← Back to Products</Link>
      </header>

      <div id="listcards">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div key={product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <p>{product.details}</p>

              <div className="quantity-controls">
                <button className="decrease" onClick={() => changeCount(product.id, "decrease")}>
                  -
                </button>
                <span className="quantity">{product.count}</span>
                <button className="increase" onClick={() => changeCount(product.id, "increase")}>
                  +
                </button>
              </div>
              <button className="remove-item" onClick={() => removeFromCart(product.id)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
}

export default Checkout;
