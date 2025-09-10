import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Guard4Flight - Flight Price Comparison",
  description: "Find the cheapest flight prices across 63 countries worldwide",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16 bg-white/80 backdrop-blur-sm border-b border-blue-100">
            <SignedOut>
              <SignInButton>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm h-10 px-5 cursor-pointer transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
