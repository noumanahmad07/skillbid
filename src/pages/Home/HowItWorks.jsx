import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Post Your Skill',
    desc: 'List your service as an auction. Set a starting price and duration.',
    emoji: '🚀'
  },
  {
    num: '02',
    title: 'Businesses Bid Live',
    desc: 'Watch in real-time as entrepreneurs and brands compete for your talent.',
    emoji: '⚡'
  },
  {
    num: '03',
    title: 'Highest Bid Wins',
    desc: 'When the timer hits zero, the highest bidder automatically wins.',
    emoji: '🏆'
  },
  {
    num: '04',
    title: 'Get Paid Fast',
    desc: 'Complete the work and receive payment via JazzCash or Easypaisa.',
    emoji: '💰'
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-off">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-16">
          <span className="text-indigo font-mono font-bold uppercase tracking-widest text-xs">Simple & Efficient</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text mt-2">How SkillBid Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 bg-white border border-border rounded-2xl text-left group hover:border-indigo2 transition-colors overflow-hidden"
            >
              <span className="absolute -top-4 -right-4 text-8xl font-display font-black text-off2 select-none group-hover:text-indigo-light transition-colors z-0">
                {step.num}
              </span>
              <div className="relative z-10">
                <div className="text-4xl mb-6">{step.emoji}</div>
                <h3 className="text-xl font-bold text-text mb-3">{step.title}</h3>
                <p className="text-sm text-text2 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
