import { UserProfile } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default function ProfilePage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profilul Meu</h1>
          <p className="text-gray-600">Gestionează-ți contul și preferințele</p>
        </div>
        <div className="flex justify-center">
          <UserProfile
            appearance={{
              elements: {
                card: "shadow-xl border-0",
                navbar: "bg-white",
                navbarButton: "text-gray-700 hover:bg-gray-100",
                navbarButtonActive: "bg-blue-100 text-blue-700",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
