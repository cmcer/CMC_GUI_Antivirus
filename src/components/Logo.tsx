interface LogoProps {
  className?: string
}

/** CMC shield mark — gradient shield with a white "C" arc. */
export default function Logo({ className = 'h-9 w-9' }: LogoProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cmc-shield" x1="6" y1="3" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B9CFF" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      {/* Shield body */}
      <path
        d="M22 2.5 L38 8.4 V22.5 C38 33 31 40.5 22 43.2 C13 40.5 6 33 6 22.5 V8.4 Z"
        fill="url(#cmc-shield)"
      />
      {/* Inner sheen */}
      <path
        d="M22 2.5 L38 8.4 V22.5 C38 33 31 40.5 22 43.2 Z"
        fill="#000000"
        opacity="0.10"
      />
      {/* C arc */}
      <path
        d="M28.6 15.8 A 8.6 8.6 0 1 0 28.6 32.2"
        stroke="#FFFFFF"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
