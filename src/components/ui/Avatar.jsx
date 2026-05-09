import { cn } from '../../utils/cn';
import { pickColor, getInitials } from '../../utils/avatarColor';

export const Avatar = ({ name, src, size = 40, className, onClick }) => {
  const { bg, fg } = pickColor(name);
  
  const sizeClass = {
    32: 'w-8 h-8 text-xs',
    40: 'w-10 h-10 text-sm',
    48: 'w-12 h-12 text-base',
    64: 'w-16 h-16 text-xl',
    88: 'w-[88px] h-[88px] text-2xl',
  }[size] || 'w-10 h-10 text-sm';
  
  return (
    <div 
      className={cn(
        "rounded-full flex items-center justify-center font-display font-bold shrink-0 overflow-hidden select-none",
        sizeClass,
        onClick && "cursor-pointer hover:ring-2 hover:ring-indigo/20 transition-all",
        className
      )}
      style={{ backgroundColor: bg, color: fg }}
      onClick={onClick}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};
