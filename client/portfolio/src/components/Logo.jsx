export default function Logo({ className = "", ring = "#1B4332", fg = "#B8860B" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill={ring} />
      <circle cx="32" cy="32" r="30" fill="none" stroke={fg} strokeWidth="1" opacity="0.5" />
      <path
        d="M20 40C20 24 30 17 44 17C44 33 36 40 20 40Z"
        fill="none"
        stroke={fg}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22.5 37.5C28 31 33 27 39.5 21.5" stroke={fg} strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <ellipse cx="26" cy="47" rx="4.2" ry="3.3" fill={fg} />
      <ellipse cx="20" cy="42" rx="1.7" ry="2.1" fill={fg} />
      <ellipse cx="23.6" cy="39.3" rx="1.7" ry="2.2" fill={fg} />
      <ellipse cx="28.4" cy="39.3" rx="1.7" ry="2.2" fill={fg} />
      <ellipse cx="32" cy="42" rx="1.7" ry="2.1" fill={fg} />
    </svg>
  );
}
