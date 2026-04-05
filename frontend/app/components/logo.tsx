interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 36, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle - dark teal */}
      <circle cx="24" cy="24" r="24" fill="#142F32" />

      {/* Inner arc - lime accent, represents a learning path/orbit */}
      <path
        d="M14 24C14 18.477 18.477 14 24 14C29.523 14 34 18.477 34 24"
        stroke="#E3FFCC"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Graduation cap / book shape - stylized "S" path */}
      <path
        d="M18 28C18 28 20 24 24 24C28 24 30 28 30 28"
        stroke="#E3FFCC"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Dot - represents the student/starting point */}
      <circle cx="24" cy="34" r="2.5" fill="#E3FFCC" />
    </svg>
  )
}

export function LogoFull({
  size = 36,
  className,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <Logo size={size} />
      <span className="font-heading text-lg font-semibold">SmartCourse</span>
    </div>
  )
}
