import { useState } from "react";
import { useCart } from "../context/CartContext";
import styles from "./AddProduct.module.css";

function AddProduct() {
  const { addNewProduct } = useCart();
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    details: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      alert("Zəhmət olmasa bütün xanaları doldurun!");
      return;
    }
    addNewProduct(form);
    setForm({ name: "", price: "", image: "", details: "" });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yeni Məhsul Əlavə Et</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          name="name" 
          placeholder="Ad" 
          value={form.name} 
          onChange={handleChange}
          className={styles.input}
        />
        <input 
          name="price" 
          placeholder="Qiymət" 
          value={form.price} 
          onChange={handleChange}
          className={styles.input}
        />
        <input 
          name="image" 
          placeholder="Şəkil URL" 
          value={form.image} 
          onChange={handleChange}
          className={styles.input}
        />
        <textarea 
          name="details" 
          placeholder="Ətraflı məlumat" 
          value={form.details} 
          onChange={handleChange}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>Əlavə Et</button>
      </form>
    </div>
  );
}

export default AddProduct