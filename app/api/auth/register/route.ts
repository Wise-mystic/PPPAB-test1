import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Mock user database - In production, use a real database
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, region, city } = await request.json()

    // Validate input
    if (!name || !email || !password || !phone || !region || !city) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Please enter a valid email address" }, { status: 400 })
    }

    // Validate Ghanaian phone number
    const phoneRegex = /^(\+233|0)[2-9]\d{8}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ message: "Please enter a valid Ghanaian phone number" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role: "customer" as const,
      location: {
        region,
        city: city.trim(),
      },
      createdAt: new Date().toISOString(),
    }

    // Add to mock database
    users.push(newUser)

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: "Account created successfully",
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
