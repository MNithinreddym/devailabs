import React from 'react';
import { motion } from 'motion/react';

const CTA = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => (
  <section id="contact" className="py-32 px-6">
    <motion.div
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto glass-card rounded-3xl p-12 md:p-24 text-center border border-primary/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary/5 -z-10"></div>
      <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8">Ready to Add <br />Intelligence?</h2>
      <div className="flex justify-center mb-10">
        <div className="relative h-4 w-96 overflow-hidden">
          <svg viewBox="0 0 200 20" className="w-full h-full text-on-primary/30 fill-none stroke-current stroke-2">
            <motion.path
              animate={{ 
                d: [
                  "M 0 10 Q 25 5, 50 10 T 100 10 T 150 10 T 200 10",
                  "M 0 10 Q 25 15, 50 10 T 100 10 T 150 10 T 200 10",
                  "M 0 10 Q 25 5, 50 10 T 100 10 T 150 10 T 200 10"
                ]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              d="M 0 10 Q 25 5, 50 10 T 100 10 T 150 10 T 200 10"
            />
          </svg>
        </div>
      </div>
      <p className="text-on-surface-variant text-lg mb-12 max-w-xl mx-auto">Join the organizations already running on Dev AI Labs' stratified architecture. Get a custom demo today.</p>
      <button
        onClick={() => onOpenModal('demo')}
        className="primary-gradient text-on-primary px-12 py-5 rounded-md font-bold text-lg hover:shadow-[0_0_50px_rgba(255,193,7,0.4)] transition-all"
      >
        Request a Demo
      </button>
    </motion.div>
  </section>
);

export default CTA;
