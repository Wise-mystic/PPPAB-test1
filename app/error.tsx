"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Please try again or contact our support team if the problem persists.
        </p>
        <div className="space-y-4">
          <Button onClick={reset} className="bg-orange-600 hover:bg-orange-700 text-white">
            Try again
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  )
}
