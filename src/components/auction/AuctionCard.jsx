import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Eye, TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatRs, formatTime, timerColorClass, progressPct } from '../../utils/formatters';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const AuctionCard = ({ auction, featured = false }) => {
  const { 
    id, 
    title, 
    student, 
    category, 
    currentBid, 
    timeLeft, 
    maxTime, 
    bidCount, 
    tags, 
    status 
  } = auction;

  const isEndingSoon = timeLeft > 0 && timeLeft < 600; // < 10 mins

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative bg-white border border-border rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl",
        featured && "border-indigo ring-1 ring-indigo/10",
        isEndingSoon && "border-red ring-1 ring-red/20 shadow-[0_0_20px_rgba(220,38,38,0.1)]"
      )}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center gap-3">
          <Avatar name={student.name} size={36} />
          <div>
            <p className="text-sm font-bold text-text leading-tight">{student.name}</p>
            <p className="text-[10px] text-muted font-bold uppercase tracking-tight">{student.university}</p>
          </div>
        </div>
        <Badge variant={featured ? 'indigo' : 'gray'} className="text-[10px]">{category}</Badge>
      </div>

      {/* Main Image (Insta Style) */}
      <div className="relative aspect-square overflow-hidden bg-off">
        <img 
          src={auction.image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Time Progress Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20 backdrop-blur-sm overflow-hidden">
          <motion.div 
            className={cn(
              "h-full",
              timeLeft > 1800 ? "bg-emerald" : timeLeft > 600 ? "bg-amber" : "bg-red"
            )}
            initial={{ width: '100%' }}
            animate={{ width: `${progressPct(timeLeft, maxTime)}%` }}
          />
        </div>
        
        {isEndingSoon && (
          <div className="absolute top-4 left-4">
            <Badge variant="danger" className="animate-pulse shadow-lg">Ending Soon</Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Title */}
        <Link to={`/auctions/${id}`}>
          <h3 className="text-lg font-display font-extrabold text-text mb-3 line-clamp-1 group-hover:text-indigo transition-colors">
            {title}
          </h3>
        </Link>
        
        {/* Bid Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 bg-off rounded-xl border border-border/50">
            <p className="text-[9px] uppercase font-bold text-muted mb-1 tracking-widest">Current Bid</p>
            <p className="text-base font-display font-black text-indigo">{formatRs(currentBid)}</p>
          </div>
          <div className="p-3 bg-off rounded-xl border border-border/50">
            <p className="text-[9px] uppercase font-bold text-muted mb-1 tracking-widest">Time Left</p>
            <p className={cn("text-base font-mono font-bold", timerColorClass(timeLeft))}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link to={`/auctions/${id}`} className="flex-1">
            <Button variant={isEndingSoon ? 'danger' : 'primary'} block size="md" className="rounded-xl shadow-indigo/20">
              {status === 'ended' ? 'View Details' : 'Place Bid'}
            </Button>
          </Link>
          <Link to={`/auctions/${id}`}>
            <Button variant="ghost" size="md" className="px-4 bg-off hover:bg-indigo-light rounded-xl">
              <Eye size={20} className="text-text2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Overlay */}
      {featured && (
        <div className="absolute top-12 right-0 bg-indigo text-white text-[9px] font-black px-3 py-1 rounded-l-full shadow-lg z-10 uppercase tracking-[2px]">
          Featured
        </div>
      )}

      {status === 'ended' && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20">
          <Badge variant="gray" className="px-6 py-2 text-sm shadow-xl border border-white">Auction Closed</Badge>
        </div>
      )}
    </motion.div>
  );
};
