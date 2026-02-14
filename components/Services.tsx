import React from 'react';
import { Hammer, Home, Droplets, Siren, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 'repair',
    title: 'Roof Repair',
    description: 'Fix leaks and damage efficiently. We ensure your roof remains watertight and secure against all elements.',
    icon: Hammer,
  },
  {
    id: 'install',
    title: 'New Installation',
    description: 'Durable and stylish roofing systems tailored to your home\'s unique architectural needs and local climate.',
    icon: Home,
  },
  {
    id: 'gutter',
    title: 'Gutter Maint.',
    description: 'Keep your water flow clear. Essential prevention for foundation and landscaping damage with premium gutter systems.',
    icon: Droplets,
  },
  {
    id: 'emergency',
    title: 'Emergency Services',
    description: '24/7 support for urgent repairs. When disaster strikes, we are on the way immediately to protect your home.',
    icon: Siren,
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-navy-900 relative">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2dd4bf 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase text-white mb-2">Our Services</h2>
            <p className="text-teal-400 font-bold uppercase tracking-widest pl-1">Precision Workmanship</p>
          </div>
          <div className="hidden md:block text-slate-400 max-w-sm text-right text-sm leading-relaxed">
            Comprehensive roofing solutions designed to protect your biggest investment.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-navy-800 p-8 min-h-[24rem] flex flex-col justify-between border border-white/5 hover:border-teal-400/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-teal-900/10 rounded-sm hover:-translate-y-1"
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-navy-800 to-navy-950 opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-navy-700/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white transition-all duration-300 shadow-lg border border-white/5 group-hover:scale-110">
                    <service.icon size={28} className="text-teal-400 group-hover:text-navy-900 transition-colors" />
                </div>
                <h3 className="text-2xl font-display font-bold uppercase text-white mb-4 leading-tight group-hover:text-teal-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed opacity-80 group-hover:opacity-100 group-hover:text-slate-200 transition-all duration-300">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors cursor-pointer pt-6">
                <span>Learn More</span>
                <ArrowRight size={16} className="text-teal-400 transform group-hover:translate-x-1 transition-transform" />
              </div>
              
              {/* Number Watermark */}
              <div className="absolute -bottom-6 -right-4 text-9xl font-display font-black text-white/5 group-hover:text-teal-400/5 transition-colors select-none pointer-events-none">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};