import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Award, Zap, Sparkles } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { formatRs } from '../../utils/formatters';
import { cn } from '../../utils/cn';

const leaders = [
  { rank: 1, name: 'Ayesha Raza', university: 'LUMS', earned: 84200, progress: 90 },
  { rank: 2, name: 'Bilal Ahmed', university: 'FAST', earned: 62400, progress: 75 },
  { rank: 3, name: 'Sara Malik', university: 'Beaconhouse', earned: 45000, progress: 60 },
  { rank: 4, name: 'Hassan Tariq', university: 'NUST', earned: 38200, progress: 50 },
  { rank: 5, name: 'Fatima Noor', university: 'IBA', earned: 31000, progress: 40 },
];

const feedEvents = [
  { id: 1, type: 'bid', user: 'Zaid', text: 'placed a bid on logo design', time: '2m ago' },
  { id: 2, type: 'won', user: 'Umar', text: 'won "React App" auction', time: '5m ago' },
  { id: 3, type: 'new', user: 'Mariam', text: 'listed a new video skill', time: '12m ago' },
];

export const LiveFeedSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Leaderboard Preview */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-text flex items-center gap-2">
                <Award className="text-indigo" /> Top Students
              </h2>
              <button className="text-sm font-bold text-indigo hover:underline">Full leaderboard →</button>
            </div>
            <div className="space-y-4">
              {leaders.map((leader) => (
                <div key={leader.rank} className="flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-off transition-colors group">
                  <div className="w-8 h-8 flex items-center justify-center font-display font-black text-indigo bg-indigo-light rounded-full text-xs">
                    {leader.rank}
                  </div>
                  <Avatar name={leader.name} size={40} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-text">{leader.name}</p>
                    <p className="text-[10px] text-muted font-bold uppercase">{leader.university}</p>
                    <div className="w-full h-1 bg-off2 rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${leader.progress}%` }}
                        className="h-full bg-indigo"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-display font-bold text-emerald">{formatRs(leader.earned)}</p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-tighter">Total Earned</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Feed */}
          <div className="bg-off rounded-2xl p-8 border border-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-text flex items-center gap-2">
                <TrendingUp className="text-indigo" /> Live Activity
              </h2>
              <Badge variant="red" className="pulse-red">Real-time</Badge>
            </div>
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {feedEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4"
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      event.type === 'bid' ? "bg-amber-light text-amber" : 
                      event.type === 'won' ? "bg-emerald-light text-emerald" : 
                      "bg-indigo-light text-indigo"
                    )}>
                      {event.type === 'bid' ? <Zap size={18} /> : 
                       event.type === 'won' ? <Award size={18} /> : 
                       <Sparkles size={18} />}
                    </div>
                    <div>
                      <p className="text-sm text-text2 leading-tight">
                        <span className="font-bold text-text">{event.user}</span> {event.text}
                      </p>
                      <p className="text-[11px] text-muted font-medium mt-1 uppercase tracking-wider">{event.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="pt-4 border-t border-border mt-4 text-center">
                <p className="text-[11px] text-muted font-bold uppercase tracking-widest animate-pulse">Syncing events...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
