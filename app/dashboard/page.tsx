"use client"

import { useEffect, useState } from "react"
import { FadeIn } from "../components/motion/FadeIn"
import {motion, AnimatePresence} from "framer-motion"

type Appointment = {
  id: string
  date: string
  createdAt: string
}

export default function DashboardPage() {
  const [date, setDate] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch("/api/appointments")
        const data = await res.json()
        setAppointments(data)
      } catch {
        setError("Erro ao carregar agendamentos")
      }
    }

    fetchAppointments()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date }),
    })

    if (!res.ok) {
      setError("Erro ao criar agendamento")
      setLoading(false)
      return
    }

    const newAppointment = await res.json()
    setAppointments((prev) => [...prev, newAppointment])
    setSuccess("Agendamento criado com sucesso")
    setDate("")
    setLoading(false)
  }

  async function handleDelete(id: string) {
    const confirmed = confirm("Deseja cancelar este agendamento?")
    if (!confirmed) return

    setLoading(true)
    setError("")

    const res = await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      setError("Erro ao cancelar agendamento")
      setLoading(false)
      return
    }

    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    )

    setLoading(false)
  }

  const nextAppointment = appointments[0]

  return (
    <FadeIn>
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <header>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie seus agendamentos
          </p>
        </header>

        {/* CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-sm text-zinc-400">Total de agendamentos</p>
            <p className="text-2xl font-semibold mt-1">
              {appointments.length}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-sm text-zinc-400">Próximo agendamento</p>
            <p className="text-lg font-medium mt-1">
              {nextAppointment
                ? new Date(nextAppointment.date).toLocaleString("pt-BR")
                : "Nenhum"}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-sm text-zinc-400">Status</p>
            <p className="text-lg font-medium mt-1 text-emerald-400">
              Ativo
            </p>
          </div>
        </section>

        {/* CRIAR AGENDAMENTO */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">
            Novo agendamento
          </h2>

          <form onSubmit={handleCreate} className="flex gap-3">
            <input
              type="datetime-local"
              value={date}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3 py-2"
              required
              placeholder="data"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-5 rounded font-medium disabled:opacity-50"
            >
              Agendar
            </button>
          </form>

          {error && (
            <p className="text-red-400 text-sm mt-3">{error}</p>
          )}
          {success && (
            <p className="text-emerald-400 text-sm mt-3">{success}</p>
          )}
        </section>

        {/* LISTA */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">
            Próximos agendamentos
          </h2>

          {appointments.length === 0 && (
            <p className="text-zinc-500 text-sm">
              Nenhum agendamento criado ainda.
            </p>
          )}

          <ul className="space-y-3">
            {appointments.map((appointment) => (
              <motion.li
                key={appointment.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex justify-between items-center border rounded p-3"
              >
                <span className="text-sm">
                  {new Date(appointment.date).toLocaleString("pt-BR")}
                </span>

                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="text-sm text-red-400 hover:text-red-500"
                >
                  Cancelar
                </button>
              </motion.li>
            ))}
          </ul>
        </section>

      </div>
    </main>
    </FadeIn>
  )
}
