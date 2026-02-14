import React from 'react';
import { ChevronDown, Phone } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.ibb.co/MxyhDNN6/IMG-3295.jpg"
          alt="Paul Roofs Hero"
          className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
        />
        {/* Gradient Overlay - Strengthened for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/80 to-navy-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        <div className="max-w-4xl">
            <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 inline-block px-4 py-2 mb-8 border border-teal-500/50 rounded-full bg-teal-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                <span className="text-teal-400 font-bold uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                   Serving Southern NB for 35 Years
                </span>
            </div>
          
          <h1 className="animate-fade-in-up [animation-delay:400ms] opacity-0 text-6xl md:text-8xl lg:text-9xl font-display font-black uppercase leading-[0.9] text-white mb-8 drop-shadow-2xl">
            Better <br />
            Call <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-100">Paul</span>
          </h1>
          
          <div className="animate-fade-in-up [animation-delay:600ms] opacity-0 text-2xl md:text-4xl font-display font-bold text-teal-400 mb-8 tracking-wide flex items-center gap-4">
             <span className="w-12 h-1 bg-teal-400/50"></span> #bettercallpaul
          </div>

          <p className="animate-fade-in-up [animation-delay:800ms] opacity-0 text-lg md:text-2xl text-slate-200 font-light mb-12 max-w-xl leading-relaxed border-l-4 border-teal-400 pl-6 backdrop-blur-sm bg-navy-900/10 py-2 rounded-r-lg">
            Reliable roofing solutions in Damascus, NB. Quality craftsmanship that lasts a lifetime. <span className="font-bold text-white italic">Will yours be next?</span>
          </p>
          
          <div className="animate-fade-in-up [animation-delay:1000ms] opacity-0 flex flex-col sm:flex-row gap-4">
            <a
                href="#contact"
                className="group bg-white text-navy-900 px-10 py-5 font-display font-bold uppercase tracking-widest text-lg hover:bg-teal-400 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] text-center flex items-center justify-center gap-2 rounded-sm"
            >
                <Phone size={20} className="text-teal-600 group-hover:text-white transition-colors" />
                Get a Quote
            </a>
            <a
                href="#projects"
                className="border border-teal-500/30 text-white px-10 py-5 font-display font-bold uppercase tracking-widest text-lg hover:bg-teal-500/10 hover:border-teal-400 transition-all duration-300 backdrop-blur-sm text-center rounded-sm"
            >
                View Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-teal-400/50 hover:text-teal-400 transition-colors cursor-pointer">
        <a href="#services" aria-label="Scroll down">
            <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};