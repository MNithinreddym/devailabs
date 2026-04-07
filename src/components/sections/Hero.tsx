
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import InteractiveDotWave from '../ui/InteractiveDotWave';

const Hero = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => (
  <section className="relative pt-40 pb-24 px-6 flex flex-col items-center justify-center text-center min-h-[80vh] overflow-hidden">
    {/* Interactive dot wave background */}
    <InteractiveDotWave />

    {/* Ambient glow orb on top of dots */}
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/4 rounded-full blur-[140px]"></div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-center gap-2 mb-6">
        <motion.span 
          animate={{ opacity: [1, 0.7, 1, 1, 0.4, 1, 1, 0.8, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="font-label text-primary tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold drop-shadow-[0_0_8px_rgba(255,193,7,0.5)]"
        >
          The Stratified Intelligence Architecture
        </motion.span>
        {/* Blinking Terminal Cursor */}
        <motion.span 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          className="w-1.5 h-3 md:h-3.5 bg-primary rounded-sm shadow-[0_0_10px_#ffc107]"
        />
      </div>

      <h1 className="font-headline text-5xl md:text-8xl font-extrabold text-on-surface tracking-tighter mb-8 leading-[1.1]">
        The Intelligence Behind <br /><span className="text-gradient">the Platform</span>
      </h1>
      <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12">
        Deploy enterprise-grade AI layers across your infrastructure. From data foundations to autonomous industry applications, Dev AI Labs builds the core.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <button
          onClick={() => {
            window.location.hash = '#products';
          }}
          className="group flex items-center gap-2 primary-gradient text-on-primary px-8 py-4 rounded-md font-bold transition-all hover:shadow-[0_0_30px_rgba(255,193,7,0.3)] shadow-lg active:scale-95 cursor-pointer"
        >
          Explore Products
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <button
          onClick={() => {
            window.location.hash = '#contact';
          }}
          className="group flex items-center gap-2 glass-card text-on-surface px-8 py-4 rounded-md font-bold border border-outline-variant/20 hover:bg-surface-high/60 transition-all active:scale-95 shadow-md cursor-pointer"
        >
          How It Works
          <ArrowRight className="w-5 h-5 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
        </button>
      </div>
    </motion.div>
  </section>
);

export default Hero;
