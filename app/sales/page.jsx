"use client";
import { useEffect, useState } from "react";

const API_URL = "/api/sales";

export default function SalesPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ product: "", amount: "", date: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch sales data:", err);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.product || !form.amount || !form.date) return;

    try {
      if (editing) {
        const res = await fetch(`${API_URL}/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setData(prev => prev.map(i => (i._id === editing._id ? updated : i)));
        setEditing(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setData(prev => [...prev, created]);
      }
      setForm({ product: "", amount: "", date: "" });
    } catch (err) {
      console.error("Failed to submit form:", err);
    }
  }

  function handleEdit(item) {
    setEditing(item);
    setForm({ product: item.product, amount: item.amount, date: item.date });
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setData(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Sales</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-end">
        <input
          name="product"
          value={form.product}
          onChange={handleChange}
          placeholder="Product"
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Date"
          type="date"
          className="flex-1 p-2 border rounded"
          required
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({ product: "", amount: "", date: "" });
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded shadow">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center">
                  No sales found.
                </td>
              </tr>
            ) : (
              data.map(i => (
                <tr key={i._id} className="border-b">
                  <td className="p-2">{i.product}</td>
                  <td className="p-2">{i.amount}</td>
                  <td className="p-2">{new Date(i.date).toLocaleDateString()}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(i)} className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(i._id)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
