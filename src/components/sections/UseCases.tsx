import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Video, Building2, Rotate3D } from 'lucide-react';

const UseCases = () => {
  const [activeCase, setActiveCase] = useState<string | null>(null);

  const cases: Array<{ id: string, title: string, subtitle?: string, desc: string, details: string, img?: string, icon?: any, link?: string }> = [
    {
      id: "drone",
      title: "Drone Training",
      subtitle: "India Drone Academy",
      desc: "Comprehensive AI solutions for flight academies.",
      details: "AI voice and chat handles student enquiries, fee reminders, batch scheduling, and post-training placement follow-ups — freeing the academy operations team for higher-value work.",
      img: "/images/ida.jpg",
      link: "https://indiadroneacademy.com/"
    },
    {
      id: "uav",
      title: "UAV Services",
      subtitle: "IPage UMS",
      desc: "AI-driven sales and project management for UAV fleets.",
      details: "AI sales pipeline tracks and follows up with survey project leads across agriculture, infrastructure, and defence verticals. Automate proposal reminders and client check-ins.",
      img: "/images/ipageums.jpg",
      link: "https://ipageums.com/"
    },
    {
      id: "sim",
      title: "Simulation",
      subtitle: "IPage Drone Simulator",
      desc: "Marketing and lead conversion for drone simulation.",
      details: "Dev AI Chat drives demo download conversions and licence inquiries. Marketing AI generates targeted outreach to RPTOs, engineering colleges, and defence organisations.",
      img: "/images/dronesimulator.png",
      icon: null,
      link: "https://www.dronesimulator.pro/"
    },
    {
      id: "media",
      title: "Media Platform",
      subtitle: "Drone TV",
      desc: "AI content tools for media creators and teams.",
      details: "AI marketing and content tools assist creators and media teams in producing descriptions, SEO-optimised video titles, and audience engagement campaigns at scale.",
      img: "/images/dronetv.jpg",
      icon: Video,
      link: "https://www.dronetv.in/"
    },
    {
      id: "b2b",
      title: "B2B Marketplace",
      subtitle: "Virel Biz",
      desc: "Insight and sales AI for marketplace logistics.",
      details: "Insight and sales AI helps marketplace operators understand buyer patterns, identify high-value vendor categories, and automate follow-up sequences for active listings.",
      img: "/images/virelbiz.jpg",
      icon: Building2,
      link: "https://virelbiz.com/"
    },
    {
      id: "3d",
      title: "3D Visualisation",
      subtitle: "IPage Vision",
      desc: "Project coordination and briefing automation.",
      details: "Automate client briefing capture, project status updates, and delivery notifications. Dev AI reduces coordination overhead for the visualisation team across concurrent projects.",
      img: "/images/ipagevision.jpg",
      icon: Rotate3D,
      link: "https://www.ipagevision.com/"
    }
  ];

  return (
    <section id="use-cases" className="py-6 md:py-4 min-h-[90vh] flex flex-col justify-center px-6">
      <div className="max-w-screen-2xl mx-auto w-full">
        <div className="mb-3 md:mb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="w-fit">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight mb-1">Where Dev AI Labs <br />Gets Deployed</h2>
            <div className="relative h-4 w-full overflow-hidden mb-4">
              <svg viewBox="0 0 200 20" className="w-full h-full text-tertiary fill-none stroke-current stroke-2">
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
          <p className="text-on-surface-variant max-w-xs md:max-w-sm text-xs">Hover over any scenario to explore the deep technical background of our deployments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {cases.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              onMouseEnter={() => setActiveCase(item.id)}
              onMouseLeave={() => setActiveCase(null)}
              onClick={() => {
                if (item.link) {
                  window.open(item.link, '_blank', 'noopener,noreferrer');
                }
              }}
              className="group relative aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden bg-surface cursor-pointer border border-outline-variant/10 shadow-lg shadow-black/20 hover:border-primary/30 transition-colors"
            >
              {item.img && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <img
                    className="absolute inset-0 w-full h-full object-contain p-2 bg-surface-high transition-transform duration-700 group-hover:scale-105"
                    src={item.img}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                  />
                </>
              )}

              {/* Icon-only fallback (no image) */}
              {!item.img && item.icon && (
                <div className="absolute inset-0 bg-surface-high flex flex-col items-center justify-center p-12 text-center">
                  <item.icon className="w-16 h-16 text-primary mb-6 transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                </div>
              )}

              {/* Icon Badge Overlay (for cards that have both img + icon) */}
              {item.img && item.icon && (
                <div className="absolute top-5 right-5 z-20 p-2.5 rounded-xl bg-background/70 backdrop-blur-md border border-primary/30 shadow-[0_0_20px_rgba(255,193,7,0.2)]">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
              )}

              <div className="absolute bottom-0 left-0 p-3 md:p-4 z-20 w-full">
                <h4 className="font-headline text-lg md:text-xl font-bold mb-1">{item.title}</h4>
                <p className="text-on-surface-variant text-[10px] md:text-xs leading-relaxed">{item.desc}</p>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeCase === item.id ? "auto" : 0,
                    opacity: activeCase === item.id ? 1 : 0
                  }}
                  className="overflow-hidden mt-4"
                >
                  <div className="pt-4 border-t border-primary/20">
                    {item.subtitle && (
                      <p className="text-primary font-headline font-extrabold text-base mb-2 tracking-wide uppercase">{item.subtitle}</p>
                    )}
                    <p className="text-on-surface-variant text-xs leading-relaxed font-medium">
                      {item.details}
                    </p>
                  </div>
                </motion.div>
              </div>

              {activeCase === item.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-background/60 backdrop-blur-md z-10"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
