import { notFound } from "next/navigation"

export default function ProductPage({ params }: { params: { id: string } }) {
  // TODO: Fetch product data using params.id
  // If product not found, call notFound()
  // For now, show a placeholder
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Product Details: {params.id}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Product information, images, pricing, and purchase options will be displayed here.
          </p>
          <div className="bg-white rounded-lg shadow p-8">
            <p className="text-gray-500">[Product details coming soon]</p>
          </div>
        </div>
      </section>
    </div>
  )
}
