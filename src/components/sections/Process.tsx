import React from 'react';
import { motion, useInView } from 'motion/react';

/* ── icon components for each step ────────────────────────── */
const DiscoveryIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const AuditIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ConfigIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const IntegrationIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

/* ── step data ────────────────────────────────────────────── */
const steps = [
  {
    id: '01',
    num: 1,
    title: 'Discovery',
    desc: 'We start by understanding your current workflows, pain points, and data sources. This session produces a deployment map showing exactly which AI products fit which business functions and what outcomes to expect.',
    icon: DiscoveryIcon,
    accent: '#ffc107',
  },
  {
    id: '02',
    num: 2,
    title: 'Audit',
    desc: 'Before any AI is deployed, we assess the quality and structure of your existing data. Clean, structured data produces reliable AI outputs. We identify gaps and set up the infrastructure layer first.',
    icon: AuditIcon,
    accent: '#ac89ff',
  },
  {
    id: '03',
    num: 3,
    title: 'Configuration',
    desc: 'Each product is configured for your specific context — your brand tone, your product catalogue, your customer language. Domain-specific tuning ensures the AI performs for your industry, not a generic one.',
    icon: ConfigIcon,
    accent: '#00bcd4',
  },
  {
    id: '04',
    num: 4,
    title: 'Integration',
    desc: 'We connect the AI layer to your existing tools — CRMs, WhatsApp Business, email platforms, or custom systems. API and webhook-based integration means your team continues working in familiar environments.',
    icon: IntegrationIcon,
    accent: '#4caf50',
  },
  {
    id: '05',
    num: 5,
    title: 'Monitoring',
    desc: 'Post-deployment, the Insight dashboard tracks performance in real time. We review outputs monthly and refine the models based on actual usage data — so the system improves as your business grows.',
    icon: MonitorIcon,
    accent: '#ffc107',
  },
];

/* ── animated connector line (desktop) ────────────────────── */
const ConnectorLine = ({ index }: { index: number }) => (
  <div className="hidden lg:block absolute top-10 -right-[calc(50%-20px)] w-[calc(100%-40px)] z-0">
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: 'easeOut' }}
      className="h-[2px] origin-left"
      style={{
        background: `linear-gradient(90deg, ${steps[index].accent}66, ${steps[index + 1]?.accent ?? steps[index].accent}66)`,
      }}
    />
    {/* animated pulse dot traveling along the line */}
    <motion.div
      initial={{ left: '0%', opacity: 0 }}
      whileInView={{ left: '100%', opacity: [0, 1, 1, 0] }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.4, delay: 0.6 + index * 0.15, ease: 'easeInOut' }}
      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
      style={{ background: steps[index].accent, boxShadow: `0 0 8px ${steps[index].accent}` }}
    />
  </div>
);

/* ── single step card ─────────────────────────────────────── */
interface Step {
  id: string;
  num: number;
  title: string;
  desc: string;
  icon: React.ComponentType;
  accent: string;
}

const StepCard: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex-1 min-w-[180px] group flex flex-col"
    >
      {/* connector */}
      {index < steps.length - 1 && <ConnectorLine index={index} />}

      {/* card */}
      <div
        className="relative h-full flex flex-col rounded-2xl p-4 pb-4 text-center transition-all duration-500 cursor-default"
        style={{
          background: 'rgba(35, 38, 44, 0.35)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${step.accent}15`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = `1px solid ${step.accent}55`;
          e.currentTarget.style.boxShadow = `0 8px 40px ${step.accent}18, inset 0 1px 0 ${step.accent}22`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = `1px solid ${step.accent}15`;
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* background glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${step.accent}12 0%, transparent 70%)`,
          }}
        />

        {/* number badge — inside the card, prominent and visible */}
        <div className="flex justify-center mb-3">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative"
          >
            {/* outer glow ring */}
            <div
              className="absolute inset-[-8px] rounded-full"
              style={{
                background: `${step.accent}18`,
                filter: `blur(12px)`,
              }}
            />
            {/* badge */}
            <div
              className="relative w-11 h-11 rounded-full flex items-center justify-center font-headline text-xl font-extrabold"
              style={{
                background: `linear-gradient(135deg, ${step.accent}, ${step.accent}cc)`,
                color: '#0c0e12',
                boxShadow: `0 4px 24px ${step.accent}55`,
              }}
            >
              {step.num}
            </div>
          </motion.div>
        </div>

        {/* icon */}
        <div
          className="w-9 h-9 mx-auto mb-2 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          style={{
            background: `${step.accent}15`,
            color: step.accent,
          }}
        >
          <Icon />
        </div>

        {/* title */}
        <h4
          className="font-headline text-base font-bold mb-1 transition-colors duration-300"
          style={{ color: '#f6f6fc' }}
        >
          {step.title}
        </h4>

        {/* description */}
        <p className="text-on-surface-variant text-xs leading-snug flex-grow">
          {step.desc}
        </p>

        {/* bottom accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          className="mt-3 h-[2px] rounded-full origin-left"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.accent}66, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
};

/* ── main section ─────────────────────────────────────────── */
const Process = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-12 md:py-16 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #111318 0%, #0c0e12 50%, #111318 100%)' }}
    >
      {/* ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(circle, rgba(255,193,7,0.06), transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(172,137,255,0.05), transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <span className="font-label text-primary tracking-[0.3em] uppercase text-xs mb-2 block">
            How We Deliver
          </span>

          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-2">
            Implementation{' '}
            <span className="text-gradient">Process</span>
          </h2>

          {/* animated wave underline */}
          <div className="flex justify-center mb-3">
            <div className="relative h-3 w-40 overflow-hidden">
              <svg viewBox="0 0 200 20" className="w-full h-full text-primary fill-none stroke-current stroke-2">
                <motion.path
                  animate={{
                    d: [
                      'M 0 10 Q 25 4, 50 10 T 100 10 T 150 10 T 200 10',
                      'M 0 10 Q 25 16, 50 10 T 100 10 T 150 10 T 200 10',
                      'M 0 10 Q 25 4, 50 10 T 100 10 T 150 10 T 200 10',
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  d="M 0 10 Q 25 4, 50 10 T 100 10 T 150 10 T 200 10"
                />
              </svg>
            </div>
          </div>

          <p className="text-on-surface-variant text-sm max-w-xl mx-auto">
            Precision-engineered deployment from first meeting to full scale —{' '}
            <span className="text-on-surface font-medium">five phases, zero guesswork.</span>
          </p>
        </motion.div>

        {/* steps grid */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 items-stretch">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <StepCard step={step} index={i} />
            </React.Fragment>
          ))}
        </div>

        {/* bottom summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {[
            { label: 'Avg. Deployment', value: '4 – 8 Weeks' },
            { label: 'Uptime Guarantee', value: '99.9%' },
            { label: 'Post-Launch Support', value: '24 / 7' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-headline text-xl font-bold text-gradient">{stat.value}</p>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-widest mt-0.5 font-label">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
