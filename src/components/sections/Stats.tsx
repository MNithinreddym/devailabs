import React from 'react';
import { motion } from 'motion/react';

const Stats = () => {
  const stats = [
    { val: "6", label: "AI Products", id: "products" },
    { val: "4", label: "Intelligence Layers", id: "platform" },
    { val: "10+", label: "Industry Verticals", id: "use-cases" },
    { val: "Singapore", label: "Global HQ", sub: "Est. 2008" }
  ];

  const scrollTo = (id?: string) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 px-6 bg-background z-10 -mt-4">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={stat.id ? { y: -5 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => scrollTo(stat.id)}
            className={`group relative p-6 pt-7 rounded-xl bg-[#111318] border border-[#46484d]/30 overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,193,7,0.15)] ${stat.id ? 'cursor-pointer' : ''}`}
          >
            {/* Hover Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffc107]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Top Glowing Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffc107] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Top Label / Live Metric Indicator */}
              <div className="flex items-center gap-1.5 font-label text-[#ffc107]/80 text-[9px] uppercase tracking-[0.2em] mb-3">
                <span className={`w-1.5 h-1.5 rounded-full ${stat.sub ? 'bg-[#ffc107]/50' : 'bg-[#ffc107] animate-pulse shadow-[0_0_8px_#ffc107]'}`} />
                {stat.sub || "Live Metric"}
              </div>
              
              {/* Main Number Value */}
              <div className={`font-headline font-black text-white group-hover:text-[#ffc107] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,193,7,0.2)] mt-auto mb-1 ${stat.val.length > 5 ? 'text-2xl' : 'text-4xl md:text-5xl'}`}>
                {stat.val}
              </div>
              
              {/* Main Label */}
              <div className="font-label text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#aaabb0] group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>

            {/* Faded Background Number for depth - Adjusted size */}
            <div className="absolute -bottom-4 -right-2 text-[80px] leading-none font-black text-white/[0.03] group-hover:text-[#ffc107]/10 transition-all duration-500 select-none pointer-events-none transform group-hover:-translate-y-2 group-hover:-translate-x-2">
              {stat.val.replace('+', '').replace('Singapore', 'HQ')}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
