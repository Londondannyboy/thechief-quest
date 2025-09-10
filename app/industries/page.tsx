import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Chief of Staff Jobs by Industry | TheChief.quest',
  description: 'Explore Chief of Staff roles across industries: Private Equity, Hedge Funds, Technology, and more.',
}

const industries = [
  {
    id: 'private-equity',
    name: 'Private Equity',
    avgSalary: '£180,000',
    jobs: 156,
    description: 'Work with Partners and Portfolio Company CEOs in high-stakes environments.',
    topFirms: ['KKR', 'Blackstone', 'Carlyle', 'Apollo'],
  },
  {
    id: 'hedge-funds',
    name: 'Hedge Funds',
    avgSalary: '£165,000',
    jobs: 89,
    description: 'Support investment strategy and operational excellence.',
    topFirms: ['Bridgewater', 'Man Group', 'Brevan Howard', 'Millennium'],
  },
  {
    id: 'venture-capital',
    name: 'Venture Capital',
    avgSalary: '£140,000',
    jobs: 67,
    description: 'Drive portfolio support and ecosystem building.',
    topFirms: ['Sequoia', 'Index Ventures', 'Balderton', 'Accel'],
  },
  {
    id: 'technology',
    name: 'Technology',
    avgSalary: '£130,000',
    jobs: 234,
    description: 'Lead product strategy and organizational scaling.',
    topFirms: ['Google', 'Meta', 'Microsoft', 'Amazon'],
  },
  {
    id: 'startups',
    name: 'Startups',
    avgSalary: '£110,000',
    jobs: 145,
    description: 'Shape company direction in fast-growing environments.',
    topFirms: ['Series A-C companies', 'Scale-ups', 'Unicorns'],
  },
  {
    id: 'utilities',
    name: 'Utilities',
    avgSalary: '£95,000',
    jobs: 42,
    description: 'Drive transformation in essential services.',
    topFirms: ['National Grid', 'Centrica', 'SSE', 'E.ON'],
  },
]

export default function IndustriesPage() {
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
                <span className="text-gray-900">Industries</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Chief of Staff Jobs by Industry
              </h1>
              <p className="text-xl text-gray-600">
                Discover Chief of Staff opportunities across different sectors and industries.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {industries.map((industry) => (
                <Link
                  key={industry.id}
                  href={`/industries/${industry.id}`}
                  className="bg-white border border-gray-200 p-8 rounded-lg hover:shadow-lg transition"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {industry.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {industry.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Average Salary</div>
                      <div className="text-xl font-semibold text-gray-900">{industry.avgSalary}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Active Jobs</div>
                      <div className="text-xl font-semibold text-gray-900">{industry.jobs}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Top Firms:</span> {industry.topFirms.join(', ')}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Industry Insights
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-600 mb-6">
                Chief of Staff roles vary significantly by industry, with compensation ranging from 
                £95,000 in traditional sectors to over £180,000 in Private Equity.
              </p>
              <p className="text-lg text-gray-600">
                The most competitive roles are in financial services, where Chiefs of Staff often 
                transition to Partner or Managing Director positions within 2-3 years.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}