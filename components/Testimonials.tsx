import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    location: 'Sussex, NB',
    text: "Paul saved us during the ice storm last year. The team was out within 2 hours of my call and secured the roof before more damage could be done. Truly life savers.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Mike Thompson',
    location: 'Quispamsis, NB',
    text: "Best price I found, but the quality is what impressed me. They stripped the old roof and installed the new one in just 2 days. The yard was cleaner than when they started.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Dave Richardson',
    location: 'Damascus, NB',
    text: "The spring inspection caught a leak around my chimney I didn't even know about. Saved me thousands in potential water damage. Highly recommend their maintenance plan.",
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-navy-900 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
            <span className="text-teal-400 font-bold uppercase tracking-widest text-sm mb-3 block">Community Trusted</span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-white tracking-tight">
                What Neighbors <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Say</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-navy-800 p-8 border border-white/5 relative group hover:border-teal-400/30 transition-all duration-500 rounded-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20 flex flex-col justify-between min-h-[320px]">
              <div>
                <Quote className="absolute top-8 right-8 text-navy-700 group-hover:text-teal-400/10 transition-colors duration-500" size={56} />
                
                <div className="flex gap-1 mb-6 text-teal-400">
                    {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" className="drop-shadow-[0_0_8px_rgba(45,212,191,0.3)]" />
                    ))}
                </div>
                
                <p className="text-slate-300 text-lg leading-relaxed mb-8 relative z-10 italic">
                    "{t.text}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-12 h-12 bg-gradient-to-br from-navy-700 to-navy-900 rounded-full flex items-center justify-center text-teal-400 font-bold font-display text-xl border border-white/10 group-hover:border-teal-400/30 transition-colors">
                    {t.name.charAt(0)}
                </div>
                <div>
                    <h4 className="text-white font-bold uppercase text-sm tracking-wide group-hover:text-teal-400 transition-colors">{t.name}</h4>
                    <p className="text-slate-500 text-xs uppercase tracking-widest">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
            <div className="inline-flex items-center gap-5 px-8 py-4 bg-navy-800/50 rounded-full border border-white/5 backdrop-blur-sm hover:border-teal-400/20 transition-colors cursor-default">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full bg-navy-700 border-2 border-navy-900 flex items-center justify-center text-[10px] text-white overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-300 z-10 hover:z-20 hover:scale-110">
                             <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <span className="text-white text-sm font-bold tracking-wide">500+ Happy Homeowners</span>
                    <span className="text-slate-400 text-xs">Across Southern New Brunswick</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};