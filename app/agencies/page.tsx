import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { client } from '@/lib/sanity.client'

interface Agency {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  specializations?: string[];
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
}

async function getAgencies() {
  const query = `*[_type == "recruitmentAgency"] | order(rating desc) {
    _id,
    name,
    slug,
    description,
    specializations,
    rating,
    reviewCount,
    verified
  }`
  
  return client.fetch<Agency[]>(query)
}

export const metadata = {
  title: 'Chief of Staff Recruitment Agencies | TheChief.quest',
  description: 'Top recruitment agencies specializing in Chief of Staff placements across UK, Europe, and Middle East.',
}

export default async function AgenciesPage() {
  const agencies = await getAgencies()

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <nav className="mb-4 text-sm">
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900">Recruitment Agencies</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Chief of Staff Recruitment Agencies
              </h1>
              <p className="text-xl text-gray-600">
                Partner with specialist recruiters who understand the Chief of Staff market.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {agencies && agencies.length > 0 ? (
                <div className="space-y-6">
                  {agencies.map((agency) => (
                    <div key={agency._id} className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {agency.name}
                          </h2>
                          {agency.verified && (
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        {agency.rating && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-yellow-600">
                              {agency.rating} ★
                            </div>
                            <div className="text-sm text-gray-500">
                              {agency.reviewCount} reviews
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {agency.description}
                      </p>
                      
                      {agency.specializations && (
                        <div className="flex flex-wrap gap-2">
                          {agency.specializations.map((spec: string) => (
                            <span key={spec} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                              {spec.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">
                    Loading recruitment agencies...
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Are You a Recruitment Agency?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get listed on TheChief.quest and reach thousands of Chief of Staff candidates
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Get Listed
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}