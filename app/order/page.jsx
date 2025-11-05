"use client";
import { useEffect, useState } from "react";

const API_URL = "/api/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ product: "", quantity: "", client: "", status: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setOrders(json);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.product || !form.quantity || !form.client || !form.status) return;

    try {
      if (editing) {
        const res = await fetch(`${API_URL}/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setOrders(prev => prev.map(o => (o._id === editing._id ? updated : o)));
        setEditing(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setOrders(prev => [...prev, created]);
      }

      setForm({ product: "", quantity: "", client: "", status: "" });
    } catch (err) {
      console.error("Failed to submit order:", err);
    }
  }

  function handleEdit(order) {
    setEditing(order);
    setForm({
      product: order.product,
      quantity: order.quantity,
      client: order.client,
      status: order.status,
    });
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setOrders(prev => prev.filter(o => o._id !== id));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Orders</h1>

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
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          name="client"
          value={form.client}
          onChange={handleChange}
          placeholder="Client"
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          name="status"
          value={form.status}
          onChange={handleChange}
          placeholder="Status"
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
                setForm({ product: "", quantity: "", client: "", status: "" });
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
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Client</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map(o => (
                <tr key={o._id} className="border-b">
                  <td className="p-2">{o.product}</td>
                  <td className="p-2">{o.quantity}</td>
                  <td className="p-2">{o.client}</td>
                  <td className="p-2">{o.status}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(o)} className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(o._id)} className="text-red-600 hover:underline">
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
