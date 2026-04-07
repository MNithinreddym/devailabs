import React from 'react';
import { AnimatePresence } from 'motion/react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// UI
import Modal from './components/ui/Modal';
import Preloader from './components/ui/Preloader';

// Sections
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import LayersSection from './components/sections/LayersSection';
import Products from './components/sections/Products';
import UseCases from './components/sections/UseCases';
import Process from './components/sections/Process';
import Industries from './components/sections/Industries';
import Team from './components/sections/Team';
import CTA from './components/sections/CTA';

export default function App() {
  const [activeModal, setActiveModal] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Clear hash and force scroll to top on refresh
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Artificial delay to allow preloader to animate nicely
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="top" className="min-h-screen selection:bg-primary selection:text-on-primary">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <Navbar onOpenModal={setActiveModal} />
      <main>
        <Hero onOpenModal={setActiveModal} />
        <Stats />
        <LayersSection />
        <Products />
        <UseCases />
        <Process />
        <Industries />
        <Team />
        <CTA onOpenModal={setActiveModal} />
      </main>
      <Footer />

      <AnimatePresence>
        {activeModal && (
          <Modal
            type={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

