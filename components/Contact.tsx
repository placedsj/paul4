import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

  return (
    <section id="contact" className="relative bg-navy-950 min-h-screen flex flex-col lg:flex-row border-t border-white/5">
      {/* Map Side */}
      <div className="lg:w-1/2 min-h-[400px] lg:h-auto relative group overflow-hidden">
        <img 
            src="https://i.ibb.co/TMfnNg8x/IMG-3724.jpg" 
            alt="Paul Roofs Work" 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/50 to-transparent pointer-events-none lg:block hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/50 to-transparent pointer-events-none lg:hidden block"></div>
        
        <div className="absolute bottom-8 left-8 bg-navy-900/80 backdrop-blur-md border border-white/10 p-6 rounded-xl max-w-xs shadow-2xl transform transition-transform group-hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3 text-teal-400">
                <div className="p-2 bg-teal-400/10 rounded-full">
                    <MapPin size={20} />
                </div>
                <span className="font-display font-bold uppercase tracking-widest text-sm">Service Area</span>
            </div>
            <p className="text-slate-200 text-sm font-light leading-relaxed">Based in Damascus, NB. Proudly serving Southern New Brunswick with dedicated local craftsmanship for over 35 years.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="lg:w-1/2 p-8 lg:p-24 bg-navy-950 flex flex-col justify-center">
        <div className="max-w-lg mx-auto w-full">
            <h2 className="text-5xl lg:text-7xl font-display font-black uppercase text-white mb-2">Get In Touch</h2>
             <p className="text-teal-400 font-display font-bold uppercase tracking-widest mb-8 text-lg">#bettercallpaul</p>
            <p className="text-slate-400 mb-12 border-l-2 border-teal-400 pl-4 py-1">
                Fill out the form below for a rapid response. <span className="text-white font-bold block mt-1">Will yours be next?</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-teal-400 transition-colors">Name *</label>
                        <input 
                            required 
                            type="text" 
                            className="w-full bg-navy-900 border border-white/10 rounded-sm p-4 text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-300"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2 group">
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-teal-400 transition-colors">Phone *</label>
                        <input 
                            required 
                            type="tel" 
                            className="w-full bg-navy-900 border border-white/10 rounded-sm p-4 text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-300"
                            placeholder="(506) 271-4162"
                        />
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-teal-400 transition-colors">Email *</label>
                    <input 
                        required 
                        type="email" 
                        className="w-full bg-navy-900 border border-white/10 rounded-sm p-4 text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-300"
                        placeholder="john@example.com"
                    />
                </div>

                <div className="space-y-2 group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-teal-400 transition-colors">Service Needed</label>
                    <div className="relative">
                        <select className="w-full bg-navy-900 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all appearance-none cursor-pointer hover:bg-navy-800">
                            <option>Roof Repair</option>
                            <option>New Installation</option>
                            <option>Gutter Maintenance</option>
                            <option>Emergency Service</option>
                            <option>Spring Inspection</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-teal-400 transition-colors">Message</label>
                    <textarea 
                        rows={4}
                        className="w-full bg-navy-900 border border-white/10 rounded-sm p-4 text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all resize-none"
                        placeholder="Tell us about your project details..."
                    ></textarea>
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className={`w-full py-5 font-display font-bold uppercase tracking-widest text-lg transition-all duration-300 shadow-lg mt-4 flex justify-center items-center gap-2 rounded-sm ${
                        submitted 
                        ? 'bg-teal-500 text-white cursor-default' 
                        : 'bg-white text-navy-900 hover:bg-teal-400 hover:text-white hover:shadow-teal-900/20'
                    }`}
                >
                    {isSubmitting ? (
                        <span className="w-6 h-6 border-2 border-navy-900 border-t-transparent rounded-full animate-spin"></span>
                    ) : submitted ? (
                        <>
                            <CheckCircle size={24} /> Message Sent
                        </>
                    ) : (
                        "Submit Request"
                    )}
                </button>
            </form>

            <div className="grid grid-cols-2 gap-8 mt-16 pt-8 border-t border-white/5">
                <a href="tel:5062714162" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center text-teal-400 border border-white/5 group-hover:bg-teal-400 group-hover:text-white transition-all duration-300">
                        <Phone size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase text-slate-500 group-hover:text-teal-400 transition-colors">Call Us</p>
                        <p className="text-white font-display font-bold tracking-wide group-hover:translate-x-1 transition-transform">506-271-4162</p>
                    </div>
                </a>
                <a href="mailto:info@paulroofs.com" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center text-teal-400 border border-white/5 group-hover:bg-teal-400 group-hover:text-white transition-all duration-300">
                        <Mail size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase text-slate-500 group-hover:text-teal-400 transition-colors">Email Us</p>
                        <p className="text-white font-display font-bold tracking-wide group-hover:translate-x-1 transition-transform">info@paulroofs.com</p>
                    </div>
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};