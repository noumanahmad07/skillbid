import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuctionStore } from '../../store/auctionStore';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { AuctionCard } from '../../components/auction/AuctionCard';
import { AuctionFilters } from '../../components/auction/AuctionFilters';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';

export default function Auctions() {
  const { auctions, filters, setFilters } = useAuctionStore();
  const [sortBy, setSortBy] = useState('soonest');

  const filteredAuctions = useMemo(() => {
    return auctions
      .filter(a => {
        const matchesCat = filters.cat === 'All' || a.category === filters.cat;
        const matchesQuery = a.title.toLowerCase().includes(filters.q.toLowerCase()) || 
                            a.description.toLowerCase().includes(filters.q.toLowerCase()) ||
                            a.tags.some(t => t.toLowerCase().includes(filters.q.toLowerCase()));
        return matchesCat && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'soonest') return a.timeLeft - b.timeLeft;
        if (sortBy === 'highest') return b.currentBid - a.currentBid;
        if (sortBy === 'bids') return b.bidCount - a.bidCount;
        return 0;
      });
  }, [auctions, filters, sortBy]);

  const liveCount = auctions.filter(a => a.status === 'live').length;

  return (
    <PageWrapper className="pt-12">
      {/* Sticky Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-display font-extrabold text-text">Live Auctions</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-light rounded-full border border-red/10">
              <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
              <span className="text-[10px] font-bold text-red uppercase tracking-widest">{liveCount} LIVE</span>
            </div>
          </div>
          <p className="text-text2 font-medium">Discover top university talent and bid in real-time.</p>
        </div>
        <Button variant="primary" size="lg">Post your skill</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28">
            <AuctionFilters filters={filters} onChange={setFilters} />
            
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Sort By</p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-border rounded-lg px-4 py-2 text-sm font-medium outline-none focus:border-indigo"
              >
                <option value="soonest">Ending Soonest</option>
                <option value="highest">Highest Bid</option>
                <option value="bids">Most Bids</option>
                <option value="newest">Newest Listed</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {filteredAuctions.length === 0 ? (
            <div className="bg-white border border-dashed border-border2 rounded-3xl p-20 text-center">
              <div className="text-5xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-text mb-2">No auctions found</h3>
              <p className="text-text2 mb-8">Try adjusting your filters or search terms.</p>
              <Button variant="outline" onClick={() => setFilters({ cat: 'All', q: '' })}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredAuctions.map((auction) => (
                  <motion.div
                    key={auction.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <AuctionCard auction={auction} featured={auction.featured} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
