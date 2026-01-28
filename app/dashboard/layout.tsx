"use client"

import { ReactNode, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">

      {/* OVERLAY (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <motion.aside
      
        className={`
          fixed z-40 inset-y-0 left-0 w-64 bg-zinc-900 border-r border-zinc-800
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <div className="p-6 font-bold text-xl">
          FitSchedule
        </div>

        <nav className="px-4 space-y-2">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 rounded-lg hover:bg-zinc-800"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 rounded-lg hover:bg-zinc-800"
          >
            Agendamentos
          </Link>

          <Link
            href="#"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 rounded-lg hover:bg-zinc-800"
          >
            Configurações
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800 mt-auto">
          <form action="/api/logout" method="post">
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
              Sair
            </button>
          </form>
        </div>
      </motion.aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* HEADER */}
        <header className="h-14 flex items-center justify-between px-4 border-b border-zinc-800">
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-xl"
          >
            ☰
          </button>

          <h1 className="font-semibold">
            Dashboard
          </h1>

          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs">
            R
          </div>
        </header>

        {/* PÁGINA */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>

      </div>
    </div>
  )
}
