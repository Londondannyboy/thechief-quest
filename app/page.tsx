import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                The Authority on <span className="text-blue-600">Chief of Staff</span> Careers
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find roles, salaries, and expert guidance across UK, Europe & Middle East.
                Join 50,000+ professionals advancing their careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/jobs"
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Browse Jobs
                </Link>
                <Link
                  href="/salary-guide"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition"
                >
                  Salary Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900">20+</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600">Active Jobs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">£120K</div>
                <div className="text-gray-600">Average Salary</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-gray-600">Monthly Visitors</div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Locations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Popular Locations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'London', country: 'UK', jobs: 234, avgSalary: '£150K' },
                { name: 'Dubai', country: 'UAE', jobs: 89, avgSalary: 'AED 600K' },
                { name: 'Zurich', country: 'Switzerland', jobs: 45, avgSalary: 'CHF 180K' },
                { name: 'Manchester', country: 'UK', jobs: 67, avgSalary: '£95K' },
                { name: 'Geneva', country: 'Switzerland', jobs: 34, avgSalary: 'CHF 165K' },
                { name: 'Edinburgh', country: 'UK', jobs: 42, avgSalary: '£85K' },
              ].map((location) => (
                <Link
                  key={location.name}
                  href={`/locations/${location.name.toLowerCase()}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {location.name}, {location.country}
                  </h3>
                  <div className="mt-2 text-gray-600">
                    <div>{location.jobs} active jobs</div>
                    <div>Avg: {location.avgSalary}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Industries We Cover
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                'Private Equity',
                'Hedge Funds',
                'Venture Capital',
                'Technology',
                'Startups',
                'Utilities',
              ].map((industry) => (
                <Link
                  key={industry}
                  href={`/industries/${industry.toLowerCase().replace(' ', '-')}`}
                  className="text-center py-4 px-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  {industry}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Advance Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get personalized job alerts and career insights
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}