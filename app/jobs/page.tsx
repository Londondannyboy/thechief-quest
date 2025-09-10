import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Chief of Staff Jobs | TheChief.quest',
  description: 'Browse the latest Chief of Staff job opportunities across UK, Europe, and Middle East.',
}

export default function JobsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Chief of Staff Jobs
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover your next Chief of Staff opportunity
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Job Board Coming Soon
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We're building a comprehensive job board featuring Chief of Staff positions 
                  from top companies across our coverage areas.
                </p>
                <p className="text-gray-600 mb-8">
                  In the meantime, explore opportunities by:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/locations"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Browse by Location
                  </Link>
                  <Link
                    href="/industries"
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition"
                  >
                    Browse by Industry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Featured Locations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/locations/london" className="text-center p-6 bg-white rounded-lg hover:shadow-md transition">
                <div className="text-2xl font-bold text-gray-900">234</div>
                <div className="text-gray-600">Jobs in London</div>
              </Link>
              <Link href="/locations/dubai" className="text-center p-6 bg-white rounded-lg hover:shadow-md transition">
                <div className="text-2xl font-bold text-gray-900">89</div>
                <div className="text-gray-600">Jobs in Dubai</div>
              </Link>
              <Link href="/locations/zurich" className="text-center p-6 bg-white rounded-lg hover:shadow-md transition">
                <div className="text-2xl font-bold text-gray-900">45</div>
                <div className="text-gray-600">Jobs in Zurich</div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}