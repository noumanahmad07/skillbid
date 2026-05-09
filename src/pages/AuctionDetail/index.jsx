import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Shield, MessageCircle, AlertCircle, Info, Clock } from 'lucide-react';
import { useAuctionStore } from '../../store/auctionStore';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { formatRs, formatTime, timerColorClass, progressPct } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export default function AuctionDetail() {
  const { id } = useParams();
  const { auctions, placeBidOptimistic } = useAuctionStore();
  const { user, isAuthenticated } = useAuthStore();
  const { addToast } = useUIStore();
  
  const auction = auctions.find(a => a.id === id);

  if (!auction) {
    return (
      <PageWrapper className="flex flex-col items-center justify-center py-32">
        <h1 className="text-3xl font-display font-bold mb-4">Auction not found</h1>
        <Link to="/auctions">
          <Button variant="primary">Back to Auctions</Button>
        </Link>
      </PageWrapper>
    );
  }

  const { title, student, category, currentBid, timeLeft, maxTime, bids, bidCount, tags, description, status } = auction;
  const isOwner = user?.id === student.id;
  const isEnded = status === 'ended';

  return (
    <PageWrapper className="pt-8">
      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/auctions" className="flex items-center gap-2 text-sm font-bold text-muted hover:text-indigo transition-colors">
          <ChevronLeft size={16} /> Back to Live Auctions
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" icon={Share2}>Share</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Card */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="indigo">{category}</Badge>
              {isEnded ? <Badge variant="gray">Auction Ended</Badge> : <Badge variant="emerald" className="pulse-red">Live Auction</Badge>}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-text leading-tight">
              {title}
            </h1>

            <div className="w-full h-1.5 bg-off2 rounded-full overflow-hidden">
              <motion.div 
                className={cn("h-full", timerColorClass(timeLeft).replace('text-', 'bg-'))}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct(timeLeft, maxTime)}%` }}
              />
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-3 bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 text-center border-r border-border">
                <p className="text-[11px] font-bold text-muted uppercase mb-1">Current Bid</p>
                <p className="text-2xl font-display font-bold text-indigo">{formatRs(currentBid)}</p>
              </div>
              <div className="p-6 text-center border-r border-border">
                <p className="text-[11px] font-bold text-muted uppercase mb-1">Time Remaining</p>
                <p className={cn("text-2xl font-mono font-bold", timerColorClass(timeLeft))}>
                  {formatTime(timeLeft)}
                </p>
              </div>
              <div className="p-6 text-center">
                <p className="text-[11px] font-bold text-muted uppercase mb-1">Total Bids</p>
                <p className="text-2xl font-mono font-bold text-text2">{bidCount}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card padding="lg" className="space-y-6">
            <h2 className="text-xl font-bold text-text">Service Details</h2>
            <p className="text-text2 leading-relaxed whitespace-pre-line">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {tags.map((tag, i) => (
                <Badge key={i} variant="gray">#{tag}</Badge>
              ))}
            </div>
          </Card>

          {/* Bid History */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-text">Bid History</h2>
            <div className="space-y-3">
              {bids && bids.length > 0 ? (
                bids.map((bid, i) => (
                  <motion.div 
                    key={bid.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all",
                      i === 0 ? "bg-indigo-light/30 border-indigo shadow-sm" : "bg-white border-border"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={bid.bidderName} size={32} />
                      <div>
                        <p className="text-sm font-bold text-text">
                          {bid.bidderName} 
                          {i === 0 && <span className="ml-2 text-[10px] bg-indigo text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Top Bid</span>}
                        </p>
                        <p className="text-[10px] text-muted font-medium uppercase tracking-wider">{new Date(bid.time).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <p className="text-lg font-display font-bold text-indigo">{formatRs(bid.amount)}</p>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white border border-dashed border-border p-8 rounded-xl text-center text-muted italic">
                  No bids yet. Be the first to bid!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Bid Panel */}
          <Card className={cn("sticky top-28 border-2 shadow-lg", isEnded ? "border-border" : "border-indigo")}>
            {isEnded ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-off rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} className="text-muted" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">Auction Closed</h3>
                <p className="text-sm text-text2 mb-6">This auction has ended. You can no longer place bids.</p>
                <Link to="/auctions">
                  <Button variant="outline" block>View other auctions</Button>
                </Link>
              </div>
            ) : isOwner ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-indigo-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info size={32} className="text-indigo" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">Your Auction</h3>
                <p className="text-sm text-text2 mb-6">You are the owner of this auction. Monitor bids from your dashboard.</p>
                <Link to="/dashboard">
                  <Button variant="primary" block>Go to Dashboard</Button>
                </Link>
              </div>
            ) : !isAuthenticated ? (
              <div className="text-center py-6">
                <h3 className="text-xl font-bold text-text mb-2">Want to bid?</h3>
                <p className="text-sm text-text2 mb-6">Log in or create an account to start bidding on this skill.</p>
                <div className="space-y-3">
                  <Link to="/login"><Button variant="primary" block>Log In</Button></Link>
                  <Link to="/register"><Button variant="outline" block>Register</Button></Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-indigo-light rounded-xl border border-indigo/20">
                  <p className="text-[11px] font-bold text-indigo uppercase tracking-widest mb-1">Minimum next bid</p>
                  <p className="text-2xl font-display font-bold text-indigo">{formatRs(Math.ceil(currentBid * 1.1))}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-text2 mb-1.5">Your Bid Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-text2">Rs.</span>
                      <input 
                        type="number" 
                        defaultValue={Math.ceil(currentBid * 1.1)}
                        className="w-full bg-off border border-border rounded-xl pl-12 pr-4 py-3 font-mono font-bold outline-none focus:border-indigo"
                      />
                    </div>
                  </div>
                  <Button variant="primary" block size="lg" onClick={() => {
                    addToast("Bid placed successfully! 🚀", "success");
                  }}>Place Bid Now</Button>
                  <p className="text-[10px] text-center text-muted font-medium uppercase tracking-tighter">
                    By bidding you agree to the platform's escrow terms.
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Student Info */}
          <Card className="space-y-6">
            <p className="text-[11px] font-bold text-muted uppercase tracking-widest">About the student</p>
            <div className="flex items-center gap-4">
              <Avatar name={student.name} size={64} />
              <div>
                <h3 className="text-lg font-bold text-text">{student.name}</h3>
                <p className="text-sm text-indigo font-bold">{student.university}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-amber">★</span>
                  <span className="text-sm font-bold text-text2">{student.rating}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-text2 leading-relaxed">
              Top-rated student specializing in {category.toLowerCase()} and digital solutions.
            </p>
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
              <div className="text-center">
                <p className="text-lg font-display font-bold text-text">12</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-tighter">Jobs Done</p>
              </div>
              <div className="text-center border-l border-border">
                <p className="text-lg font-display font-bold text-emerald">Rs. 24k</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-tighter">Earned</p>
              </div>
            </div>
            <Button variant="outline" block icon={MessageCircle}>Message Student</Button>
          </Card>

          {/* Delivery & Protection */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-emerald-light/50 border border-emerald/10 rounded-xl">
              <Shield className="text-emerald" size={24} />
              <div>
                <p className="text-sm font-bold text-emerald">Escrow Protected</p>
                <p className="text-[10px] text-emerald/70 font-medium">Payment released only after delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-off2 border border-border rounded-xl">
              <Clock className="text-text2" size={24} />
              <div>
                <p className="text-sm font-bold text-text2">{auction.deliveryTime} Delivery</p>
                <p className="text-[10px] text-muted font-medium">Includes 2 revisions</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageWrapper>
  );
}

