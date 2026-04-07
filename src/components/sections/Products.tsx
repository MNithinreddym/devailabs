import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MessageSquare, TrendingUp, Megaphone, BarChart3, Settings } from 'lucide-react';

const Products = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [highlightedProduct, setHighlightedProduct] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const index = productData.findIndex(p => p.id === hash);
      if (index !== -1) {
        setHighlightedProduct(index);

        // Wait a small bit for the mount/expansion to start
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);

        // Clear highlight after 4 seconds
        setTimeout(() => setHighlightedProduct(null), 4000);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const productData = [
    {
      id: "prod-voice",
      title: "DEV AI VOICE",
      desc: "Al-powered voice calling for lead follow-up, student enquiries, and customer support. Handles high call volumes with natural conversation and real-time response logic.",
      details: "High-fidelity vocal cloning and real-time transcription with sub-100ms latency, optimized for low-bandwidth mission environments and secure field communication.",
      icon: Mic,
      label: "Conversational AI",
      color: "text-amber-400",
      titleColor: "text-orange-300",
      tags: ["SYNTHETIC VOICE", "NLP ENGINE"]
    },
    {
      id: "prod-chat",
      title: "DEV AI CHAT",
      desc: "Intelligent chat automation across WhatsApp, web, and in-app. Context-aware responses, lead qualification, and escalation flows built for business operations",
      details: "State-of-the-art context-aware LLM orchestration featuring enterprise-grade security, vector search RAG, and multi-turn reasoning capabilities.",
      icon: MessageSquare,
      label: "Chat Intelligence",
      color: "text-indigo-400",
      titleColor: "text-sky-300"
    },
    {
      id: "prod-sales",
      title: "DEV AI SALES",
      desc: "Al-assisted sales workflows covering leed scoring follow-up sequencing, objection handling guidance, and pipeline reporting. Reduces manual effort across the sales cycle",
      details: "Advanced CRM-integrated intelligence layer that scores leads in real-time and automates personalized outreach sequences to accelerate conversions.",
      icon: TrendingUp,
      label: "Revenue Intelligence",
      color: "text-emerald-400",
      titleColor: "text-teal-300"
    },
    {
      id: "prod-marketing",
      title: "DEV AI MARKETING",
      desc: "Content generation, campaign planning, and audience targeting powered by Al Built to scale outreach across social, email, and messaging platforms with consistent brand output.",
      details: "End-to-end generative pipeline for cross-channel content including video, social, and long-form text, maintaining perfect brand-voice consistency.",
      icon: Megaphone,
      label: "Growth AI",
      color: "text-rose-400",
      titleColor: "text-pink-300"
    },
    {
      id: "prod-insight",
      title: "DEV AI INSIGHT",
      desc: "Real-time analytics, performance dashboards, and Al-generated business reports. Translates raw operational data into clear decisions without requiring a data science team",
      details: "AI-powered BI dashboards that run continuous simulations on market data to identify anomalies and recommend strategic pivots before they are needed.",
      icon: BarChart3,
      label: "Business Intelligence",
      color: "text-cyan-400",
      titleColor: "text-blue-300"
    },
    {
      id: "prod-automate",
      title: "DEV AI AUTOMATE",
      desc: "Process automation for repetitive tasks across HR, finance, operations, and customer handling. Connect systems, trigger actions, and eliminate manual handoffs at scale.",
      details: "Comprehensive RPA platform that pairs legacy systems with agentic AI models to automate high-complexity administrative workflows, reducing overhead by up to 80%.",
      icon: Settings,
      label: "Workflow Automation",
      color: "text-fuchsia-400",
      titleColor: "text-purple-300"
    }
  ];

  return (
    <section id="products" className="py-6 md:py-4 min-h-[90vh] flex flex-col justify-center px-6 bg-surface/30 relative overflow-hidden">
      {/* Ambient Pulsing Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-screen-2xl mx-auto relative z-10"
      >
        <div className="w-fit mx-auto text-center mb-4 group">
          <h2 className="font-headline text-2xl md:text-3xl font-bold mb-1">Six AI Products. Built for Business.</h2>
          <div className="flex justify-center mb-2">
            <div className="relative h-4 w-full overflow-hidden">
              <svg viewBox="0 0 200 20" className="w-full h-full text-primary fill-none stroke-current stroke-2">
                <motion.path
                  animate={{
                    d: [
                      "M 0 10 Q 25 15, 50 10 T 100 10 T 150 10 T 200 10",
                      "M 0 10 Q 25 5, 50 10 T 100 10 T 150 10 T 200 10",
                      "M 0 10 Q 25 15, 50 10 T 100 10 T 150 10 T 200 10"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  d="M 0 10 Q 25 15, 50 10 T 100 10 T 150 10 T 200 10"
                />
              </svg>
            </div>
          </div>
          <p className="text-on-surface-variant">Modular intelligence tools that integrate seamlessly into your existing stack.</p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
        >
          {productData.map((product, i) => (
            <motion.div
              key={i}
              id={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              onMouseEnter={() => setHoveredProduct(i)}
              onMouseLeave={() => setHoveredProduct(null)}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              animate={{
                borderColor: highlightedProduct === i ? ["rgba(255, 193, 7, 0.2)", "rgba(255, 193, 7, 0.8)", "rgba(255, 193, 7, 0.5)"] : (hoveredProduct === i ? "rgba(255, 193, 7, 0.3)" : "rgba(70, 72, 77, 0.1)"),
                boxShadow: highlightedProduct === i ? "0 0 40px rgba(255, 193, 7, 0.25)" : (hoveredProduct === i ? "0 20px 40px rgba(0,0,0,0.2)" : "none"),
                scale: highlightedProduct === i ? [1, 1.05, 1.02] : 1
              }}
              transition={{
                duration: highlightedProduct === i ? 2 : 0.3,
                repeat: highlightedProduct === i ? Infinity : 0
              }}
              className="p-4 bg-surface rounded-2xl group hover:bg-surface-high transition-all border relative overflow-hidden flex flex-col justify-center cursor-default"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-fit">
                  {/* Product Icon Glow Aura */}
                  <div className={`absolute inset-0 ${product.color.replace('text-', 'bg-')} ${highlightedProduct === i ? 'opacity-30 blur-2xl' : 'opacity-0'} group-hover:opacity-20 blur-xl transition-all duration-500 scale-150 rounded-full`} />
                  <motion.div
                    animate={highlightedProduct === i ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                    transition={{ duration: 1.5, repeat: highlightedProduct === i ? Infinity : 0 }}
                    whileHover={{ scale: 1.15, rotate: 8, y: -2 }}
                  >
                    <product.icon className={`relative z-10 w-6 h-6 ${product.color} transition-colors duration-300 group-hover:brightness-125`} />
                  </motion.div>
                </div>
                <span className={`text-[10px] font-label tracking-widest uppercase font-bold ${product.color} opacity-60`}>
                  {product.label}
                </span>
              </div>
              <h3 className={`font-headline text-base md:text-lg font-bold mb-1 ${product.titleColor}`}>{product.title}</h3>
              <p className="text-on-surface-variant mb-2 text-xs leading-relaxed">
                {product.desc}
              </p>

              {product.tags && (
                <div className="flex gap-2 mb-4">
                  {product.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 bg-surface-high rounded-full text-[10px] font-label tracking-widest">{tag}</span>
                  ))}
                </div>
              )}

              <motion.div
                initial={false}
                animate={{
                  height: (hoveredProduct === i || highlightedProduct === i) ? "auto" : 0,
                  opacity: (hoveredProduct === i || highlightedProduct === i) ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-outline-variant/10 mt-1">
                  <p className="text-primary text-[10px] md:text-xs leading-relaxed font-medium">
                    {product.details}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}


        </motion.div>
      </motion.div>
    </section>
  );
};

export default Products;
