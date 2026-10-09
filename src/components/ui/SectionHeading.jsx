
export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  className = '',
}) {
  return (
    <div className={`space-y-3 ${center ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}