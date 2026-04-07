import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

const Modal = ({ type, onClose }: { type: string, onClose: () => void }) => {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [useCase, setUseCase] = React.useState('');

  const content = {
    demo: {
      title: "Request a Demo",
      description: "Experience the stratified intelligence of Dev AI Labs firsthand.",
      cta: "Experience the Power"
    },
    products: {
      title: "Our Product Suite",
      description: "Discover our specialized AI tools: (1) Voice Intelligence for vocal cloning, (2) Cognitive Chat for RAG-based support, (3) Sales Catalyst for lead scoring, (4) Marketing Core for generation, (5) Strategic Insight for BI, and (6) Automate Pro for RPA.",
      cta: "Explore Our Stack"
    },
    'how-it-works': {
      title: "The Stratified Architecture",
      description: "Our platform operates on a 4-layer stratified intelligence architecture: (1) AI Intelligence for reasoning, (2) Software Platform for orchestration, (3) Data Infrastructure for security, and (4) Industry Application for deployment.",
      cta: "Understand the Core"
    }
  }[type as keyof typeof content];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log('Demo Request:', { email, phone, useCase });
    alert(`Thank you! Request received for ${useCase || 'AI Implementation'}. Our engineering team will reach out within 24 hours.`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="max-w-xl w-full glass-card p-8 md:p-14 rounded-3xl border border-primary/20 relative shadow-2xl overflow-y-auto max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="font-label text-primary text-[10px] uppercase tracking-widest mb-4">Matter / {type.replace('-', ' ')}</div>
        <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">{content?.title}</h2>
        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8">{content?.description}</p>

        {type === 'demo' ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant ml-1">Work Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-surface-high/50 border border-outline-variant/30 rounded-xl px-5 py-3.5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-on-surface-variant/30 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant ml-1">Phone Number</label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 00000 00000"
                className="w-full bg-surface-high/50 border border-outline-variant/30 rounded-xl px-5 py-3.5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-on-surface-variant/30 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="usecase" className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant ml-1">AI Use Case</label>
              <select
                id="usecase"
                required
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full bg-surface-high border border-outline-variant/30 rounded-xl px-5 py-3.5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm appearance-none cursor-pointer text-on-surface"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffc107'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
              >
                <option value="" disabled className="bg-surface text-on-surface-variant">Select an industry vertical</option>
                <option value="Drone Training" className="bg-surface">Drone Training Academy</option>
                <option value="UAV Services" className="bg-surface">UAV & Survey Services</option>
                <option value="Simulation" className="bg-surface">Drone Simulation & Licenses</option>
                <option value="Media Platform" className="bg-surface">Media & Content Production</option>
                <option value="B2B Marketplace" className="bg-surface">B2B Marketplace & Logistics</option>
                <option value="3D Visualisation" className="bg-surface">3D Visualisation & Survey</option>
                <option value="Custom AI" className="bg-surface">Custom AI Implementation</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full primary-gradient text-on-primary px-8 py-4 mt-2 rounded-xl font-bold text-sm tracking-tight active:scale-[0.98] transition-all hover:shadow-[0_8px_30px_rgb(255,193,7,0.3)] shadow-lg"
            >
              {content?.cta}
            </button>
          </form>
        ) : (
          <button
            onClick={onClose}
            className="primary-gradient text-on-primary px-8 py-4 rounded-xl font-bold text-sm tracking-tight active:scale-95 transition-all shadow-lg"
          >
            {content?.cta}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
