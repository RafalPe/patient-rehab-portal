interface TooltipProps {
  children: React.ReactNode;
  label: string;
}

export const Tooltip = ({ children, label }: TooltipProps) => {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-800" />
      </span>
    </span>
  );
};
