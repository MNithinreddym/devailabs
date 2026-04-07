import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const Industries = () => {
  const [activeIndustry, setActiveIndustry] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const industryData = [
    {
      label: "Drone Services",
      matter: "High-precision aerial data collection and autonomous mission planning for industrial surveying, infrastructure surveillance, and technical visual intelligence.",
      image: "/indian_drone_services.png"
    },
    {
      label: "Pilot Training",
      matter: "Elite UAV flight training programs using high-fidelity simulations, motion sensors, and virtual reality environments to prepare pilots for complex mission scenarios.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
    },
    {
      label: "Geospatial Survey",
      matter: "Advanced 3D mapping and GIS data integration, transforming raw topographical sensor data into actionable spatial intelligence and millimeter-precise terrain models.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
    },
    {
      label: "Agriculture Technology",
      matter: "Sustainable precision farming solutions leveraging multispectral imaging to monitor crop pathology, optimize irrigation cycles, and automate nutrient distribution.",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=2070"
    },
    {
      label: "Defence and Security",
      matter: "Mission-critical AI-driven tactical intelligence and unmanned combat support systems for high-stakes strategic reconnaissance and integrated battlefield awareness.",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=2072"
    },
    {
      label: "Higher Education",
      matter: "Advanced academic programs and practical research initiatives integrating UAV technologies into progressive engineering and spatial science curricula.",
      image: "/higher_education.png"
    },
    {
      label: "Media and Content",
      matter: "Cinematic aerial cinematography and high-resolution dynamic framing for professional broadcast, filmmaking, and immersive media production.",
      image: "/media_and_content.png"
    },
    {
      label: "B2B Marketplaces",
      matter: "Streamlined procurement and vendor networking platforms connecting enterprise clients with certified drone hardware, software, and service providers.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2070&q=80&auto=format&fit=crop"
    },
    {
      label: "Infrastructure Development",
      matter: "Comprehensive civil engineering support featuring volumetric analysis, structural integrity inspections, and continuous site progression tracking.",
      image: "/infrastructure_development.png"
    },
    {
      label: "3D Visualisation",
      matter: "Photorealistic digital twin creation and immersive architectural rendering using hyper-accurate point cloud data and mesh reconstructions.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=2070&q=80&auto=format&fit=crop"
    },
    {
      label: "Simulation Technology",
      matter: "Next-generation synthetic and augmented environments designed for risk-free system testing, pilot evaluation, and autonomous AI algorithm training.",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=2070&q=80&auto=format&fit=crop"
    },
    {
      label: "Smart Cities",
      matter: "Integrated urban management networks utilizing autonomous data nodes for traffic optimization, infrastructure health monitoring, and municipal planning.",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=2070&q=80&auto=format&fit=crop"
    },
    {
      label: "LiDAR and Remote Sensing",
      matter: "High-density laser scanning and multi-spectral sensor deployment for precise topographical mapping, canopy penetration, and geospatial analytics.",
      image: "/lidar_4k.png"
    },
    {
      label: "Environmental Monitoring",
      matter: "Ecological tracking and conservation management through persistent aerial surveillance of wildlife populations, deforestation, and climate impact variables.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2070&q=80&auto=format&fit=crop"
    }
  ];

  return (
    <section className="min-h-screen py-10 px-6 bg-background flex flex-col justify-center">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Built for</span><br />
            <span style={{ color: '#fcc313' }}>
              These Sectors
            </span>
          </h2>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-3 transition-all duration-700 max-w-6xl mx-auto relative z-10">
          {industryData.map((ind, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndustry(activeIndustry === i ? null : i)}
              className={`relative group cursor-pointer py-2.5 px-5 rounded-full transition-all duration-500 overflow-hidden border backdrop-blur-md flex items-center justify-center ${
                activeIndustry === i 
                ? 'bg-primary/20 border-primary/60 shadow-[0_0_30px_rgba(252,195,19,0.4)] scale-105' 
                : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-primary/50 shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(252,195,19,0.3)]'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className={`relative z-10 font-label text-[10px] md:text-[11px] tracking-widest font-black uppercase transition-all duration-500 ${
                  activeIndustry === i ? 'text-primary drop-shadow-[0_0_10px_rgba(252,195,19,0.8)]' : 'text-white/90 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                }`}
              >
                {ind.label}
              </span>

              {/* Hover Glow Sweep */}
              <div className={`absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-[50%] transition-transform duration-700 ease-in-out pointer-events-none ${activeIndustry === i ? 'hidden' : 'block'}`}></div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeIndustry !== null && (
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 max-w-4xl mx-auto rounded-2xl overflow-hidden glass-card border border-primary/20 shadow-[0_0_40px_rgba(252,195,19,0.1)] relative"
            >
              <div className="relative overflow-hidden group flex flex-col md:flex-row h-auto md:h-[300px]">
                <div className="w-full md:w-5/12 h-[200px] md:h-full relative overflow-hidden">
                  <img
                    src={industryData[activeIndustry].image}
                    alt={industryData[activeIndustry].label}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="hidden md:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
                </div>

                <div className="w-full md:w-7/12 flex items-center p-6 md:p-12 z-10 bg-background relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-px bg-primary/60"></div>
                      <span className="font-label text-primary text-[10px] tracking-widest uppercase">Strategic Focus</span>
                    </div>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4 text-white">{industryData[activeIndustry].label}</h3>
                    <p className="text-on-surface-variant text-sm md:text-[15px] leading-relaxed">{industryData[activeIndustry].matter}</p>
                    
                    <div className="mt-8 flex gap-1.5 opacity-60">
                       <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                       <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                       <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setActiveIndustry(null)}
                  className="p-2 glass-card rounded-full text-on-surface hover:text-primary transition-colors border border-outline-variant/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Industries;
