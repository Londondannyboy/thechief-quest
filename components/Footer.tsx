import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">TheChief.quest</h3>
            <p className="text-sm">
              The authority on Chief of Staff careers across UK, Europe & Middle East.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Locations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/locations/london" className="hover:text-white">London</Link></li>
              <li><Link href="/locations/dubai" className="hover:text-white">Dubai</Link></li>
              <li><Link href="/locations/zurich" className="hover:text-white">Zurich</Link></li>
              <li><Link href="/locations" className="hover:text-white">View All →</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/industries/private-equity" className="hover:text-white">Private Equity</Link></li>
              <li><Link href="/industries/hedge-funds" className="hover:text-white">Hedge Funds</Link></li>
              <li><Link href="/industries/venture-capital" className="hover:text-white">Venture Capital</Link></li>
              <li><Link href="/industries" className="hover:text-white">View All →</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/agencies" className="hover:text-white">Recruitment Agencies</Link></li>
              <li><Link href="/salary-guide" className="hover:text-white">Salary Guide</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 TheChief.quest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}