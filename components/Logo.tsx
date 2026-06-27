export default function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.8 7.2 A 7.5 7.5 0 1 0 17.8 16.8" fill="none" stroke="#FF6A2C" strokeWidth="3" strokeLinecap="round" />
      <circle cx="13.4" cy="12" r="2.6" fill="#FF6A2C" />
    </svg>
  )
}
