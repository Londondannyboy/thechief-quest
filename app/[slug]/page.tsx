import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/lib/sanity.client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticleContent(slug: string) {
  try {
    
    // Try multiple queries to find the content
    // 1. First try by slug field
    let query = `*[_type == "chiefOfStaff" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      pageTitle,
      metaTitle,
      metaDescription,
      slug,
      content,
      tldr,
      publishedAt,
      author->{
        name,
        role
      }
    }`
    
    let content = await client.fetch(query, { slug })
    
    // 2. Try by title match (case insensitive)
    if (!content) {
      query = `*[_type == "chiefOfStaff" && (
        lower(metaTitle) match $searchPattern ||
        lower(pageTitle) match $searchPattern ||
        lower(title) match $searchPattern
      )][0] {
        _id,
        _type,
        title,
        pageTitle,
        metaTitle,
        metaDescription,
        slug,
        content,
        tldr,
        publishedAt,
        author->{
          name,
          role
        }
      }`
      
      // Create search pattern from slug
      const searchPattern = slug.toLowerCase().replace(/-/g, '*')
      content = await client.fetch(query, { searchPattern: `*${searchPattern}*` })
    }
    
    // 3. Try featuredContent by sectionKey
    if (!content) {
      query = `*[_type == "featuredContent" && sectionKey.current == $slug][0] {
        _id,
        _type,
        title,
        "pageTitle": title,
        "metaTitle": title,
        "metaDescription": title,
        "slug": sectionKey,
        "content": title,
        "tldr": title,
        publishedAt,
        author->{
          name,
          role
        }
      }`
      content = await client.fetch(query, { slug })
    }
    
    return content
  } catch (error) {
    console.error('Error fetching article content:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const content = await getArticleContent(slug)
  
  if (!content) {
    return {
      title: 'Page Not Found - TheChief.quest',
      description: 'The requested page could not be found.'
    }
  }
  
  return {
    title: content.metaTitle || content.title || content.pageTitle || 'TheChief.quest',
    description: content.metaDescription || content.tldr || 'Expert insights on Chief of Staff careers',
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const content = await getArticleContent(slug)
  
  if (!content) {
    notFound()
  }
  
  // Format the content for display
  const pageTitle = content.title || content.pageTitle || 'Article'
  // Ensure content is a string
  const pageContent = typeof content.content === 'string' ? content.content : 
                     (Array.isArray(content.content) ? content.content.map((block: { _type: string; children?: Array<{ text: string }> }) => 
                       block._type === 'block' && block.children ? 
                       block.children.map((child: { text: string }) => child.text).join('') : '').join('\n\n') : 
                     '')
  const author = content.author?.name || 'TheChief.quest Team'
  const publishDate = content.publishedAt ? new Date(content.publishedAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="text-sm mb-6">
                <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-white">{pageTitle}</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {pageTitle}
              </h1>
              
              {content.tldr && (
                <p className="text-xl text-gray-200 mb-6">
                  {content.tldr}
                </p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>By {author}</span>
                {publishDate && (
                  <>
                    <span>•</span>
                    <span>{publishDate}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                {pageContent.split('\n\n').map((paragraph: string, index: number) => {
                  // Check if it's a heading
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    )
                  } else if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    )
                  } else if (paragraph.startsWith('- ')) {
                    // Handle bullet points
                    const items = paragraph.split('\n').filter(item => item.startsWith('- '))
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    )
                  } else if (paragraph.trim()) {
                    return (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  }
                  return null
                })}
              </article>
              
              {/* Related Content */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link href="/locations" className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <h3 className="font-semibold text-gray-900 mb-2">Explore by Location</h3>
                    <p className="text-gray-600">Find Chief of Staff opportunities in major cities</p>
                  </Link>
                  <Link href="/industries" className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <h3 className="font-semibold text-gray-900 mb-2">Browse Industries</h3>
                    <p className="text-gray-600">Discover roles across different sectors</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Find Your Next Chief of Staff Role?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get notified about new opportunities as they become available
            </p>
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
              Join Our Network
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}