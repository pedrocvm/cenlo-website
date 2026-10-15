export default function Logo({ size = 28, arc = 'currentColor', dot = '#F26522' }: { size?: number; arc?: string; dot?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path className="logo-arc" d="M35.4 17.1 A13.2 13.2 0 1 0 35.4 30.9" fill="none" stroke={arc} strokeWidth="5.1" strokeLinecap="round" />
      <circle className="logo-dot" cx="26.6" cy="24" r="5.7" fill={dot} />
    </svg>
  )
}
