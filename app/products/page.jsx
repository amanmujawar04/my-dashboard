"use client";
import { useEffect, useState } from "react";

const API_URL = "/api/products";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch(API_URL);
const data = await res.json();

if (Array.isArray(data)) {
  setProducts(data);
} else {
  setProducts([]);
}

    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;

    try {
      if (editing) {
        const res = await fetch(`${API_URL}/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setProducts(prev =>
          Array.isArray(prev) ? prev.map(p => (p._id === updated._id ? updated : p)) : []
        );
        setEditing(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const newProduct = await res.json();
        setProducts(prev => (Array.isArray(prev) ? [...prev, newProduct] : [newProduct]));
      }
      setForm({ name: "", price: "", stock: "" });
    } catch (err) {
      console.error("Failed to submit product:", err);
    }
  }

  function handleEdit(product) {
    setEditing(product);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProducts(prev => (Array.isArray(prev) ? prev.filter(p => p._id !== id) : []));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-bold sm:mb-6">Products</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-end"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border rounded p-2 flex-1 min-w-[120px]"
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border rounded p-2 flex-1 min-w-[120px]"
          required
        />
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border rounded p-2 flex-1 min-w-[90px]"
          required
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({ name: "", price: "", stock: "" });
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] bg-white rounded shadow text-sm">
          <thead>
            <tr className="text-gray-700 bg-slate-100">
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Price</th>
              <th className="px-3 py-2 text-left">Stock</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map(p => (
                <tr key={p._id} className="border-b last:border-none even:bg-slate-50">
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">{p.price}</td>
                  <td className="px-3 py-2">{p.stock}</td>
                  <td className="flex gap-2 px-3 py-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
