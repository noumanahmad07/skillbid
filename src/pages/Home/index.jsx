import { HeroSection } from './HeroSection';
import { FeaturedAuctions } from './FeaturedAuctions';
import { HowItWorks } from './HowItWorks';
import { LiveFeedSection } from './LiveFeedSection';
import { CTASection } from './CTASection';

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <FeaturedAuctions />
      <HowItWorks />
      <LiveFeedSection />
      <CTASection />
      
      {/* Footer is missing from instructions, but instructions imply its presence in structure */}
      <footer className="py-12 border-t border-border bg-off">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-4">
            <span className="text-xl font-display font-bold text-text">Skill</span>
            <span className="text-xl font-display font-bold text-indigo">Bid</span>
          </div>
          <p className="text-sm text-muted">© 2024 SkillBid. Built for university talent.</p>
        </div>
      </footer>
    </main>
  );
}
