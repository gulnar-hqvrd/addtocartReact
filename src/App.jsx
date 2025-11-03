import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
