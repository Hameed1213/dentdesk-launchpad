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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M28 14C20 14 13 20 16 34C19 46 25 58 32 68C38 78 44 84 50 84C56 84 62 78 68 68C75 58 81 46 84 34C87 20 80 14 72 14C64 14 60 20 60 26C60 32 56 38 50 38C44 38 40 32 40 26C40 20 36 14 28 14Z"
        fill={color}
      />
    </svg>
  );
}
