import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">TheChief</span>
            <span className="text-2xl font-light text-gray-600">.quest</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/locations" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Locations
            </Link>
            <Link href="/industries" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Industries
            </Link>
            <Link href="/agencies" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Agencies
            </Link>
            <Link href="/jobs" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Jobs
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              FAQ
            </Link>
          </nav>

          <button className="md:hidden">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}