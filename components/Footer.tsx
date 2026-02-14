import React from 'react';

interface FooterProps {
  onStaffClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStaffClick }) => {
  return (
    <footer className="bg-navy-950 py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center overflow-hidden border border-teal-400/50">
                    <img 
                        src="https://i.ibb.co/LDv0vx9b/39316-D9-E-DCC0-4-BCC-8-BB4-A52-FAF0-C2-BCB.png" 
                        alt="Paul Roofs Logo" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="font-display font-bold text-2xl tracking-tighter uppercase text-white">
                    Paul <span className="text-teal-400">Roofs</span>
                </div>
            </div>
            <p className="text-slate-500 text-sm">© 2024 Paul Roofs. Damascus, NB. All Rights Reserved.</p>
          </div>

          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <button onClick={onStaffClick} className="hover:text-teal-400 transition-colors cursor-pointer">Staff Access</button>
          </div>

          <div className="flex gap-4">
            {/* Social Placeholders */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-navy-800 hover:bg-white hover:text-navy-900 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/5">
                <span className="text-xs">SOC</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};