import { createContext, useContext, useState, useEffect } from "react";
import productsData from "../data/products.json";

let CartContext = createContext();

export let CartProvider = ({ children }) => {
  let [products, setProducts] = useState(productsData);
  let [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  let addToCart = (product) => {
    setCart((a) => {
      let result = a.find((item) => item.id === product.id);
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
      }
      else {
        return [...a, { ...product, count: 1 }];
      }
    });
  };

  let removeFromCart = (id) => {
    setCart((a) => a.filter((item) => item.id !== id));
  };

  let changeCount = (id, action) => {
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

  let totalPrice = cart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );
  let totalCount = cart.reduce((total, item) => total + item.count, 0);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export let useCart = () => useContext(CartContext);
