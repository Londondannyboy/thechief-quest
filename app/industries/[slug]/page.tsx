import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const industryName = slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    title: `Chief of Staff Jobs in ${industryName} | TheChief.quest`,
    description: `Explore Chief of Staff opportunities in the ${industryName} industry. Find roles, salaries, and career insights.`,
  }
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params
  
  // Mock data for now until Sanity is populated
  const industryData = {
    'private-equity': {
      name: 'Private Equity',
      avgSalary: '£180,000',
      jobCount: 156,
      description: 'Private Equity offers the highest-paying Chief of Staff roles, working directly with Partners and Portfolio Company CEOs.',
      keyLocations: ['London', 'Dubai', 'Zurich'],
      topFirms: ['KKR', 'Blackstone', 'Carlyle', 'Apollo', 'CVC Capital'],
      skills: ['Financial modeling', 'Due diligence', 'Portfolio management', 'Strategic planning'],
    },
    'hedge-funds': {
      name: 'Hedge Funds',
      avgSalary: '£165,000',
      jobCount: 89,
      description: 'Hedge Fund Chief of Staff roles combine operational excellence with investment strategy support.',
      keyLocations: ['London', 'Geneva', 'Dubai'],
      topFirms: ['Bridgewater', 'Man Group', 'Brevan Howard', 'Millennium', 'Citadel'],
      skills: ['Risk management', 'Regulatory compliance', 'Operations', 'Investor relations'],
    },
    'venture-capital': {
      name: 'Venture Capital',
      avgSalary: '£140,000',
      jobCount: 67,
      description: 'VC Chief of Staff roles focus on portfolio support, fundraising, and ecosystem building.',
      keyLocations: ['London', 'Berlin', 'Tel Aviv'],
      topFirms: ['Sequoia', 'Index Ventures', 'Balderton', 'Accel', 'Atomico'],
      skills: ['Startup operations', 'Network building', 'Deal flow management', 'Portfolio support'],
    },
    'technology': {
      name: 'Technology',
      avgSalary: '£130,000',
      jobCount: 234,
      description: 'Tech Chief of Staff roles drive product strategy, organizational scaling, and strategic initiatives.',
      keyLocations: ['London', 'Dublin', 'Amsterdam'],
      topFirms: ['Google', 'Meta', 'Microsoft', 'Amazon', 'Apple'],
      skills: ['Product management', 'Agile methodologies', 'Data analysis', 'Growth strategies'],
    },
  }[slug]
  
  if (!industryData) {
    notFound()
  }
  
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
                <Link href="/industries" className="text-gray-600 hover:text-gray-900">Industries</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900">{industryData.name}</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Chief of Staff Jobs in {industryData.name}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {industryData.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-gray-900">{industryData.jobCount}</div>
                  <div className="text-gray-600">Active Jobs</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-gray-900">{industryData.avgSalary}</div>
                  <div className="text-gray-600">Average Salary</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-gray-900">{industryData.keyLocations.length}</div>
                  <div className="text-gray-600">Key Locations</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Sections */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Locations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {industryData.keyLocations.map((location) => (
                  <Link
                    key={location}
                    href={`/locations/${location.toLowerCase()}`}
                    className="text-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    {location}
                  </Link>
                ))}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-16">Top Firms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industryData.topFirms.map((firm) => (
                  <div key={firm} className="p-4 bg-gray-50 rounded-lg">
                    {firm}
                  </div>
                ))}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-16">Key Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {industryData.skills.map((skill) => (
                  <div key={skill} className="text-center py-3 px-4 bg-blue-50 text-blue-700 rounded-lg">
                    {skill}
                  </div>
                ))}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-16">About Chief of Staff Roles in {industryData.name}</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  The {industryData.name} industry offers {industryData.jobCount} Chief of Staff positions with an average salary of {industryData.avgSalary}. 
                  These roles are concentrated in {industryData.keyLocations.join(', ')}, where the industry has its strongest presence.
                </p>
                <p>
                  Chief of Staff professionals in {industryData.name} work with senior executives to drive strategic initiatives, 
                  manage critical projects, and ensure organizational alignment. The role requires a unique blend of strategic thinking, 
                  operational excellence, and stakeholder management.
                </p>
                <h3>Career Progression</h3>
                <p>
                  Chief of Staff roles in {industryData.name} typically lead to senior executive positions such as:
                </p>
                <ul>
                  <li>Chief Operating Officer (COO)</li>
                  <li>Chief Strategy Officer</li>
                  <li>General Manager / Business Unit Head</li>
                  <li>Vice President of Operations</li>
                  <li>Partner / Principal (in investment firms)</li>
                </ul>
                <h3>Compensation Structure</h3>
                <p>
                  Beyond the base salary of {industryData.avgSalary}, Chief of Staff roles in {industryData.name} typically include:
                </p>
                <ul>
                  <li>Annual bonus: 30-100% of base salary</li>
                  <li>Long-term incentives / equity participation</li>
                  <li>Comprehensive benefits package</li>
                  <li>Professional development budget</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Find Your Next Role in {industryData.name}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Browse current openings and set up job alerts
            </p>
            <Link
              href="/jobs"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              View All Jobs
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}