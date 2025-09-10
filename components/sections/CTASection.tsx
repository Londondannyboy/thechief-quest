interface CTASectionProps {
  title: string
  description?: string
  buttonText?: string
  buttonAction?: () => void
  variant?: 'blue' | 'gray' | 'gradient'
}

export default function CTASection({
  title,
  description,
  buttonText = 'Join Our Network',
  buttonAction,
  variant = 'blue'
}: CTASectionProps) {
  const bgClass = {
    blue: 'bg-blue-600',
    gray: 'bg-gray-900',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600'
  }[variant]

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-xl text-blue-100 mb-8">
            {description}
          </p>
        )}
        <button 
          onClick={buttonAction}
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          {buttonText}
        </button>
      </div>
    </section>
  )
}