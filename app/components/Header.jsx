"use client";
import Link from "next/link";
import { Search, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="flex flex-col items-center justify-between w-full px-4 py-3 bg-white shadow-md sm:flex-row">
      

      {/* Search Section */}
      <form
        className="relative flex items-center w-full mb-2 sm:max-w-md sm:mb-0"
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="Site search"
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-10 pr-3 text-sm rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Search input"
        />
        <Search
          className="absolute pointer-events-none left-3 top-2 text-slate-500"
          size={18}
          aria-hidden="true"
        />
      </form>

      {/*  Links */}
      <nav className="flex items-center gap-2">
        <Link
          href="/signup"
          className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 transition-colors rounded-md hover:bg-slate-100"
        >
          <UserPlus size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Sign Up</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 transition-colors rounded-md hover:bg-slate-100"
        >
          <LogIn size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Log In</span>
        </Link>
      </nav>
    </header>
  );
}
