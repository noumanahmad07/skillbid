import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-indigo rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6">
              Ready to sell your skill <br className="hidden md:block" /> at the best price?
            </h2>
            <p className="text-indigo-mid text-lg max-w-xl mx-auto mb-10 font-medium">
              Join 800+ university students in Pakistan who are earning by doing what they love. No fixed rates, just real market value.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="!bg-white !text-indigo hover:!bg-indigo-light px-10">
                  Get Started Now
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="!bg-transparent !border-white !text-white hover:!bg-white/10 px-10">
                  How it works
                </Button>
              </Link>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};
