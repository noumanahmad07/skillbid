import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { CheckCircle, Shield, Zap, TrendingUp, DollarSign, Award, ArrowRight } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: 'Create your free account',
    desc: 'Sign up as a student to sell your skills or as a business to hire talent. Verification is instant for university emails.',
    icon: <CheckCircle className="text-indigo" size={32} />,
  },
  {
    title: 'Post your skill as an auction',
    desc: 'Instead of fixed prices, set a starting bid and watch the market determine your value. Perfect for logos, code, and more.',
    icon: <Zap className="text-amber" size={32} />,
  },
  {
    title: 'Businesses bid in real-time',
    desc: 'Our live bidding system creates healthy competition, ensuring you get the best possible price for your expertise.',
    icon: <TrendingUp className="text-indigo" size={32} />,
  },
  {
    title: 'Connect with the winner',
    desc: 'Once the timer ends, the highest bidder wins. Connect via our secure messaging system to finalize details.',
    icon: <Award className="text-emerald" size={32} />,
  },
  {
    title: 'Deliver your work',
    desc: 'Upload your files and submit for review. Our platform supports up to 2 revisions to ensure buyer satisfaction.',
    icon: <CheckCircle className="text-indigo" size={32} />,
  },
  {
    title: 'Get paid fast',
    desc: 'Receive your earnings directly to JazzCash, Easypaisa, or your Bank Account within 24 hours of delivery.',
    icon: <DollarSign className="text-emerald" size={32} />,
  },
];

export default function HowItWorks() {
  return (
    <PageWrapper className="pt-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-indigo font-mono font-bold uppercase tracking-widest text-xs">The Process</span>
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-text mt-4 mb-6">How SkillBid Works</h1>
        <p className="text-lg text-text2 font-medium">
          The auction model ensures you get paid what you're worth, while businesses get access to verified university talent at competitive rates.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-24 mb-32">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "flex flex-col md:flex-row items-center gap-12",
              i % 2 !== 0 && "md:flex-row-reverse"
            )}
          >
            <div className="flex-1 relative">
              <span className="absolute -top-12 -left-6 text-[160px] font-display font-black text-off2 select-none z-0">
                0{i + 1}
              </span>
              <div className="relative z-10 bg-white p-10 rounded-3xl border border-border shadow-sm">
                <div className="w-16 h-16 bg-off rounded-2xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-text mb-4">{step.title}</h3>
                <p className="text-text2 leading-relaxed text-lg">
                  {step.desc}
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-full h-80 bg-off2 rounded-3xl border border-dashed border-border flex items-center justify-center text-muted italic font-medium">
                [Illustrative graphic for step {i + 1}]
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <section className="py-20 border-t border-border">
        <h2 className="text-3xl font-display font-bold text-center mb-16">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <FAQItem 
            q="How does the platform fee work?" 
            a="SkillBid takes a 12% platform fee from the winning bid. This covers payment processing, escrow protection, and platform maintenance. The student keeps 88%." 
          />
          <FAQItem 
            q="What is Escrow Protection?" 
            a="When a buyer wins an auction, their payment is held by SkillBid. We only release the funds to the student once the buyer confirms the work has been delivered." 
          />
          <FAQItem 
            q="Can I bid if I'm not a student?" 
            a="Anyone can sign up as a 'Business/Buyer' to place bids. However, to 'Post a Skill', you must have a verified university status." 
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="bg-indigo rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-8 relative z-10">
            Start your first auction today
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/register"><Button size="lg" className="bg-white text-indigo hover:bg-off2 px-10">Register Now</Button></Link>
            <Link to="/auctions"><Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-10" iconRight={ArrowRight}>Browse Live Auctions</Button></Link>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>
    </PageWrapper>
  );
}

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl bg-white overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-off transition-colors"
      >
        <span className="font-bold text-text">{q}</span>
        <span className={cn("text-indigo transition-transform", isOpen && "rotate-180")}>↓</span>
      </button>
      {isOpen && (
        <div className="p-6 pt-0 text-text2 leading-relaxed border-t border-border bg-off/30">
          {a}
        </div>
      )}
    </div>
  );
};

