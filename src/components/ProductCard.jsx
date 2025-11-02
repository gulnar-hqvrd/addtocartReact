import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  let { addToCart } = useCart();

  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.details}</p>
      <button className="addCart" onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
