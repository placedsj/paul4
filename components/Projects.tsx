import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Highland Avenue Estate',
    category: 'Full Replacement',
    location: 'Rothesay, NB',
    image: 'https://i.ibb.co/prd4Tj4s/IMG-3653.jpg',
  },
  {
    id: 2,
    title: 'Lakeside Cottage',
    category: 'Metal Roofing',
    location: 'Hampton, NB',
    image: 'https://i.ibb.co/twD3YQMk/1-EE60-D5-A-5018-410-C-9-D26-87-A480-F91-ADF.jpg',
  },
  {
    id: 3,
    title: 'Downtown Heritage',
    category: 'Slate Restoration',
    location: 'Saint John, NB',
    image: 'https://i.ibb.co/p6MvKGpJ/4-BFE45-ED-95-D1-4840-8214-549771-B1-CFA6.jpg',
  },
  {
    id: 4,
    title: 'Suburban Family Home',
    category: 'Asphalt Shingles',
    location: 'Quispamsis, NB',
    image: 'https://i.ibb.co/q33vdT3Z/IMG-3650.jpg',
  },
  {
    id: 5,
    title: 'Commercial Plaza',
    category: 'Flat Roof System',
    location: 'Sussex, NB',
    image: 'https://i.ibb.co/MDrg344Q/IMG-3789.jpg',
  },
  {
    id: 6,
    title: 'Emergency Repair',
    category: 'Storm Damage',
    location: 'Damascus, NB',
    image: 'https://i.ibb.co/DDHqSZwV/IMG-1572.jpg',
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-navy-950 relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
                <span className="w-12 h-1 bg-teal-400"></span>
                <span className="text-teal-400 font-bold uppercase tracking-widest text-sm">Our Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase text-white">
              Recent <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white">Projects</span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="group flex items-center gap-2 text-white font-bold uppercase tracking-widest hover:text-teal-400 transition-colors">
              View All Works 
              <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative h-[400px] overflow-hidden rounded-sm cursor-pointer">
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/80 transition-colors duration-500"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="transform transition-transform duration-500 delay-100">
                    <span className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                    <h3 className="text-2xl font-display font-bold uppercase text-white mb-1">{project.title}</h3>
                    <p className="text-slate-400 text-sm flex items-center gap-1">
                        <span className="w-1 h-1 bg-teal-400 rounded-full"></span>
                        {project.location}
                    </p>
                </div>
              </div>

              {/* Decorative Border on Hover */}
              <div className="absolute inset-4 border border-teal-400/0 group-hover:border-teal-400/30 transition-all duration-500 scale-95 group-hover:scale-100 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};