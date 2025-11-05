"use client";
import { useEffect, useState } from "react";

const API_URL = "/api/messages";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ sender: "", content: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setMessages(json);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setMessages([]);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.sender || !form.content) return;

    try {
      if (editing) {
        const res = await fetch(`${API_URL}/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setMessages(prev => prev.map(m => (m._id === editing._id ? updated : m)));
        setEditing(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setMessages(prev => [...prev, created]);
      }

      setForm({ sender: "", content: "" });
    } catch (err) {
      console.error("Failed to submit message:", err);
    }
  }

  function handleEdit(m) {
    setEditing(m);
    setForm({ sender: m.sender, content: m.content });
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Messages</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-end">
        <input
          name="sender"
          value={form.sender}
          onChange={handleChange}
          placeholder="Sender"
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Message"
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
                setForm({ sender: "", content: "" });
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
              <th className="p-2 text-left">Sender</th>
              <th className="p-2 text-left">Message</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center">
                  No messages found.
                </td>
              </tr>
            ) : (
              messages.map(m => (
                <tr key={m._id} className="border-b">
                  <td className="p-2">{m.sender}</td>
                  <td className="p-2">{m.content}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(m)} className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(m._id)} className="text-red-600 hover:underline">
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
