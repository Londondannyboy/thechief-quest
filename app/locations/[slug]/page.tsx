import { client } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getLocationContent(slug: string) {
  // Handle both old URLs (/locations/london) and new SEO URLs (/locations/chief-of-staff-london)
  const locationSlug = slug.replace('chief-of-staff-', '')
  
  const query = `*[_type == "chiefOfStaff" && location == $locationSlug && !defined(industry)][0] {
    _id,
    metaTitle,
    metaDescription,
    pageTitle,
    tldr,
    question,
    location,
    region,
    industry,
    content,
    salaryData,
    publishedAt,
    "relatedContent": relatedContent[]-> {
      _id,
      metaTitle,
      slug
    }
  }`
  
  const content = await client.fetch(query, { locationSlug })
  return content
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const content = await getLocationContent(slug)
  
  if (!content) {
    return {
      title: 'Location Not Found | TheChief.quest',
      description: 'The requested location page could not be found.'
    }
  }
  
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params
  const content = await getLocationContent(slug)
  
  // Fallback to mock data if no Sanity content
  const locationData = content || {
    london: {
      name: 'London',
      country: 'UK',
      avgSalary: '£150,000',
      jobCount: 234,
      description: 'London is the premier destination for Chief of Staff roles in Europe, with the highest concentration of C-suite opportunities.',
      industries: ['Private Equity', 'Hedge Funds', 'Technology', 'Financial Services'],
      topEmployers: ['Goldman Sachs', 'JP Morgan', 'BlackRock', 'KKR', 'Carlyle Group'],
    },
    dubai: {
      name: 'Dubai',
      country: 'UAE',
      avgSalary: 'AED 600,000',
      jobCount: 89,
      description: 'Dubai offers tax-free Chief of Staff opportunities in a rapidly growing business hub connecting East and West.',
      industries: ['Private Equity', 'Real Estate', 'Technology', 'Government'],
      topEmployers: ['Mubadala', 'ADNOC', 'Emirates NBD', 'Dubai Holding', 'Majid Al Futtaim'],
    },
    zurich: {
      name: 'Zurich',
      country: 'Switzerland',
      avgSalary: 'CHF 180,000',
      jobCount: 45,
      description: 'Zurich provides Chief of Staff roles in global financial institutions and multinational headquarters.',
      industries: ['Banking', 'Insurance', 'Pharmaceuticals', 'Technology'],
      topEmployers: ['UBS', 'Credit Suisse', 'Swiss Re', 'Zurich Insurance', 'Novartis'],
    },
  }[slug.replace('chief-of-staff-', '')]
  
  if (!locationData && !content) {
    notFound()
  }
  
  // Use Sanity content if available
  const pageData = content ? {
    name: content.pageTitle?.split(' in ')[1]?.split(',')[0] || content.location,
    country: content.region || 'UK',
    avgSalary: content.salaryData?.average || '£150,000',
    jobCount: content.salaryData?.jobCount || 100,
    description: content.tldr || content.metaDescription,
    industries: content.salaryData?.topIndustries || ['Private Equity', 'Technology'],
    topEmployers: content.salaryData?.topEmployers || ['Top Employer 1', 'Top Employer 2'],
    content: content.content,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription
  } : locationData
  
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <nav className="mb-4 text-sm">
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/locations" className="text-gray-600 hover:text-gray-900">Locations</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900">{pageData.name}</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {pageData.metaTitle || `Chief of Staff Jobs in ${pageData.name}, ${pageData.country}`}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {pageData.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-gray-900">{pageData.jobCount}</div>
                  <div className="text-gray-600">Active Jobs</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-gray-900">{pageData.avgSalary}</div>
                  <div className="text-gray-600">Average Salary</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-gray-900">{pageData.industries.length}</div>
                  <div className="text-gray-600">Key Industries</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Sections */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Industries</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pageData.industries.map((industry) => (
                  <Link
                    key={industry}
                    href={`/locations/${slug}/${industry.toLowerCase().replace(' ', '-')}`}
                    className="text-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    {industry}
                  </Link>
                ))}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-16">Top Employers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pageData.topEmployers.map((employer) => (
                  <div key={employer} className="p-4 bg-gray-50 rounded-lg">
                    {employer}
                  </div>
                ))}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-16">About Chief of Staff Roles in {pageData.name}</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  Chief of Staff positions in {pageData.name} offer exceptional career opportunities with an average salary of {pageData.avgSalary}. 
                  The city is home to {pageData.jobCount} active Chief of Staff positions across various industries.
                </p>
                <p>
                  The role of Chief of Staff in {pageData.name} typically involves working closely with C-suite executives to drive strategic initiatives, 
                  manage cross-functional projects, and serve as a trusted advisor to senior leadership. Professionals in these roles often come from 
                  consulting, investment banking, or operational backgrounds.
                </p>
                <h3>Key Responsibilities</h3>
                <ul>
                  <li>Strategic planning and execution</li>
                  <li>Cross-functional project management</li>
                  <li>Executive communication and stakeholder management</li>
                  <li>Business analysis and performance tracking</li>
                  <li>Special projects and transformation initiatives</li>
                </ul>
                <h3>Required Skills</h3>
                <ul>
                  <li>5-10 years of experience in consulting, banking, or operations</li>
                  <li>MBA or equivalent advanced degree preferred</li>
                  <li>Exceptional communication and presentation skills</li>
                  <li>Strong analytical and problem-solving abilities</li>
                  <li>Experience managing complex, cross-functional initiatives</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Find Your Next Chief of Staff Role in {pageData.name}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get notified about new opportunities as they become available
            </p>
            <Link
              href="/jobs"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Browse All Jobs
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}