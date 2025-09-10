import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface HeroSectionProps {
  breadcrumbs?: BreadcrumbItem[]
  title: string
  subtitle?: string
  description?: string
  stats?: Array<{
    value: string | number
    label: string
  }>
  variant?: 'gradient' | 'solid' | 'light'
}

export default function HeroSection({
  breadcrumbs,
  title,
  subtitle,
  description,
  stats,
  variant = 'gradient'
}: HeroSectionProps) {
  const bgClass = {
    gradient: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
    solid: 'bg-gray-900 text-white',
    light: 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
  }[variant]

  const textColorClass = variant === 'light' ? 'text-gray-600' : 'text-gray-300'
  const breadcrumbHoverClass = variant === 'light' ? 'hover:text-gray-900' : 'hover:text-white'

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="text-sm mb-6">
              {breadcrumbs.map((item, index) => (
                <span key={index}>
                  {item.href ? (
                    <Link href={item.href} className={`${textColorClass} ${breadcrumbHoverClass}`}>
                      {item.label}
                    </Link>
                  ) : (
                    <span className={variant === 'light' ? 'text-gray-900' : 'text-white'}>
                      {item.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="mx-2 text-gray-400">/</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className={`text-xl ${variant === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-4`}>
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className={`text-lg ${textColorClass} mb-8`}>
              {description}
            </p>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={textColorClass}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}