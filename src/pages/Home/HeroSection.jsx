import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useAuctionStore } from '../../store/auctionStore';

export const HeroSection = () => {
  const { auctions } = useAuctionStore();
  const liveCount = auctions.filter(a => a.status === 'live').length;

  return (
    <section className="relative pt-32 pb-32 overflow-hidden dot-grid">
      <div className="container mx-auto px-4 text-center">
        {/* Live Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-light rounded-full mb-8 border border-red/10"
        >
          <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
          <span className="text-xs font-bold text-red uppercase tracking-widest">● LIVE — {liveCount} auctions active</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[72px] font-display font-extrabold leading-[1.1] tracking-tight text-text mb-6"
        >
          Your Skill, <br />
          Your <span className="text-indigo italic">Market Price</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto text-lg md:text-xl text-text2 mb-12 font-body"
        >
          Pakistan's first talent auction marketplace where university students post skills and businesses bid in real-time.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
        >
          <Link to="/register">
            <Button size="lg" className="px-10 py-5 text-lg">Post your skill — free</Button>
          </Link>
          <Link to="/auctions">
            <Button variant="outline" size="lg" className="px-10 py-5 text-lg !bg-transparent">Browse live auctions</Button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border"
        >
          {[
            { label: 'Live Auctions', value: liveCount },
            { label: 'Active Students', value: '847' },
            { label: 'Total Paid Out', value: 'Rs. 12M+' },
            { label: 'Avg Rating', value: '4.8★' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-text mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 w-64 h-64 bg-indigo/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};
