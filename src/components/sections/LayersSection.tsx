import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Brain, Code, Database, Globe, Cpu } from 'lucide-react';

// Inner component to handle magnetic and spotlight states per card
const LayerCard = ({ layer, i, hoveredLayer, setHoveredLayer }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Spring physics for smooth magnetic return
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    setMousePosition({ x: localX, y: localY });

    // Magnetic effect (slight physical pull towards cursor)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set((localX - centerX) / 10);
    y.set((localY - centerY) / 10);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoveredLayer(i);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredLayer(null);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseXSpring,
        y: mouseYSpring,
        borderLeftColor: i === 0 ? '#ac89ff' : i === 1 ? '#ffc107' : i === 2 ? '#00bcd4' : i === 3 ? '#4caf50' : 'inherit'
      }}
      className="relative p-8 rounded-xl bg-[#111318] border border-outline-variant/10 border-l-4 cursor-default flex items-start gap-6 overflow-hidden group shadow-lg drop-shadow-lg"
    >
      {/* Background radial glow following cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 193, 7, 0.08), transparent 40%)`,
          }}
        />
      )}

      {/* Active Spotlight Border Glow following cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 193, 7, 0.5), transparent 40%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px' // Border width for the spotlight
          }}
        />
      )}

      {/* Card Content */}
      <div className="p-3 rounded-lg bg-surface-high border border-outline-variant/10 relative z-20 group-hover:scale-110 transition-transform duration-300">
        <layer.icon className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1 relative z-20">
        <div className="font-label text-on-surface-variant text-[10px] mb-2 uppercase tracking-widest group-hover:text-primary/70 transition-colors">Layer {layer.id}</div>
        <h3 className="font-headline text-2xl font-bold mb-3">{layer.title}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-0">{layer.desc}</p>

        <motion.div
          initial={false}
          animate={{ height: hoveredLayer === i ? "auto" : 0, opacity: hoveredLayer === i ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-primary/80 text-sm mt-4 leading-relaxed pt-4 border-t border-outline-variant/10">
            {layer.details}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const LayersSection = () => {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const layers = [
    {
      id: "01",
      title: "AI Intelligence",
      desc: "Neural engines and cognitive models that drive decision making.",
      details: "The core reasoning and language models that power all products. Custom fine-tuning, domain-specific training, and decision logic built for real-world industry contexts — not generic consumer use cases.",
      color: "border-tertiary",
      icon: Brain
    },
    {
      id: "02",
      title: "Software Platform",
      desc: "Orchestration middleware connecting intelligence to interfaces.",
      details: "The application and API layer where businesses integrate AI into their workflows. SDKs, dashboards, automation workflows, and connectors that plug into existing operations without replacing them.",
      color: "border-primary",
      icon: Code
    },
    {
      id: "03",
      title: "Data Infrastructure",
      desc: "Scalable pipelines ensuring data integrity and processing speeds.",
      details: "Structured pipelines for ingesting, processing, and enriching data from drone surveys, field operations, customer interactions, and business systems. The foundation for accurate AI outputs.",
      color: "border-info",
      icon: Database
    },
    {
      id: "04",
      title: "Industry Application",
      desc: "Customized endpoints tailored for specific vertical needs.",
      details: "Deployment-ready vertical solutions for drones, agriculture, geospatial services, training platforms, media, and enterprise sales. Built for Indian and Southeast Asian market conditions.",
      color: "border-success",
      icon: Globe
    }
  ];

  return (
    <section id="platform" className="py-12 md:py-8 min-h-[90vh] flex items-center px-6 overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full">
          <motion.path
            animate={{
              d: [
                "M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,165.3C672,160,768,192,864,218.7C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            fill="#ffc107"
            fillOpacity="0.4"
          />
          <motion.path
            animate={{
              d: [
                "M0,224L60,218.7C120,213,240,203,360,186.7C480,171,600,149,720,160C840,171,960,213,1080,224C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                "M0,224L60,240C120,256,240,288,360,277.3C480,267,600,213,720,202.7C840,192,960,224,1080,240C1200,256,1320,256,1380,256L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                "M0,224L60,218.7C120,213,240,203,360,186.7C480,171,600,149,720,160C840,171,960,213,1080,224C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ]
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            fill="#ac89ff"
            fillOpacity="0.3"
          />
        </svg>
      </div>

      <div className="max-w-screen-2xl w-full mx-auto relative z-10">
        <div className="w-fit mb-6 group">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-2 tracking-tight">Four Layers. One Intelligence.</h2>
          <div className="relative h-4 w-full overflow-hidden mb-6">
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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-3">
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredLayer(i)}
                onMouseLeave={() => setHoveredLayer(null)}
                whileHover={{ x: 10 }}
                className="p-4 md:p-5 rounded-xl bg-surface border border-outline-variant/5 border-l-4 transition-all cursor-default flex items-start gap-4"
                style={{ borderLeftColor: i === 0 ? '#ac89ff' : i === 1 ? '#ffc107' : i === 2 ? '#00bcd4' : i === 3 ? '#4caf50' : 'inherit' }}
              >
                <div className="p-3 rounded-lg bg-surface-high border border-outline-variant/10">
                  <layer.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-label text-on-surface-variant text-[10px] mb-1 uppercase tracking-widest">Layer {layer.id}</div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold mb-2">{layer.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-0">{layer.desc}</p>

                  <motion.div
                    initial={false}
                    animate={{ height: hoveredLayer === i ? "auto" : 0, opacity: hoveredLayer === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-primary/80 text-sm mt-4 leading-relaxed pt-4 border-t border-outline-variant/10">
                      {layer.details}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative flex justify-center">
            <div className="aspect-square w-full max-w-[380px] glass-card rounded-full border border-primary/10 flex items-center justify-center p-8 md:p-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full border border-tertiary/10 flex items-center justify-center p-12 relative"
              >
                {/* Orbiting Icons */}
                {layers.map((layer, idx) => {
                  const positions = [
                    "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
                    "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                    "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  ];
                  return (
                    <div key={idx} className={`absolute ${positions[idx]} p-4 glass-card rounded-full border border-primary/20 bg-surface/80 backdrop-blur-md z-20`}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <layer.icon className="w-10 h-10 text-primary" />
                      </motion.div>
                    </div>
                  );
                })}

                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-tertiary/10 flex items-center justify-center">
                  <Cpu className="w-20 h-20 text-primary" />
                </div>
              </motion.div>
            </div>
            <div className="absolute -top-4 -right-4 p-4 glass-card rounded-lg intelligence-glow font-label text-[10px] tracking-widest">REAL-TIME SYNC ACTIVE</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayersSection;
