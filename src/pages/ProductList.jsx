import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const { products, totalCount } = useCart();

  return (
    <div className="container">
      <header>
        <h1>Product List</h1>
        <div className="icon-cart">
          <Link to="/checkout">
            <i className="fa-solid fa-basket-shopping"></i>
            <span>{totalCount}</span>
          </Link>
        </div>
        <Link to="/add-product" className="add-link">
          + Yeni Məhsul
        </Link>
      </header>

      <div id="products_div" className="products">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
