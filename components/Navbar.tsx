import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NavLink } from '../types';

const links: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-navy-900/90 backdrop-blur-md shadow-lg py-3 border-b border-white/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-[0_0_20px_rgba(45,212,191,0.2)] border-2 border-teal-400">
                <img 
                    src="https://i.ibb.co/LDv0vx9b/39316-D9-E-DCC0-4-BCC-8-BB4-A52-FAF0-C2-BCB.png" 
                    alt="Paul Roofs Logo" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
            </div>
            <div className="font-display font-bold text-2xl tracking-tighter uppercase text-white group-hover:text-teal-50 transition-colors">
            Paul <span className="text-teal-400 group-hover:text-teal-300 transition-colors">Roofs</span>
            </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors duration-300 relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="tel:5062714162"
            className="flex items-center gap-2 bg-white text-navy-900 px-6 py-2.5 rounded-sm font-display font-bold uppercase tracking-wide hover:bg-teal-400 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
          >
            <Phone size={18} className="text-teal-600 group-hover:text-white transition-colors" />
            506-271-4162
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-teal-400 transition-colors relative z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-navy-950/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
            {links.map((link) => (
            <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-display font-bold uppercase text-white hover:text-teal-400 transition-colors tracking-wide"
            >
                {link.label}
            </a>
            ))}
        </div>
        
        <div className="w-16 h-1 bg-white/10 rounded-full"></div>

        <a
          href="tel:5062714162"
          onClick={() => setIsMobileMenuOpen(false)}
          className="bg-teal-400 text-navy-900 px-10 py-5 text-xl font-display font-bold uppercase tracking-wide rounded-sm hover:bg-white transition-colors shadow-lg shadow-teal-900/40"
        >
          Call Paul Now
        </a>
      </div>
    </nav>
  );
};