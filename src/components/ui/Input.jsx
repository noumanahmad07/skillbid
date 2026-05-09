import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Input = forwardRef(({ 
  label, 
  error, 
  hint, 
  icon: Icon, 
  actionIcon: ActionIcon, 
  onActionClick,
  className, 
  id,
  ...props 
}, ref) => {
  const inputId = id || Math.random().toString(36).substr(2, 9);
  
  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-text2"
        >
          {label}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-indigo">
            <Icon size={18} />
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-white border border-border2 text-text rounded px-3.5 py-2.5 outline-none transition-all duration-200",
            "focus:border-indigo focus:ring-4 focus:ring-indigo/10",
            Icon && "pl-10",
            ActionIcon && "pr-10",
            error && "border-red focus:border-red focus:ring-red/10",
            props.disabled && "bg-off cursor-not-allowed opacity-60"
          )}
          {...props}
        />
        
        {ActionIcon && (
          <button
            type="button"
            onClick={onActionClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text2 transition-colors"
          >
            <ActionIcon size={18} />
          </button>
        )}
      </div>
      
      {error && <p className="text-xs text-red font-medium mt-1">{error}</p>}
      {hint && !error && <p className="text-xs text-muted mt-1">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';
