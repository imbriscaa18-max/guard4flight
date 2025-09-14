import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Guard4Flight</h1>
          <p className="text-gray-600">Creează un cont pentru a căuta zboruri</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
              card: "shadow-xl border-0",
              headerTitle: "text-xl font-semibold",
              headerSubtitle: "text-gray-600",
            },
          }}
        />
      </div>
    </div>
  )
}
