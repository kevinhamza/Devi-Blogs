"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth } from "@/lib/useAuth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
const { user, loading } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
  };


  const navLinks = [
    { name: "Blog", href: "/blog" },
  ];

  if (user && !loading) {
    navLinks.push({ name: "Admin", href: "/admin" });
  } else if (!loading) {
    navLinks.push({ name: "Login", href: "/login" });
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#020617] border-b border-gray-800 p-2">
      <div className="max-w-6xl mx-auto grid grid-cols-3 items-center gap-4 text-xs">
        {/* Left: Blog/Home */}
        <Link href="/" className={`
          col-span-1 flex justify-start px-3 py-1.5 rounded border-2 border-gray-700 bg-gray-800/70 text-xs font-bold transition-all
          ${pathname === '/' ? "border-emerald-400 bg-emerald-400/30 text-emerald-400" : "text-gray-300 hover:border-emerald-400 hover:text-emerald-400"}
        `}>
          Home
        </Link>

        {/* Middle: Dynamic Admin/Login */}
        <div className="col-span-1 flex justify-center">
          {user ? (
            <Link href="/admin" className={`
              px-3 py-1.5 rounded border-2 border-gray-700 bg-gray-800/70 font-bold transition-all
              ${pathname === '/admin' ? "border-emerald-400 bg-emerald-400/30 text-emerald-400" : "text-gray-300 hover:border-emerald-400 hover:text-emerald-400 hover:bg-gray-700"}
            `}>
              Admin
            </Link>
          ) : (
            <Link href="/login" className={`
              px-3 py-1.5 rounded border-2 border-blue-600/70 bg-blue-900/40 font-bold text-gray-200 transition-all hover:border-blue-400 hover:bg-blue-900 hover:text-blue-400
            `}>
              Login
            </Link>
          )}
        </div>

        {/* Right: Blog */}
        <Link href="/blog" className={`
          col-span-1 flex justify-end px-3 py-1.5 rounded border-2 border-gray-700 bg-gray-800/70 text-xs font-bold transition-all
          ${pathname === '/blog' ? "border-emerald-400 bg-emerald-400/30 text-emerald-400" : "text-gray-300 hover:border-emerald-400 hover:text-emerald-400"}
        `}>
          Blog
        </Link>

        {/* Overlay Logout if logged in */}
        {user && !loading && (
          <button onClick={handleLogout} className="col-span-3 mx-auto mt-1 px-4 py-1 rounded border-2 border-red-500/70 bg-red-900/50 text-xs font-bold text-gray-200 hover:border-red-400 hover:bg-red-900 hover:text-red-400 transition-all absolute right-4 top-1/2 -translate-y-1/2">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
