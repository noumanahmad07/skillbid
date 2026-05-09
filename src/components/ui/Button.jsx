import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Spinner } from './Spinner';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled, 
  loading, 
  icon: Icon, 
  iconRight: IconRight,
  block,
  className,
  ...props 
}) => {
  const variants = {
    primary: 'bg-indigo text-white hover:bg-indigo2 shadow-sm hover:shadow-md',
    outline: 'border border-border2 text-text2 hover:border-indigo hover:text-indigo bg-white',
    ghost: 'text-text2 hover:bg-off2',
    danger: 'bg-red text-white hover:bg-red-700',
    success: 'bg-emerald text-white hover:bg-emerald-700',
  };
  
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs rounded-sm',
    sm: 'px-3.5 py-2 text-sm rounded',
    md: 'px-5 py-2.5 text-sm font-medium rounded',
    lg: 'px-7 py-3.5 text-base font-semibold rounded-lg',
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={cn(
        "inline-flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        block && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" color={variant === 'primary' ? 'white' : 'indigo'} className="mr-2" />
      ) : Icon && (
        <Icon className={cn("mr-2", size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />
      )}
      
      {children}
      
      {!loading && IconRight && (
        <IconRight className={cn("ml-2", size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />
      )}
    </motion.button>
  );
};
