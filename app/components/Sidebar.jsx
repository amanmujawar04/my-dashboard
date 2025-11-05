"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Users,
  ShoppingCart,
  Box,
  BarChart2,
  MessageSquare,
  Bell,
  HelpCircle,
  Menu,
  X
} from "lucide-react";

const menu = [
  { name: "Home", href: "/", icon: Home },
  { name: "Client", href: "/client", icon: Users },
  { name: "Order", href: "/order", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Box },
  { name: "Sales", href: "/sales", icon: BarChart2 },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Notification", href: "/notification", icon: Bell },
  { name: "Help", href: "/help", icon: HelpCircle }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed z-50 top-4 left-4 sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white rounded-md bg-slate-900"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-60 bg-slate-900 text-white transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="flex items-center justify-center p-4 text-2xl font-bold border-b border-slate-700">
          Dashboard
        </div>
        <nav className="flex flex-col gap-2 p-4 font-semibold">
          {menu.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-700"
              onClick={() => setIsOpen(false)}
            >
              <Icon size={22} />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>


{/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
