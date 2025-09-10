import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { client } from '@/lib/sanity.client'

async function getFAQs() {
  const query = `*[_type == "faqContent"] | order(helpful desc) {
    _id,
    question,
    slug,
    shortAnswer,
    category,
    helpful,
    keywords
  }`
  
  return client.fetch(query)
}

export const metadata = {
  title: 'Chief of Staff FAQ | TheChief.quest',
  description: 'Frequently asked questions about Chief of Staff careers, salaries, skills, and career progression.',
}

export default async function FAQPage() {
  const faqs = await getFAQs()
  
  // Group FAQs by category
  const groupedFAQs = faqs?.reduce((acc: any, faq: any) => {
    const category = faq.category || 'general'
    if (!acc[category]) acc[category] = []
    acc[category].push(faq)
    return acc
  }, {})

  const categoryLabels: any = {
    general: 'General Questions',
    career: 'Career Path',
    salary: 'Salary & Compensation',
    skills: 'Skills & Requirements',
    application: 'Application Process',
    industry: 'Industry Specific',
  }

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
                <span className="text-gray-900">FAQ</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600">
                Everything you need to know about Chief of Staff careers.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {groupedFAQs && Object.keys(groupedFAQs).length > 0 ? (
                <div className="space-y-12">
                  {Object.entries(groupedFAQs).map(([category, questions]: [string, any]) => (
                    <div key={category}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {categoryLabels[category] || category}
                      </h2>
                      <div className="space-y-4">
                        {questions.map((faq: any) => (
                          <div key={faq._id} className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {faq.question}
                            </h3>
                            <p className="text-gray-600">
                              {faq.shortAnswer}
                            </p>
                            {faq.helpful > 0 && (
                              <div className="mt-3 text-sm text-gray-500">
                                {faq.helpful} people found this helpful
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">
                    Loading FAQs...
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Can't find what you're looking for? We're here to help.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}