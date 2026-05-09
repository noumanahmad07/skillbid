import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Briefcase, Star, MapPin, MessageSquare, ExternalLink } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { useAuctionStore } from '../../store/auctionStore';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { AuctionCard } from '../../components/auction/AuctionCard';
import { formatRs } from '../../utils/formatters';

export default function ProfileView() {
  const { userId } = useParams();
  const { auctions } = useAuctionStore();

  // Mock profile data
  const profile = {
    id: userId,
    name: userId === 's1' ? 'Ayesha Raza' : 'Bilal Ahmed',
    university: userId === 's1' ? 'LUMS' : 'FAST NUCES',
    bio: "Passionate digital creator with 3+ years of experience in brand design and user interface. I love helping startups find their unique visual identity.",
    rating: 4.9,
    reviewCount: 42,
    skills: ['Figma', 'UI/UX', 'Branding', 'Adobe Suite', 'React Basics'],
    memberSince: 'January 2024',
    jobsDone: 24,
    totalEarned: 142000
  };

  const userAuctions = auctions.filter(a => a.student.id === userId || (userId === 's1' && a.id === 'a1'));

  return (
    <PageWrapper className="pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <Card padding="lg" className="text-center">
            <Avatar name={profile.name} size={88} className="mx-auto border-4 border-white shadow-md mb-6" />
            <h1 className="text-2xl font-display font-bold text-text mb-1">{profile.name}</h1>
            <p className="text-sm font-bold text-indigo uppercase tracking-wider mb-4">{profile.university}</p>
            
            <div className="flex items-center justify-center gap-1 mb-6">
              <Star className="text-amber fill-amber" size={16} />
              <span className="text-sm font-bold text-text">{profile.rating}</span>
              <span className="text-xs text-muted font-medium">({profile.reviewCount} reviews)</span>
            </div>

            <p className="text-sm text-text2 leading-relaxed mb-8">
              {profile.bio}
            </p>

            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {profile.skills.map(skill => (
                <Badge key={skill} variant="gray">{skill}</Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-border mb-8">
              <div className="text-center">
                <p className="text-lg font-display font-bold text-text">{profile.jobsDone}</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-tighter">Jobs Done</p>
              </div>
              <div className="text-center border-l border-border">
                <p className="text-lg font-display font-bold text-emerald">{formatRs(profile.totalEarned)}</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-tighter">Earned</p>
              </div>
            </div>

            <Button variant="primary" block icon={MessageSquare}>Send Message</Button>
            <p className="text-[10px] text-muted font-bold uppercase mt-4">Member since {profile.memberSince}</p>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-12">
          {/* Live Auctions */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-display font-bold text-text">Live Auctions</h2>
              <Badge variant="red" className="pulse-red">Active</Badge>
            </div>
            {userAuctions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {userAuctions.map(auction => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <Card padding="lg" className="border-dashed border-2 text-center text-muted font-medium">
                No active auctions currently.
              </Card>
            )}
          </section>

          {/* Past Work */}
          <section>
            <h2 className="text-2xl font-display font-bold text-text mb-8">Past Successes</h2>
            <div className="space-y-4">
              {[
                { title: 'Corporate Identity Design', client: 'Alpha Tech', price: 12500, date: 'Mar 12, 2024' },
                { title: 'SaaS Dashboard Figma', client: 'Stripe PK', price: 45000, date: 'Feb 28, 2024' },
                { title: 'Mobile App Wireframes', client: 'Local NGO', price: 8200, date: 'Jan 15, 2024' },
              ].map((work, i) => (
                <div key={i} className="bg-white border border-border rounded-xl p-6 flex items-center justify-between hover:bg-off transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-off2 rounded-xl flex items-center justify-center text-muted group-hover:bg-indigo-light group-hover:text-indigo transition-all">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text">{work.title}</h4>
                      <p className="text-xs text-muted font-medium uppercase tracking-widest">{work.client} • {work.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-display font-bold text-emerald">{formatRs(work.price)}</p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-tighter">Winning Bid</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
