import React from 'react';
import { ShieldCheck, Clock, Star, Flower2 } from 'lucide-react';
import { FeatureItem } from '../types';

const features: FeatureItem[] = [
  {
    id: 'licensed',
    title: 'Licensed & Insured',
    description: 'Full coverage for your peace of mind. We adhere to strict safety and quality standards on every job in Southern NB.',
    icon: ShieldCheck,
  },
  {
    id: 'warranty',
    title: '10-Year Warranty',
    description: 'We stand by our work. Our comprehensive warranty covers materials and labor for a full decade.',
    icon: Clock,
  },
  {
    id: 'rated',
    title: 'Top-Rated Pros',
    description: 'Voted #1 in customer satisfaction. Our team is trained, certified, and dedicated to excellence.',
    icon: Star,
  },
];

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-navy-800 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-900/50 skew-x-12 transform translate-x-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Seasonal Promo */}
            <div className="relative group">
                <div className="absolute inset-0 bg-teal-400 rounded-2xl transform rotate-3 group-hover:rotate-2 transition-transform opacity-20"></div>
                <div className="relative bg-navy-900 rounded-2xl p-8 md:p-12 border border-white/10 overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-teal-400">
                        <Flower2 size={120} />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-teal-500/30">
                        <Flower2 size={14} />
                        Spring Ready
                    </div>
                    <h3 className="text-4xl md:text-5xl font-display font-bold uppercase text-white mb-6">
                        Spring is Coming
                    </h3>
                    <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                        April showers bring... roof leaks? Don't let the spring thaw catch you off guard. Get your roof inspected now to prevent water damage from seasonal storms.
                    </p>
                    <div className="w-full h-64 rounded-xl overflow-hidden relative mb-6">
                         <img 
                            src="https://i.ibb.co/5gvVYfHD/IMG-3648-Copy.jpg" 
                            alt="Spring Roof Inspection" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent"></div>
                         <div className="absolute bottom-4 left-4 text-white font-display font-bold text-xl">
                            Is your home rain-proof?
                         </div>
                    </div>
                    <button className="w-full bg-white hover:bg-teal-400 text-navy-900 hover:text-white py-4 font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 rounded-sm shadow-lg">
                        Schedule Spring Inspection
                    </button>
                </div>
            </div>

            {/* Right Content - Features */}
            <div>
                <h2 className="text-5xl md:text-6xl font-display font-black uppercase text-white mb-12 leading-none">
                    Why Choose <br/> <span className="text-teal-400">Paul Roofs?</span>
                </h2>

                <div className="space-y-8">
                    {features.map((feature) => (
                        <div key={feature.id} className="flex gap-6 p-6 bg-navy-900/50 rounded-xl border border-white/5 hover:border-teal-400/30 transition-colors group">
                             <div className="flex-shrink-0 w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center border-2 border-teal-400/30 group-hover:border-teal-400 group-hover:bg-teal-400 transition-all duration-300 shadow-lg shadow-teal-900/20">
                                <feature.icon size={32} className="text-teal-400 group-hover:text-navy-900 transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-bold uppercase text-white mb-2">{feature.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};