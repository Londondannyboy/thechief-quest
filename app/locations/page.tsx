import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Chief of Staff Jobs by Location | TheChief.quest',
  description: 'Find Chief of Staff opportunities across 20+ cities in UK, Europe, and Middle East. Browse by location.',
}

const locations = {
  'United Kingdom': [
    { id: 'london', name: 'London', jobs: 234, avgSalary: '£150K' },
    { id: 'manchester', name: 'Manchester', jobs: 67, avgSalary: '£95K' },
    { id: 'birmingham', name: 'Birmingham', jobs: 45, avgSalary: '£85K' },
    { id: 'edinburgh', name: 'Edinburgh', jobs: 42, avgSalary: '£90K' },
    { id: 'glasgow', name: 'Glasgow', jobs: 38, avgSalary: '£85K' },
    { id: 'leeds', name: 'Leeds', jobs: 35, avgSalary: '£80K' },
    { id: 'bristol', name: 'Bristol', jobs: 32, avgSalary: '£85K' },
    { id: 'cardiff', name: 'Cardiff', jobs: 28, avgSalary: '£75K' },
    { id: 'liverpool', name: 'Liverpool', jobs: 25, avgSalary: '£75K' },
    { id: 'newcastle', name: 'Newcastle', jobs: 22, avgSalary: '£70K' },
    { id: 'sheffield', name: 'Sheffield', jobs: 20, avgSalary: '£70K' },
  ],
  'Europe': [
    { id: 'zurich', name: 'Zurich', jobs: 45, avgSalary: 'CHF 180K' },
    { id: 'geneva', name: 'Geneva', jobs: 34, avgSalary: 'CHF 165K' },
    { id: 'luxembourg', name: 'Luxembourg City', jobs: 28, avgSalary: '€140K' },
  ],
  'Middle East': [
    { id: 'dubai', name: 'Dubai', jobs: 89, avgSalary: 'AED 600K' },
    { id: 'abu-dhabi', name: 'Abu Dhabi', jobs: 56, avgSalary: 'AED 650K' },
    { id: 'doha', name: 'Doha', jobs: 42, avgSalary: 'QAR 550K' },
    { id: 'riyadh', name: 'Riyadh', jobs: 38, avgSalary: 'SAR 500K' },
    { id: 'kuwait-city', name: 'Kuwait City', jobs: 25, avgSalary: 'KWD 45K' },
    { id: 'manama', name: 'Manama', jobs: 18, avgSalary: 'BHD 50K' },
  ],
}

export default function LocationsPage() {
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
                <span className="text-gray-900">Locations</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Chief of Staff Jobs by Location
              </h1>
              <p className="text-xl text-gray-600">
                Explore Chief of Staff opportunities across 20+ cities in UK, Europe, and Middle East.
              </p>
            </div>
          </div>
        </section>

        {Object.entries(locations).map(([region, cities]) => (
          <section key={region} className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{region}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map((city) => (
                  <Link
                    key={city.id}
                    href={`/locations/${city.id}`}
                    className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {city.name}
                    </h3>
                    <div className="text-gray-600">
                      <div className="mb-1">{city.jobs} active jobs</div>
                      <div className="font-semibold text-gray-900">Avg: {city.avgSalary}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't Find Your Location?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              We're constantly expanding our coverage. Get notified when we add your city.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Request a Location
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}