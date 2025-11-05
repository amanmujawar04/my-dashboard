"use client";
import { useEffect, useState } from "react";

const API_URL = "/api/helps";

export default function HelpPage() {
  const [help, setHelp] = useState([]);
  const [form, setForm] = useState({ subject: "", description: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchHelp();
  }, []);

  async function fetchHelp() {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setHelp(json);
    } catch (err) {
      console.error("Failed to fetch help requests:", err);
      setHelp([]);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.subject || !form.description) return;

    try {
      if (editing) {
        const res = await fetch(`${API_URL}/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setHelp(prev => prev.map(h => (h._id === editing._id ? updated : h)));
        setEditing(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setHelp(prev => [...prev, created]);
      }

      setForm({ subject: "", description: "" });
    } catch (err) {
      console.error("Failed to submit help request:", err);
    }
  }

  function handleEdit(h) {
    setEditing(h);
    setForm({ subject: h.subject, description: h.description });
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setHelp(prev => prev.filter(h => h._id !== id));
    } catch (err) {
      console.error("Failed to delete help request:", err);
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Help</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-end">
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
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
                setForm({ subject: "", description: "" });
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
              <th className="p-2 text-left">Subject</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {help.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center">
                  No help requests found.
                </td>
              </tr>
            ) : (
              help.map(h => (
                <tr key={h._id} className="border-b">
                  <td className="p-2">{h.subject}</td>
                  <td className="p-2">{h.description}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(h)} className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(h._id)} className="text-red-600 hover:underline">
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
