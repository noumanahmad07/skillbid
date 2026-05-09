import { cn } from '../../utils/cn';

export const Badge = ({ children, variant = 'gray', icon: Icon, className }) => {
  const variants = {
    indigo: 'bg-indigo-light text-indigo',
    emerald: 'bg-emerald-light text-emerald',
    amber: 'bg-amber-light text-amber',
    red: 'bg-red-light text-red',
    gray: 'bg-off2 text-muted',
  };
  
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-mono font-medium tracking-wide uppercase",
      variants[variant],
      className
    )}>
      {Icon && <Icon size={12} className="mr-1" />}
      {children}
    </span>
  );
};
