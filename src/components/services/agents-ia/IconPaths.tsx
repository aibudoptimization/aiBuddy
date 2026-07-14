type IconPathsProps = {
  paths: string[];
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function IconPaths({
  paths,
  size = 24,
  strokeWidth = 1.7,
  className,
}: IconPathsProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
