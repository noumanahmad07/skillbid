import { motion } from 'framer-motion';
import { Plus, Briefcase, Zap, DollarSign, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAuctionStore } from '../../store/auctionStore';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatRs, formatTime, timerColorClass } from '../../utils/formatters';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../utils/cn';

const chartData = [
  { name: 'Jan', earnings: 4500 },
  { name: 'Feb', earnings: 12000 },
  { name: 'Mar', earnings: 8500 },
  { name: 'Apr', earnings: 18000 },
  { name: 'May', earnings: 24500 },
  { name: 'Jun', earnings: 21000 },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const { auctions } = useAuctionStore();

  const myAuctions = auctions.filter(a => a.status === 'live'); // In real app, filter by student ID
  const totalBids = myAuctions.reduce((sum, a) => sum + a.bidCount, 0);
  const potentialEarnings = myAuctions.reduce((sum, a) => sum + a.currentBid, 0);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <PageWrapper className="pt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[11px] font-mono font-bold text-muted uppercase tracking-widest mb-2">Student Dashboard</p>
          <h1 className="text-4xl font-display font-extrabold text-text">
            {getTimeGreeting()}, {user?.name.split(' ')[0]} 👋
          </h1>
        </div>
        <Link to="/post-auction">
          <Button variant="primary" size="lg" icon={Plus}>Post new skill</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <StatCard label="Live Auctions" value={myAuctions.length} icon={Briefcase} color="indigo" />
        <StatCard label="Bids Received" value={totalBids} icon={Zap} color="amber" />
        <StatCard label="Potential Earnings" value={formatRs(potentialEarnings)} icon={DollarSign} color="emerald" />
        <StatCard label="Completed Jobs" value={user?.jobsDone || 0} icon={CheckCircle} color="indigo" />
        <StatCard label="Avg Rating" value={(user?.rating || 0) + ' ★'} icon={Star} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Auctions List */}
        <div className="lg:col-span-2 space-y-8">
          <Card padding="lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-text">Active Listings</h2>
              <Link to="/auctions" className="text-sm font-bold text-indigo hover:underline">View all</Link>
            </div>
            
            <div className="space-y-4">
              {myAuctions.length > 0 ? (
                myAuctions.map((auction) => (
                  <div key={auction.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-xl hover:bg-off transition-colors gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-text mb-1 truncate max-w-[300px]">{auction.title}</h3>
                      <div className="flex items-center gap-3">
                        <Badge variant="gray">{auction.bidCount} Bids</Badge>
                        <div className="flex items-center gap-1.5">
                          <span className={cn("w-2 h-2 rounded-full", timerColorClass(auction.timeLeft).replace('text-', 'bg-'))} />
                          <span className={cn("text-[11px] font-mono font-bold", timerColorClass(auction.timeLeft))}>
                            {formatTime(auction.timeLeft)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-muted uppercase tracking-tighter">Current Bid</p>
                        <p className="text-lg font-display font-bold text-indigo">{formatRs(auction.currentBid)}</p>
                      </div>
                      <Link to={`/auctions/${auction.id}`}>
                        <Button variant="outline" size="sm" iconRight={ArrowRight}>View</Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">💼</div>
                  <p className="text-text2 font-medium mb-4">No live auctions yet</p>
                  <Link to="/post-auction">
                    <Button variant="primary">Post your first skill</Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>

          {/* Earnings Chart */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-text">Earnings Overview</h2>
              <Badge variant="emerald">Last 6 Months</Badge>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3d52d5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3d52d5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e1db" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 600, fill: '#8a8680' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 600, fill: '#8a8680' }} 
                    tickFormatter={(val) => `Rs.${val/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                    formatter={(val) => [formatRs(val), 'Earnings']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#3d52d5" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorEarnings)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card padding="lg" className="bg-indigo text-white border-none shadow-indigo/20">
            <h3 className="text-lg font-display font-bold mb-2">Grow your earnings</h3>
            <p className="text-indigo-mid text-sm mb-6">Complete 5 more jobs with 4.5+ rating to unlock "Premium Student" badge.</p>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-white w-3/5" />
            </div>
            <Button className="bg-white text-indigo hover:bg-off2 w-full">View Tips</Button>
          </Card>

          <Card padding="lg">
            <h2 className="text-lg font-bold text-text mb-6">Recent Sales</h2>
            <div className="space-y-6">
              {[
                { title: 'Logo Design', winner: 'Ali H.', price: 4200, date: '2d ago' },
                { title: 'React Fix', winner: 'Sarah K.', price: 1500, date: '4d ago' },
                { title: 'Copywriting', winner: 'Zain A.', price: 3000, date: '1w ago' },
              ].map((sale, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-text">{sale.title}</p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{sale.winner} • {sale.date}</p>
                  </div>
                  <p className="font-display font-bold text-emerald">{formatRs(sale.price)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}

const StatCard = ({ label, value, icon: Icon, color }) => {
  const colors = {
    indigo: 'text-indigo bg-indigo-light',
    amber: 'text-amber bg-amber-light',
    emerald: 'text-emerald bg-emerald-light',
  };
  
  return (
    <Card className="text-center group hover:border-indigo transition-colors">
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110", colors[color])}>
        <Icon size={20} />
      </div>
      <p className="text-xl font-display font-bold text-text">{value}</p>
      <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">{label}</p>
    </Card>
  );
};

