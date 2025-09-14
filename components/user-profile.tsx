"use client"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, Shield } from "lucide-react"

export default function UserProfile() {
  const { user, isLoaded } = useUser()

  if (!isLoaded || !user) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="glass-card-modern hover-lift-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl gradient-text">
            <User className="w-8 h-8 text-accent" />
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={user.imageUrl || "/placeholder.svg"}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-accent/30"
            />
            <div>
              <h3 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-muted-foreground">
                @{user.username || user.emailAddresses[0].emailAddress.split("@")[0]}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
              <Mail className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.emailAddresses[0].emailAddress}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
              <Calendar className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Member since</p>
                <p className="font-medium">{new Date(user.createdAt!).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Verified Account
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
