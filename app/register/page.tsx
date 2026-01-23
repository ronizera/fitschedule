"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

export default function RegisterPage (){
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("")

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({name, email, password}),
        })

        if(!res.ok) {
            const data = await res.json()
            setError(data.error || "Erro ao cadastrar");
            return
        }

        router.push("/login")
    }

    return (
         <main className="min-h-screen flex items-center justify-center text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Criar conta</h1>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          type="text"
          className="w-full border p-2 mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />

        <input
          type="email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Cadastrar
        </button>

        <p className="text-sm mt-4 text-center">
          Já tem conta?{" "}
          <Link href="/login" className="underline">
            Fazer login
          </Link>
        </p>
      </form>
    </main>
    )
}