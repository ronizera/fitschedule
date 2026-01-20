"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage(){
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("")

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({email, password}),
        })

        if(!res.ok) {
            const data = await res.json()
            setError(data.error || "Erro ao fazer login")
            setPassword("")
            return
        }

        setEmail("")
        setPassword("")
        router.push("/dashboard")
    }

    return(
         <main className="min-h-screen flex items-center justify-center text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Entrar
        </button>

        <p className="text-sm mt-4 text-center">
          Não tem conta?{" "}
          <Link href="/register" className="underline">
            Criar conta
          </Link>
        </p>
      </form>
    </main>
    )
}