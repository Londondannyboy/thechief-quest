import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import HeroSection from '@/components/sections/HeroSection'
import CTASection from '@/components/sections/CTASection'
import { getLocationBySlug } from '@/lib/sanity-queries'

// Revalidate every 60 seconds for fresh content
export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)
  
  if (!location) {
    return {
      title: 'Location Not Found - TheChief.quest',
      description: 'The requested location could not be found.'
    }
  }
  
  return {
    title: location.metaTitle || `Chief of Staff Jobs in ${location.location} | TheChief.quest`,
    description: location.metaDescription || `Explore Chief of Staff opportunities in ${location.location}. Find roles, salaries, and career insights.`,
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)
  
  if (!location) {
    notFound()
  }
  
  // Parse content if it exists
  const content = location.content || ''
  const locationName = location.location?.charAt(0).toUpperCase() + location.location?.slice(1).replace('-', ' ')
  
  return (
    <PageLayout>
      <HeroSection
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: locationName }
        ]}
        title={location.pageTitle || `Chief of Staff Jobs in ${locationName}`}
        subtitle={location.tldr}
        stats={
          location.salaryData ? [
            { value: location.salaryData.jobCount || 0, label: 'Active Jobs' },
            { value: location.salaryData.average || 'TBD', label: 'Average Salary' },
            { value: location.salaryData.topIndustries?.length || 0, label: 'Key Industries' }
          ] : undefined
        }
      />

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Key Industries */}
            {location.salaryData?.topIndustries && location.salaryData.topIndustries.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Industries</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                  {location.salaryData.topIndustries.map((industry: string) => (
                    <Link
                      key={industry}
                      href={`/industries/${industry.toLowerCase().replace(' ', '-')}`}
                      className="text-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      {industry}
                    </Link>
                  ))}
                </div>
              </>
            )}
            
            {/* Top Employers */}
            {location.salaryData?.topEmployers && location.salaryData.topEmployers.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Employers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                  {location.salaryData.topEmployers.map((employer: string) => (
                    <div key={employer} className="p-4 bg-gray-50 rounded-lg">
                      {employer}
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {/* Content */}
            {content && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  About Chief of Staff Roles in {locationName}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {typeof content === 'string' ? (
                    content.split('\n\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-700">
                      Chief of Staff positions in {locationName} offer exceptional career opportunities. 
                      The role typically involves working closely with C-suite executives to drive strategic initiatives, 
                      manage cross-functional projects, and serve as a trusted advisor to senior leadership.
                    </p>
                  )}
                </div>
              </>
            )}
            
            {/* Salary Information */}
            {location.salaryData && (
              <div className="mt-16 p-8 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Salary Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-2">Average Salary</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {location.salaryData.average || 'TBD'}
                    </p>
                  </div>
                  {location.salaryData.range && (
                    <div>
                      <p className="text-gray-600 mb-2">Salary Range</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {location.salaryData.range}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title={`Find Your Next Chief of Staff Role in ${locationName}`}
        description="Get notified about new opportunities as they become available"
      />
    </PageLayout>
  )
}