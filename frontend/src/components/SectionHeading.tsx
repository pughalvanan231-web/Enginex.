interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  center?: boolean
}

export default function SectionHeading({ label, title, description, center = true }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-14 md:mb-16`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className="section-desc mt-4 mx-auto">{description}</p>
      )}
    </div>
  )
}
