import { motion } from 'framer-motion';
import { Gavel, Trophy, Timer, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAuctionStore } from '../../store/auctionStore';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatRs, formatTime, timerColorClass } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export default function MyBids() {
  const { user } = useAuthStore();
  const { auctions } = useAuctionStore();

  // Mock buyer data (in real app, this would come from a service)
  const myBidData = [
    { auctionId: 'a1', myMaxBid: 4200, status: 'leading' },
    { auctionId: 'a2', myMaxBid: 6500, status: 'outbid' },
    { auctionId: 'a5', myMaxBid: 3100, status: 'leading' },
  ];

  const enrichedBids = myBidData.map(bid => ({
    ...bid,
    auction: auctions.find(a => a.id === bid.auctionId)
  })).filter(b => b.auction);

  const activeBids = enrichedBids.filter(b => b.auction.status === 'live');
  const wonAuctions = enrichedBids.filter(b => b.auction.status === 'ended' && b.status === 'leading');

  return (
    <PageWrapper className="pt-12">
      <div className="mb-12">
        <p className="text-[11px] font-mono font-bold text-muted uppercase tracking-widest mb-2">Buyer Dashboard</p>
        <h1 className="text-4xl font-display font-extrabold text-text">My Bids</h1>
        <p className="text-text2 font-medium">Track your active bids and won auctions.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white border border-border rounded-2xl p-8 flex items-center gap-6 shadow-sm">
          <div className="w-14 h-14 bg-indigo-light rounded-full flex items-center justify-center text-indigo">
            <Gavel size={28} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-text">{enrichedBids.length}</p>
            <p className="text-xs font-bold text-muted uppercase tracking-widest">Auctions Bid On</p>
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 flex items-center gap-6 shadow-sm">
          <div className="w-14 h-14 bg-emerald-light rounded-full flex items-center justify-center text-emerald">
            <Trophy size={28} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-emerald">{wonAuctions.length}</p>
            <p className="text-xs font-bold text-muted uppercase tracking-widest">Auctions Won</p>
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 flex items-center gap-6 shadow-sm">
          <div className="w-14 h-14 bg-amber-light rounded-full flex items-center justify-center text-amber">
            <Timer size={28} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-amber">{activeBids.length}</p>
            <p className="text-xs font-bold text-muted uppercase tracking-widest">Active Bids</p>
          </div>
        </div>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-off border-b border-border">
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Auction</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">My Bid</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Current Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {enrichedBids.length > 0 ? (
                enrichedBids.map((bid) => (
                  <tr key={bid.auctionId} className="hover:bg-off/50 transition-colors group">
                    <td className="px-6 py-6">
                      <Link to={`/auctions/${bid.auctionId}`} className="font-bold text-text hover:text-indigo transition-colors line-clamp-1">
                        {bid.auction.title}
                      </Link>
                      <p className="text-[10px] text-muted font-bold uppercase mt-1">{bid.auction.category}</p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-light text-indigo text-[10px] flex items-center justify-center font-bold">
                          {bid.auction.student.name[0]}
                        </div>
                        <span className="text-sm font-medium text-text2">{bid.auction.student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-mono font-bold text-text">
                      {formatRs(bid.myMaxBid)}
                    </td>
                    <td className="px-6 py-6 font-mono font-bold text-indigo">
                      {formatRs(bid.auction.currentBid)}
                    </td>
                    <td className="px-6 py-6">
                      <Badge variant={
                        bid.status === 'leading' ? 'emerald' : 
                        bid.status === 'outbid' ? 'amber' : 'gray'
                      }>
                        {bid.status === 'leading' ? 'Leading' : 
                         bid.status === 'outbid' ? 'Outbid' : 'Ended'}
                      </Badge>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <Link to={`/auctions/${bid.auctionId}`}>
                        <Button variant="outline" size="sm" iconRight={ExternalLink}>View</Button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-text2 font-medium mb-6">No bids yet</p>
                    <Link to="/auctions">
                      <Button variant="primary">Browse Live Auctions</Button>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
}
