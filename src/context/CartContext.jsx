import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
const BASE_URL = "http://localhost:3000";

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });


  useEffect(() => {
    axios.get(`${BASE_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const addNewProduct = async (newProduct) => {
    try {
      const res = await axios.post(`${BASE_URL}/products`, newProduct);
      setProducts((prev) => [...prev, res.data]);
      alert("Əlavə olundu");
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = (product) => {
    setCart((a) => {
      const result = a.find((item) => item.id === product.id);
      if (result) {
        return a.map((item) => {
          if (item.id === product.id) {
            if (item.count < 10) {
              return { ...item, count: item.count + 1 };
            } else {
              alert("Maksimum 10 ədəd ala bilərsiniz!");
            }
          }
          return item;
        });
      } else {
        return [...a, { ...product, count: 1 }];
      }
    });
  };


  const removeFromCart = (id) => {
    setCart((a) => a.filter((item) => item.id !== id));
  };

  const changeCount = (id, action) => {
    setCart((a) =>
      a.map((item) => {
        if (item.id === id) {
          if (action === "increase" && item.count < 10)
            return { ...item, count: item.count + 1 };
          if (action === "decrease" && item.count > 1)
            return { ...item, count: item.count - 1 };
        }
        return item;
      })
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );
  const totalCount = cart.reduce((total, item) => total + item.count, 0);

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        changeCount,
        totalPrice,
        totalCount,
        addNewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
