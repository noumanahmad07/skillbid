import { motion } from 'framer-motion';
import { Award, TrendingUp, Star, Briefcase } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatRs } from '../../utils/formatters';
import { cn } from '../../utils/cn';

const leaders = [
  { rank: 1, name: 'Ayesha Raza', university: 'LUMS', skills: ['Design', 'Figma'], jobs: 24, rating: 4.9, earned: 142000 },
  { rank: 2, name: 'Bilal Ahmed', university: 'FAST NUCES', skills: ['React', 'Node'], jobs: 18, rating: 4.8, earned: 115000 },
  { rank: 3, name: 'Sara Malik', university: 'Beaconhouse', skills: ['Video', 'AE'], jobs: 21, rating: 4.7, earned: 98000 },
  { rank: 4, name: 'Hassan Tariq', university: 'NUST', skills: ['Mobile', 'Flutter'], jobs: 14, rating: 4.9, earned: 85200 },
  { rank: 5, name: 'Fatima Noor', university: 'IBA Karachi', skills: ['Writing', 'B-Plan'], jobs: 16, rating: 4.6, earned: 72000 },
  { rank: 6, name: 'Omar Sheikh', university: 'Punjab Uni', skills: ['Graphics', 'Logo'], jobs: 12, rating: 4.5, earned: 64000 },
  { rank: 7, name: 'Zara Hussain', university: 'Kinnaird', skills: ['Photo', 'Editing'], jobs: 10, rating: 4.8, earned: 58000 },
  { rank: 8, name: 'Ali Baig', university: 'COMSATS', skills: ['Web', 'WP'], jobs: 15, rating: 4.4, earned: 52000 },
];

export default function Leaderboard() {
  return (
    <PageWrapper className="pt-12">
      <div className="text-center mb-16">
        <span className="text-indigo font-mono font-bold uppercase tracking-widest text-xs">Rankings</span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-text mt-4 mb-4">Top Earners</h1>
        <p className="text-text2 font-medium max-w-xl mx-auto">Celebrating the best performing students on SkillBid this month.</p>
      </div>

      <Card padding="none" className="overflow-hidden mb-12 shadow-lg border-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-off border-b border-border">
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Rank</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Skills</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Jobs</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Rating</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Total Earned</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leaders.map((leader, i) => (
                <motion.tr 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(
                    "hover:bg-off/50 transition-colors group",
                    i === 0 && "bg-amber-light/10 border-l-4 border-l-amber",
                    i === 1 && "bg-slate-50 border-l-4 border-l-slate-400",
                    i === 2 && "bg-orange-50 border-l-4 border-l-orange-400"
                  )}
                >
                  <td className="px-6 py-6">
                    <span className={cn(
                      "text-xl font-display font-black",
                      i === 0 ? "text-amber" : i === 1 ? "text-slate-400" : i === 2 ? "text-orange-400" : "text-dim"
                    )}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <Avatar name={leader.name} size={40} />
                      <div>
                        <p className="font-bold text-text group-hover:text-indigo transition-colors">{leader.name}</p>
                        <p className="text-[10px] text-muted font-bold uppercase">{leader.university}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex gap-1.5">
                      {leader.skills.map(skill => (
                        <Badge key={skill} variant="gray" className="text-[9px]">{skill}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-mono font-bold text-text2">
                    {leader.jobs}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber fill-amber" />
                      <span className="text-sm font-bold text-text2">{leader.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-display font-bold text-emerald text-lg">
                    {formatRs(leader.earned)}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <Button variant="ghost" size="sm">View profile →</Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
}

