import { cn } from '../../utils/cn';

export const Card = ({ 
  children, 
  padding = 'md', 
  hover = false, 
  className 
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={cn(
      "bg-white border border-border rounded-lg transition-all duration-300",
      hover && "hover:shadow-lg hover:-translate-y-1 hover:border-border2",
      paddings[padding],
      className
    )}>
      {children}
    </div>
  );
};
