"use client";
import { useEffect, useState } from "react";

const API_URL = "/api/notifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setNotifications(json);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setNotifications([]);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.content) return;

    try {
      if (editing) {
        const res = await fetch(`${API_URL}/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setNotifications(prev => prev.map(n => (n._id === editing._id ? updated : n)));
        setEditing(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setNotifications(prev => [...prev, created]);
      }

      setForm({ title: "", content: "" });
    } catch (err) {
      console.error("Failed to submit notification:", err);
    }
  }

  function handleEdit(n) {
    setEditing(n);
    setForm({ title: n.title, content: n.content });
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Notifications</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-end">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
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
                setForm({ title: "", content: "" });
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
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Content</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center">
                  No notifications found.
                </td>
              </tr>
            ) : (
              notifications.map(n => (
                <tr key={n._id} className="border-b">
                  <td className="p-2">{n.title}</td>
                  <td className="p-2">{n.content}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(n)} className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(n._id)} className="text-red-600 hover:underline">
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
