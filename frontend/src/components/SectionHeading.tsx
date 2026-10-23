interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  center?: boolean
  as?: 'h1' | 'h2'
}

export default function SectionHeading({ label, title, description, center = true, as = 'h2' }: SectionHeadingProps) {
  const HeadingTag = as
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-14 md:mb-16`}>
      <span className="section-label">{label}</span>
      <HeadingTag className="section-title">{title}</HeadingTag>
      {description && (
        <p className="section-desc mt-4 mx-auto">{description}</p>
      )}
    </div>
  )
}
