import React, { useState } from 'react';
import { motion } from 'motion/react';

import devProfile from '../../assets/preetham-profile-new.png';
import preethamProfile from '../../assets/dev-profile-new.png';
import vamsiProfile from '../../assets/vamsi-profile-new.png';
import poorvekProfile from '../../assets/poorvek-profile-new.png';
import kamalaProfile from '../../assets/kamala-profile-new.png';

const Team = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeBioIndex, setActiveBioIndex] = useState<number | null>(null);

  const members = [
    {
      name: "Dev",
      role: "Founding Partner",
      img: devProfile,
      bio: "Building technology ecosystems since 2008. Leads overall strategy, product vision, and business architecture across all Dev AI Labs verticals from Hyderabad.",
      color: "from-primary/20 via-primary/40 to-primary/20"
    },
    {
      name: "Preetham",
      role: "CTO",
      img: preethamProfile,
      bio: "Leads the core AI research function — model selection, fine-tuning strategy, and domain-specific training pipelines that power the six product suite.",
      color: "from-indigo-500/20 via-indigo-500/40 to-indigo-500/20"
    },
    {
      name: "Vamsi",
      role: "AI Lead",
      img: vamsiProfile,
      bio: "Drives institutional partnerships, enterprise client acquisition, and sector-specific deployment across drone training, geospatial, and education verticals.",
      color: "from-cyan-500/20 via-cyan-500/40 to-cyan-500/20"
    },
    {
      name: "Poorvek",
      role: "Growth",
      img: poorvekProfile,
      bio: "Heads the engineering team responsible for platform architecture, API development, system integrations, and the technical delivery of all Dev AI Labs products.",
      color: "from-emerald-500/20 via-emerald-500/40 to-emerald-500/20"
    },
    {
      name: "Kamala",
      role: "Product Strategy",
      img: kamalaProfile,
      bio: "Manages financial planning, compliance, and operational budgeting across the company. Oversees revenue reporting, vendor management, and investor-ready financial documentation.",
      color: "from-tertiary/20 via-tertiary/40 to-tertiary/20"
    }
  ];

  return (
    <section id="team" className="py-12 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-fit mx-auto text-center mb-8 group">
          <h2 className="font-headline text-3xl font-bold mb-2">The People Building This</h2>
          <div className="flex justify-center mb-4">
            <div className="relative h-4 w-full overflow-hidden">
              <svg viewBox="0 0 200 20" className="w-full h-full text-primary fill-none stroke-current stroke-2">
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
          <p className="text-primary font-medium tracking-wide animate-pulse">Hover or click a name to reveal the architect and their technical background.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {members.map((member, i) => (
            <div
              key={i}
              className="text-center group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                initial={false}
                animate={{
                  height: (hoveredIndex === i || activeBioIndex === i) ? "auto" : 0,
                  opacity: (hoveredIndex === i || activeBioIndex === i) ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden mb-0 cursor-pointer"
                onClick={() => setActiveBioIndex(activeBioIndex === i ? null : i)}
              >
                <div className="aspect-square rounded-xl bg-transparent mb-4 overflow-hidden border-0 relative shadow-2xl">
                  <img
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: 'center center' }}
                    src={member.img}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                  />
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: activeBioIndex === i || hoveredIndex === i ? "auto" : 0, opacity: activeBioIndex === i || hoveredIndex === i ? 1 : 0 }}
                  className="overflow-hidden mb-6"
                >
                  <p className="text-on-surface-variant text-xs leading-relaxed text-left border-l-2 border-primary/30 pl-3">
                    {member.bio}
                  </p>
                </motion.div>

              </motion.div>
              <div className="relative pt-4 flex flex-col items-center group/name">
                {/* Pulsing Aurora Glow Backdrop */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-28 aurora-glow animate-pulse-glow transition-opacity duration-1000 ${(hoveredIndex === i || activeBioIndex === i) ? 'opacity-100' : 'opacity-30'}`} />



                <div className="relative z-10 w-full px-2 mt-8">
                  <div
                    className={`relative py-4 px-6 rounded-2xl border transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-xl shadow-2xl ${(hoveredIndex === i || activeBioIndex === i) ? 'border-primary/60 shadow-[0_0_50px_rgba(255,193,7,0.4)] bg-surface-high/90 scale-105' : 'border-white/10 hover:border-white/20 bg-surface/30'}`}
                  >
                    {/* Unique Background Color Layer */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${member.color} transition-opacity duration-700 ${(hoveredIndex === i || activeBioIndex === i) ? 'opacity-100' : 'opacity-40'}`} />

                    {/* Animated Shimmer Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/name:animate-[shimmer_2s_infinite] transition-opacity duration-500 ${(hoveredIndex === i || activeBioIndex === i) ? 'opacity-100' : 'opacity-0'}`} />

                    <h3
                      className={`flex flex-col items-center justify-center gap-1 font-headline tracking-[0.3em] text-xl md:text-2xl font-black transition-all duration-500 relative z-10 ${(hoveredIndex === i || activeBioIndex === i) ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary drop-shadow-[0_0_10px_rgba(255,193,7,0.3)]' : 'text-white/90'}`}
                    >
                      <span>{member.name.toUpperCase()}</span>
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-white/20 text-[10px] font-label mt-2 uppercase tracking-[0.4em] font-black group-hover:text-primary transition-colors duration-500 relative z-10">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
