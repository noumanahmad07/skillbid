import { cn } from '../../utils/cn';

export const Spinner = ({ className, size = 'md', color = 'indigo' }) => {
  const sizes = {
    xs: 'w-3 h-3 border-2',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };
  
  const colors = {
    indigo: 'border-indigo border-t-transparent',
    white: 'border-white border-t-transparent',
    emerald: 'border-emerald border-t-transparent',
  };
  
  return (
    <div 
      className={cn(
        "rounded-full animate-spin",
        sizes[size],
        colors[color],
        className
      )}
    />
  );
};
