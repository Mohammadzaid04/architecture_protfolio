type LogoProps = {
  size?: number;
};

export default function Logo({ size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="46" height="46" rx="12" fill="currentColor" />
      <path
        d="M12 36 L24 11 L36 36"
        stroke="#F5F3EE"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 28 H30.5"
        stroke="#F5F3EE"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Logo };
