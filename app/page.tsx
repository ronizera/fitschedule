import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function HomePage() {

  const cookieStore = await cookies()
  const sessionId = cookieStore.get("sessionId")

  if(!sessionId){
    redirect("/login")
  }

  redirect("/dashboard")

  return (
   <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    </div>
  );
}
