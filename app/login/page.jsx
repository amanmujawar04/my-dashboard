"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Replace with real authentication logic with your backend
    if (!email || !password) {
      setError("All fields required");
      setLoading(false);
      return;
    }
    // Example fetch login:
    // const res = await fetch("/api/login", ...)
    setTimeout(() => {
      if (email === "demo@example.com" && password === "demo123") {
        window.location.href = "/";
      } else {
        setError("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <form onSubmit={handleLogin} className="bg-white px-8 py-6 rounded-lg shadow-md w-full max-w-[400px] space-y-5">
        <h2 className="mb-3 text-2xl font-semibold text-center">Login</h2>
        {error && <div className="text-sm text-center text-red-500">{error}</div>}
        <div>
          <label className="block mb-1 text-gray-700">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button disabled={loading} className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700">{loading ? "Logging in..." : "Login"}</button>
        <div className="mt-2 text-sm text-center">
          Don&apos;t have an account? <Link className="text-blue-600 underline" href="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
