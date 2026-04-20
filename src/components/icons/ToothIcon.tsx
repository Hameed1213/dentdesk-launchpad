interface ToothIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function ToothIcon({
  size = 22,
  color = "#2563EB",
  className,
}: ToothIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M7 3c-2.4 0-4.2 1.9-4.2 4.3 0 2 .6 3.6 1.4 6 .5 1.6.7 3.1.9 4.7.2 1.7.9 2.5 1.7 2.5.9 0 1.3-.8 1.7-2.5.4-1.7.7-3.1 1.5-3.1.8 0 1.1 1.4 1.5 3.1.4 1.7.8 2.5 1.7 2.5.8 0 1.5-.8 1.7-2.5.2-1.6.4-3.1.9-4.7.8-2.4 1.4-4 1.4-6C21.2 4.9 19.4 3 17 3c-1.6 0-2.5.8-3.2.8h-3.6C9.5 3.8 8.6 3 7 3Z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
