import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock user database - In production, use a real database
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "0244123456",
    role: "customer" as const,
    location: {
      region: "Greater Accra",
      city: "Accra",
    },
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@permanentprintingpress.com.gh",
    phone: "0244654321",
    role: "admin" as const,
    location: {
      region: "Greater Accra",
      city: "Accra",
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

    // Find user
    const user = users.find((u) => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Token valid",
      user,
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
