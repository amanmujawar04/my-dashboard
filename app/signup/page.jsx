"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    // Example: Call your backend to create user
    // const res = await fetch('/api/register', {...});
    setSuccess("Account created! You may log in.");
    setEmail(""); setPassword(""); setConfirm("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-md rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-green-600">Sign Up</h2>
        {error && <div className="mb-4 text-sm text-center text-red-500">{error}</div>}
        {success && <div className="mb-4 text-sm text-center text-green-600">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:ring-green-500 focus:outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:ring-green-500 focus:outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:ring-green-500 focus:outline-none"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 text-white transition bg-green-600 rounded hover:bg-green-700">Sign Up</button>
        <div className="mt-5 text-sm text-center">
          Already have an account? <Link className="text-green-600 underline" href="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
