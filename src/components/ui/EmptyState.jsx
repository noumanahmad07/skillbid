import { cn } from '../../utils/cn';
import { Button } from './Button';

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-12 border border-dashed border-border rounded-3xl bg-white",
      className
    )}>
      <div className="w-20 h-20 bg-off rounded-full flex items-center justify-center mb-6 text-muted">
        {Icon ? <Icon size={40} /> : <span className="text-4xl">empty</span>}
      </div>
      <h3 className="text-2xl font-display font-bold text-text mb-2">{title}</h3>
      <p className="text-text2 font-medium max-w-xs mb-8">{description}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};
