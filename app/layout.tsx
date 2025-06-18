import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider } from "@/context/CartContext"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import { LoadingProvider } from "@/context/LoadingContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Permanent Printing Press Ghana - Quality Printing Services",
  description:
    "Ghana's premier printing and branding company. Custom t-shirts, packaging, and bulk printing services across Accra, Kumasi, and all regions of Ghana.",
  keywords: "printing Ghana, t-shirt printing Accra, custom printing Kumasi, packaging Ghana, branding services",
  openGraph: {
    title: "Permanent Printing Press Ghana",
    description: "Quality printing services across Ghana",
    url: "https://permanentprintingpress.com.gh",
    siteName: "Permanent Printing Press Ghana",
    locale: "en_GH",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GH">
      <body className={inter.className}>
        <LoadingProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
