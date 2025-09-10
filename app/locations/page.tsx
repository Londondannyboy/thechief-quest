import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import HeroSection from '@/components/sections/HeroSection'
import CTASection from '@/components/sections/CTASection'
import { getAllLocations } from '@/lib/sanity-queries'
import type { LocationContent } from '@/types/sanity'

// Revalidate every 60 seconds for fresh content
export const revalidate = 60

export const metadata = {
  title: 'Chief of Staff Jobs by Location | TheChief.quest',
  description: 'Find Chief of Staff opportunities across 20+ cities in UK, Europe, and Middle East. Browse by location.',
}

export default async function LocationsPage() {
  // Fetch real location data from Sanity
  const locations = await getAllLocations() as LocationContent[]
  
  // Group locations by region
  const ukLocations = locations.filter((loc) => loc.region === 'UK' || !loc.region)
  const europeLocations = locations.filter((loc) => loc.region === 'Europe')
  const middleEastLocations = locations.filter((loc) => loc.region === 'Middle East')
  
  // Calculate total jobs
  const totalJobs = locations.reduce((sum, loc) => 
    sum + (loc.salaryData?.jobCount || 0), 0)

  return (
    <PageLayout>
      <HeroSection
        title="Chief of Staff Jobs by Location"
        subtitle={`Explore opportunities across ${locations.length} cities in UK, Europe, and Middle East`}
        variant="light"
        stats={[
          { value: locations.length, label: 'Cities' },
          { value: totalJobs, label: 'Total Jobs' },
          { value: 3, label: 'Regions' }
        ]}
      />

      {/* UK Cities */}
      {ukLocations.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">United Kingdom</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ukLocations.map((location) => (
                  <Link
                    key={location._id}
                    href={`/locations/chief-of-staff-${location.slug}`}
                    className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                      {location.location.replace('-', ' ')}
                    </h3>
                    <div className="text-gray-600 mb-4">
                      <div>{location.salaryData?.jobCount || 0} active positions</div>
                      <div>Avg: {location.salaryData?.average || 'TBD'}</div>
                    </div>
                    <span className="text-blue-600 font-medium">View jobs →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Europe Cities */}
      {europeLocations.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Europe</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {europeLocations.map((location) => (
                  <Link
                    key={location._id}
                    href={`/locations/${location.slug}`}
                    className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                      {location.location.replace('-', ' ')}
                    </h3>
                    <div className="text-gray-600 mb-4">
                      <div>{location.salaryData?.jobCount || 0} active positions</div>
                      <div>Avg: {location.salaryData?.average || 'TBD'}</div>
                    </div>
                    <span className="text-blue-600 font-medium">View jobs →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Middle East Cities */}
      {middleEastLocations.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Middle East</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {middleEastLocations.map((location) => (
                  <Link
                    key={location._id}
                    href={`/locations/${location.slug}`}
                    className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                      {location.location.replace('-', ' ')}
                    </h3>
                    <div className="text-gray-600 mb-4">
                      <div>{location.salaryData?.jobCount || 0} active positions</div>
                      <div>Avg: {location.salaryData?.average || 'TBD'}</div>
                    </div>
                    <span className="text-blue-600 font-medium">View jobs →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No locations fallback */}
      {locations.length === 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">No locations available. Please add content in Sanity Studio.</p>
          </div>
        </section>
      )}

      <CTASection
        title="Can't Find Your City?"
        description="We're constantly expanding. Join our network to get notified when we add your location."
        buttonText="Join Waiting List"
      />
    </PageLayout>
  )
}