import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Marketing } from './components/Marketing';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'marketing'>('home');

  if (view === 'marketing') {
    return <Marketing onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-navy-900 text-white selection:bg-brand-teal selection:text-navy-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer onStaffClick={() => setView('marketing')} />
    </div>
  );
};

export default App;