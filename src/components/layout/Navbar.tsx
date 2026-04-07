import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const element = document.getElementById(targetId.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/images/devailabslogo.png" alt="Dev AI Labs Logo" className="h-16 md:h-20 object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
            <a className="relative group text-on-surface/70 hover:text-primary transition-colors cursor-pointer py-1" onClick={(e) => handleNavClick(e, '#top')}>
              Platform
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a className="relative group text-on-surface/70 hover:text-primary transition-colors cursor-pointer py-1" onClick={(e) => handleNavClick(e, '#products')}>
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a className="relative group text-on-surface/70 hover:text-primary transition-colors cursor-pointer py-1" onClick={(e) => handleNavClick(e, '#use-cases')}>
              Use Cases
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a className="relative group text-on-surface/70 hover:text-primary transition-colors cursor-pointer py-1" onClick={(e) => handleNavClick(e, '#team')}>
              Team
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a className="relative group text-on-surface/70 hover:text-primary transition-colors cursor-pointer py-1" onClick={(e) => handleNavClick(e, '#contact')}>
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenModal('demo')}
              className="hidden md:block primary-gradient text-on-primary px-6 py-2 rounded-md font-bold text-sm tracking-tight active:scale-95 transition-all"
            >
              Request Demo
            </button>
            <button className="md:hidden text-on-surface" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-background border-b border-outline-variant/10 px-6 py-8 flex flex-col gap-6 font-headline font-bold">
            <a className="relative group w-fit text-on-surface/70 hover:text-primary transition-colors cursor-pointer pb-1" onClick={(e) => handleNavClick(e, '#top')}>
              Platform
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a className="relative group w-fit text-on-surface/70 hover:text-primary transition-colors cursor-pointer pb-1" onClick={(e) => handleNavClick(e, '#products')}>
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a className="relative group w-fit text-on-surface/70 hover:text-primary transition-colors cursor-pointer pb-1" onClick={(e) => handleNavClick(e, '#use-cases')}>
              Use Cases
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a className="relative group w-fit text-on-surface/70 hover:text-primary transition-colors cursor-pointer pb-1" onClick={(e) => handleNavClick(e, '#team')}>
              Team
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a className="relative group w-fit text-on-surface/70 hover:text-primary transition-colors cursor-pointer pb-1" onClick={(e) => handleNavClick(e, '#contact')}>
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button
              onClick={() => { onOpenModal('demo'); setIsOpen(false); }}
              className="primary-gradient text-on-primary px-6 py-3 rounded-md font-bold text-sm"
            >
              Request Demo
            </button>
          </div>
        )}
      </header>

      {/* Full Screen Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[1000] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300">
          <img src="/images/devailabsicon.png" alt="Loading Icon" className="w-16 h-16 object-contain animate-pulse drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]" />
          <div className="mt-8 text-xl font-bold font-headline text-primary tracking-widest animate-pulse">LOADING</div>
        </div>
      )}
    </>
  );
};

export default Navbar;
