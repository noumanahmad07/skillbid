import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const PageWrapper = ({ children, className, bg = 'off' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "min-h-screen pt-[60px]",
        bg === 'white' ? 'bg-white' : 'bg-off'
      )}
    >
      <div className={cn("px-4 md:px-8 max-w-7xl mx-auto pb-20", className)}>
        {children}
      </div>
    </motion.div>
  );
};
