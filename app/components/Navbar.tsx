"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  name: string
  email: string
}

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/me")
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      }
    }

    loadUser()
  }, [])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <header className="w-full bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">FitSchedule</h1>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm">
            Olá, <strong>{user.name}</strong>
          </span>
        )}

        <button
          onClick={handleLogout}
          className="text-sm bg-white text-black px-3 py-1 rounded hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
