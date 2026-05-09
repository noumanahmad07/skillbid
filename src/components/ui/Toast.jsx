import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Toast = ({ id, message, type, onRemove }) => {
  const icons = {
    success: <CheckCircle className="text-emerald shrink-0" size={20} />,
    error: <XCircle className="text-red shrink-0" size={20} />,
    info: <Info className="text-indigo shrink-0" size={20} />,
    warning: <AlertTriangle className="text-amber shrink-0" size={20} />,
  };
  
  const backgrounds = {
    success: 'border-emerald/20 bg-emerald-light/50',
    error: 'border-red/20 bg-red-light/50',
    info: 'border-indigo/20 bg-indigo-light/50',
    warning: 'border-amber/20 bg-amber-light/50',
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      className={cn(
        "flex items-center gap-3 min-w-[300px] max-w-md p-4 rounded-xl border shadow-lg glass",
        backgrounds[type]
      )}
    >
      {icons[type]}
      <p className="flex-1 text-sm font-medium text-text">{message}</p>
      <button 
        onClick={() => onRemove(id)}
        className="p-1 hover:bg-black/5 rounded-md transition-colors"
      >
        <X size={16} className="text-muted" />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onRemove={onRemove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
