"use client";
import { useEffect, useState } from "react";

const API_URL = "/api/clients";

export default function ClientPage() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => { fetchClients(); }, []);

  async function fetchClients() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setClients(data);
    } catch {
      setClients([]);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    try {
      if (editing) {
        const res = await fetch(`${API_URL}/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setClients(prev => prev.map(c => (c._id === updated._id ? updated : c)));
        setEditing(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const newClient = await res.json();
        setClients(prev => [...prev, newClient]);
      }
      setForm({ name: "", email: "", phone: "" });
    } catch {}
  }

  function handleEdit(client) {
    setEditing(client);
    setForm({ name: client.name, email: client.email, phone: client.phone });
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setClients(prev => prev.filter(c => c._id !== id));
    if(editing && editing._id === id) {
      setEditing(null);
      setForm({ name: "", email: "", phone: "" });
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-bold sm:mb-6">Clients</h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-wrap items-start gap-2 mb-6 sm:flex-row sm:items-end">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border rounded p-2 flex-1 min-w-[120px]" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded p-2 flex-1 min-w-[180px]" required />
        <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone" className="border rounded p-2 flex-1 min-w-[120px]" required />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button type="submit" className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700">{editing ? "Update" : "Add"}</button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm({ name: "", email: "", phone: "" }); }} className="px-4 py-2 transition bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          )}
        </div>
      </form>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] bg-white rounded shadow text-sm">
          <thead>
            <tr className="text-gray-700 bg-slate-100">
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr><td colSpan={4} className="py-4 text-center text-gray-400">No clients found.</td></tr>
            ) : (
              clients.map(c => (
                <tr key={c._id} className="border-b last:border-none even:bg-slate-50">
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2 break-all">{c.email}</td>
                  <td className="px-3 py-2">{c.phone}</td>
                  <td className="flex gap-2 px-3 py-2">
                    <button onClick={() => handleEdit(c)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:underline">Delete</button>
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