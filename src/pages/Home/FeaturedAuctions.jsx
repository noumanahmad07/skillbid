import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuctionStore } from '../../store/auctionStore';
import { AuctionCard } from '../../components/auction/AuctionCard';
import { Button } from '../../components/ui/Button';

export const FeaturedAuctions = () => {
  const { auctions } = useAuctionStore();
  const featured = auctions.filter(a => a.featured).slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-indigo font-mono font-bold uppercase tracking-widest text-xs">Hot right now</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mt-2">Featured Auctions</h2>
          </div>
          <Link to="/auctions">
            <Button variant="outline" className="hidden md:flex">See all auctions →</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((auction, i) => (
            <motion.div
              key={auction.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <AuctionCard auction={auction} featured />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Link to="/auctions" className="w-full">
            <Button variant="outline" block>See all auctions →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
